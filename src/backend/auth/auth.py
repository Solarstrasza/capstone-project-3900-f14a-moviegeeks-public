# import src.backend.database.database as database
import database.database as database
import firebase_admin
from firebase_admin import credentials, auth


def register(uid, username):
    database.add_user(uid, username)


def delete_user(uid):
    database.remove_user(uid)


def change_username(uid, username):
    database.update_username(uid, username)


def get_username(uid):
    return database.get_username(uid)


def login(uid: str, username: str):
    database.login_query(uid, username)


def get_username_firebase(uid: str):
    try:
        app = firebase_admin.get_app()
    except ValueError as e:
        cred = credentials.Certificate("auth/comp3900-authentication-firebase-adminsdk-wxbbd-111adb5777.json")
        firebase_admin.initialize_app(cred)
    user = auth.get_user(uid)
    return user.display_name
