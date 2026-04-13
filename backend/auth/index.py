"""
Авторизация пользователей: регистрация, вход, выход, профиль, обновление данных.
Action передаётся в query параметре: ?action=register|login|logout|me
"""
import json
import os
import hashlib
import secrets
from datetime import datetime, timedelta
import psycopg2

SCHEMA = 't_p36273088_simple_marketplace_s'

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def make_token() -> str:
    return secrets.token_hex(32)

def ok(data: dict, status: int = 200) -> dict:
    return {'statusCode': status, 'headers': {**CORS, 'Content-Type': 'application/json'}, 'body': json.dumps(data, ensure_ascii=False)}

def err(msg: str, status: int = 400) -> dict:
    return {'statusCode': status, 'headers': {**CORS, 'Content-Type': 'application/json'}, 'body': json.dumps({'error': msg}, ensure_ascii=False)}

def get_user_by_token(conn, token: str):
    with conn.cursor() as cur:
        cur.execute(f"""
            SELECT u.id, u.email, u.name, u.phone, u.city, u.address, u.created_at
            FROM {SCHEMA}.sessions s
            JOIN {SCHEMA}.users u ON u.id = s.user_id
            WHERE s.token = '{token}' AND s.expires_at > NOW()
        """)
        row = cur.fetchone()
        if not row:
            return None
        return {'id': row[0], 'email': row[1], 'name': row[2], 'phone': row[3], 'city': row[4], 'address': row[5], 'created_at': str(row[6])}

def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    qs = event.get('queryStringParameters') or {}
    action = qs.get('action', '')
    token = (event.get('headers') or {}).get('X-Auth-Token') or (event.get('headers') or {}).get('x-auth-token') or ''
    body = {}
    if event.get('body'):
        body = json.loads(event['body'])

    conn = get_conn()

    if action == 'register':
        email = (body.get('email') or '').strip().lower().replace("'", "''")
        password = body.get('password') or ''
        name = (body.get('name') or '').strip().replace("'", "''")

        if not email or not password:
            return err('Email и пароль обязательны')
        if len(password) < 6:
            return err('Пароль должен быть не менее 6 символов')

        pw_hash = hash_password(password)
        with conn.cursor() as cur:
            cur.execute(f"SELECT id FROM {SCHEMA}.users WHERE email = '{email}'")
            if cur.fetchone():
                return err('Этот email уже зарегистрирован')
            cur.execute(f"""
                INSERT INTO {SCHEMA}.users (email, password_hash, name)
                VALUES ('{email}', '{pw_hash}', '{name}')
                RETURNING id
            """)
            user_id = cur.fetchone()[0]
            token_val = make_token()
            expires = (datetime.now() + timedelta(days=30)).strftime('%Y-%m-%d %H:%M:%S')
            cur.execute(f"""
                INSERT INTO {SCHEMA}.sessions (user_id, token, expires_at)
                VALUES ({user_id}, '{token_val}', '{expires}')
            """)
        conn.commit()
        return ok({'token': token_val, 'user': {'id': user_id, 'email': email, 'name': name}})

    if action == 'login':
        email = (body.get('email') or '').strip().lower().replace("'", "''")
        password = body.get('password') or ''
        pw_hash = hash_password(password)
        with conn.cursor() as cur:
            cur.execute(f"""
                SELECT id, email, name FROM {SCHEMA}.users
                WHERE email = '{email}' AND password_hash = '{pw_hash}'
            """)
            row = cur.fetchone()
            if not row:
                return err('Неверный email или пароль', 401)
            user_id, user_email, user_name = row
            token_val = make_token()
            expires = (datetime.now() + timedelta(days=30)).strftime('%Y-%m-%d %H:%M:%S')
            cur.execute(f"""
                INSERT INTO {SCHEMA}.sessions (user_id, token, expires_at)
                VALUES ({user_id}, '{token_val}', '{expires}')
            """)
        conn.commit()
        return ok({'token': token_val, 'user': {'id': user_id, 'email': user_email, 'name': user_name}})

    if action == 'logout':
        if token:
            with conn.cursor() as cur:
                cur.execute(f"DELETE FROM {SCHEMA}.sessions WHERE token = '{token}'")
            conn.commit()
        return ok({'ok': True})

    if action == 'me' and method == 'GET':
        if not token:
            return err('Не авторизован', 401)
        user = get_user_by_token(conn, token)
        if not user:
            return err('Сессия истекла', 401)
        with conn.cursor() as cur:
            cur.execute(f"""
                SELECT id, customer_name, city, address, delivery_method, payment_method,
                       items, total, status, created_at
                FROM {SCHEMA}.orders WHERE user_id = {user['id']}
                ORDER BY created_at DESC LIMIT 20
            """)
            rows = cur.fetchall()
        orders = [{
            'id': r[0], 'customer_name': r[1], 'city': r[2], 'address': r[3],
            'delivery_method': r[4], 'payment_method': r[5],
            'items': r[6], 'total': r[7], 'status': r[8], 'created_at': str(r[9])
        } for r in rows]
        return ok({'user': user, 'orders': orders})

    if action == 'me' and method == 'PUT':
        if not token:
            return err('Не авторизован', 401)
        user = get_user_by_token(conn, token)
        if not user:
            return err('Сессия истекла', 401)
        name = (body.get('name') or '').strip().replace("'", "''")
        phone = (body.get('phone') or '').strip().replace("'", "''")
        city = (body.get('city') or '').strip().replace("'", "''")
        address = (body.get('address') or '').strip().replace("'", "''")
        with conn.cursor() as cur:
            cur.execute(f"""
                UPDATE {SCHEMA}.users
                SET name='{name}', phone='{phone}', city='{city}', address='{address}'
                WHERE id={user['id']}
            """)
        conn.commit()
        return ok({'ok': True})

    return err('Неизвестное действие', 404)
