import database.database as db

not_admin_message = "You are not an admin"


def load_admins():
    with open('admins.txt', 'r') as file:
        lines = file.readlines()
        lines = [line.rstrip() for line in lines]
    for line in lines:
        res = db.add_user(line, 'admin')
        if res != 'Success':
            print(res)


def is_admin(uid: str):
    return db.get_username(uid) == 'admin'


def add_admin(uid: str, new_admin_uid: str):
    if not is_admin(uid):
        return not_admin_message

    return db.add_user(new_admin_uid, 'admin')


def add_movie(uid: str, title: str, orig_title: str, start_year: int, end_year: int, runtime: int, info: str):
    if not is_admin(uid):
        return not_admin_message

    res = db.add_movie_query(title, orig_title, start_year, end_year, runtime, info)
    return res


def remove_movie(uid: str, mid: int):
    if not is_admin(uid):
        return not_admin_message

    res = db.delete_movie_query(mid)
    return res


def edit_movie(uid: str, mid: int, title: str, orig_title: str, start_year: int, end_year: int, runtime: int,
               info: str):
    if not is_admin(uid):
        return not_admin_message

    res = db.edit_movie_query(mid, title, orig_title, start_year, end_year, runtime, info)
    return res
