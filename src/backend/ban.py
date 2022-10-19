import auth.auth as auth
import database.database as db
from database.dataclass import *


def show_ban(uid):
    query_res = db.show_ban_list_query(uid)

    res = BanList()
    for row in query_res:
        username = auth.get_username_firebase(row[1])

        banList_info = BanDetail(
            uid=str(row[0]),
            target=str(row[1]),
            username=username
        )
        res.banList_list.append(banList_info)

    return res


def add_ban(uid, target, name):
    if uid == "-1":
        return "Please login before you try this action"
    elif uid == target:
        return "You cannot ban yourself"
    db.add_ban_query(uid, target, name)
    return "Successful"


def remove_ban(uid, target):
    db.remove_ban_query(uid, target)
    return "Successful"
