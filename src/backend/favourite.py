import database.database as db


def show_favourite(uid):
    query_res = db.show_favourite_query(uid)

    res = list()
    for row in query_res:
        row_dict = {
            "mid": row[0],
            "title": row[1]
        }
        res.append(row_dict)

    return res


def add_favourite(uid, mid):
    return db.add_favourite_query(uid, mid)


def remove_favourite(uid, mid):
    db.remove_favourite_query(uid, mid)
