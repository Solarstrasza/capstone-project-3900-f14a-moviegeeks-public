import sqlite3

from database.dataclass import SearchQueryParam, ReviewDetail, UserDetail

db_dir = 'database/imdb.db'


def add_user(uid, username):
    conn = None
    try:
        # conn = sqlite3.connect('imdb.db')
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute("INSERT INTO users VALUES (?, ?, ?)", (uid, username, 'admin'))
        conn.commit()
        c.close()
        return "Successful"
    except Exception as e:
        return f'database exception: {e}'
    finally:
        if conn:
            conn.close()


def remove_user(uid):
    conn = None
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute("DELETE FROM users WHERE uid=?", (uid,))
        conn.commit()
        c.close()
    except Exception as e:
        print(f'database exception: {e}')
    finally:
        if conn:
            conn.close()


def update_username(uid, username):
    conn = None
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute("UPDATE users SET username=? WHERE uid=?", (username, uid))
        conn.commit()
        c.close()
    except Exception as e:
        print(f'database exception: {e}')
    finally:
        if conn:
            conn.close()


def get_username(uid):
    conn = None
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute("SELECT username FROM users WHERE uid=?", (uid,))
        username = c.fetchone()[0]
        c.close()
        return username
    except Exception as e:
        return f'database exception: {e}'
    finally:
        if conn:
            conn.close()


def search_query(q_param: SearchQueryParam):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()

        keyword_str = q_param.keyword_str
        genre_str = q_param.genre_str
        order_by = q_param.order_str
        order = q_param.descend
        limit = q_param.limit
        offset = q_param.offset

        query = ""
        if genre_str == "%":
            query = '''
                SELECT distinct m.id, m.title, m.start_year, m.rating FROM movies m
                LEFT OUTER JOIN crew_roles cr ON cr.movie_id = m.id
                LEFT OUTER JOIN names n ON cr.name_id = n.id
                WHERE (m.title Like '%' || ? || '%'
                OR m.orig_title Like '%' || ? || '%'
                OR m.info Like '%' || ? || '%'
                OR (n.name Like '%' || ? || '%' AND cr.role = 'director')
                )
                ORDER BY ''' + order_by + " " + order + ''' 
                LIMIT ? 
                OFFSET ? ;
            '''
            c.execute(query, (keyword_str, keyword_str,
                              keyword_str, keyword_str, limit, offset))

        else:
            query = '''
                SELECT distinct m.id, m.title, m.start_year, m.rating FROM movies m
                LEFT OUTER JOIN movie_genres mg ON m.id = mg.movie_id
                LEFT OUTER JOIN crew_roles cr ON cr.movie_id = m.id
                LEFT OUTER JOIN names n ON cr.name_id = n.id
                WHERE (m.title Like '%' || ? || '%'
                OR m.orig_title Like '%' || ? || '%'
                OR m.info Like '%' || ? || '%'
                OR n.name Like '%' || ? || '%')
                AND (mg.genre Like '' || ? || '')
                AND (cr.role = 'director')
                ORDER BY ''' + order_by + " " + order + ''' 
                LIMIT ? 
                OFFSET ? ;
            '''
            c.execute(query, (keyword_str, keyword_str, keyword_str,
                              keyword_str, genre_str, limit, offset))

        res = list()
        for row in c.fetchall():
            res.append(row)
        c.close()
        return res
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if (conn):
            conn.close()


def search_query_gen2(q_param: SearchQueryParam):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()

        keyword_str = q_param.keyword_str
        genre_str = q_param.genre_str
        limit = q_param.limit
        offset = q_param.offset

        query = '''
            SELECT distinct m.id FROM movies m
            JOIN movie_genres mg ON m.id = mg.movie_id
            JOIN crew_roles cr ON cr.movie_id = m.id
            JOIN names n ON cr.name_id = n.id
            WHERE (m.title Like '%' || ? || '%'
            OR m.orig_title Like '%' || ? || '%'
            OR m.info Like '%' || ? || '%'
            OR n.name Like '%' || ? || '%')
            AND (mg.genre Like '' || ? || '')
            AND (cr.role = 'director')
            LIMIT ? 
            OFFSET ? ;
        '''
        c.execute(query, (keyword_str, keyword_str, keyword_str,
                          keyword_str, genre_str, limit, offset))

        res = c.fetchall()
        c.close()
        return res
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if (conn):
            conn.close()


def search_movie_by_director_name_query(director_name, keyword_str, genre_str, limit, offset):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        query = '''
            SELECT distinct m.id FROM movies m
            JOIN movie_genres mg ON m.id = mg.movie_id
            JOIN crew_roles cr ON cr.movie_id = m.id
            JOIN names n ON cr.name_id = n.id
            WHERE n.name Like ?
            AND m.title Like '%' || ? || '%'
            AND (mg.genre Like '' || ? || '')
            AND (cr.role = 'director')
            LIMIT ? 
            OFFSET ?;
        '''
        c.execute(query, (director_name, keyword_str, genre_str, limit, offset,))
        res = c.fetchall()
        c.close()
        return res
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if (conn):
            conn.close()


def search_movie_by_director_id_query(director_id, keyword_str, genre_str, limit, offset):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        query = '''
            SELECT distinct m.id FROM movies m
            JOIN movie_genres mg ON m.id = mg.movie_id
            JOIN crew_roles cr ON cr.movie_id = m.id
            JOIN names n ON cr.name_id = n.id
            WHERE n.id = ?
            AND m.title Like '%' || ? || '%'
            AND (mg.genre Like '' || ? || '')
            AND (cr.role = 'director')
            LIMIT ? 
            OFFSET ?;
        '''
        c.execute(query, (director_id, keyword_str, genre_str, limit, offset,))
        res = c.fetchall()
        c.close()
        return res
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if (conn):
            conn.close()


def movie_basic_info_query(mid):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute(''' SELECT m.id, m.title, m.orig_title, 
        m.start_year, m.end_year,
        m.runtime, m.rating, group_concat(mg.genre), m.info FROM movies m
        LEFT OUTER JOIN movie_genres mg ON mg.movie_id = m.id
        WHERE m.id = ?
        ''', (mid,))
        res = c.fetchone()
        c.close()
        return res
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if (conn):
            conn.close()


def movie_basic_info_query_gen2(mid):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute(''' SELECT m.id, m.title, m.orig_title, 
        m.start_year, m.end_year,
        m.runtime, m.info FROM movies m
        WHERE m.id = ?
        ''', (mid,))
        res = c.fetchone()
        c.close()
        return res
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if (conn):
            conn.close()


def movie_genre_info_query(mid):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute(''' SELECT genre FROM movie_genres 
        WHERE movie_id = ?
        ''', (mid,))
        res = c.fetchall()
        c.close()
        return res
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if (conn):
            conn.close()


def movie_rating_info_query(uid, mid):
    try:

        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        if uid != "-1":
            query = '''
                SELECT AVG(r.rating), COUNT(*) FROM reviews r 
                WHERE r.mid = ? AND r.uid NOT IN (
                    SELECT b.target FROM bans b
                    WHERE b.uid = ? 
                );
            '''
            c.execute(query, (mid, uid,))
        else:
            query = '''
                SELECT AVG(r.rating), COUNT(*) FROM reviews r 
                WHERE r.mid = ?;
            '''
            c.execute(query, (mid,))
        res = c.fetchone()
        c.close()
        return res
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if conn:
            conn.close()


def movie_crew_info(mid):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute(''' SELECT n.name || ' as ' || cr.role FROM movies m
        LEFT OUTER JOIN crew_roles cr ON cr.movie_id = m.id
        JOIN names n ON cr.name_id = n.id
        WHERE m.id = ?
        ''', (mid,))
        res = list()
        for row in c.fetchall():
            if row[0] is not None:
                res.append(str(row[0]))
        return res
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if (conn):
            conn.close()


def movie_crew_info_gen2(mid):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute(''' SELECT n.name, cr.role, cr.name_id FROM movies m
        JOIN crew_roles cr ON cr.movie_id = m.id
        JOIN names n ON cr.name_id = n.id
        WHERE m.id = ?
        ''', (mid,))
        res = c.fetchall()
        return res
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if (conn):
            conn.close()


def movie_actor_info(mid):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute(''' SELECT n.name || ' as ' || ar.played FROM movies m
        LEFT OUTER JOIN acting_roles ar ON ar.movie_id = m.id
        JOIN names n ON ar.name_id = n.id
        WHERE m.id = ?
        ''', (mid,))
        res = list()
        for row in c.fetchall():
            if row[0] is not None:
                res.append(str(row[0]))
        c.close()
        return res
    except sqlite3.Error as e:
        print(f"Database Error: {e}")

    finally:
        if (conn):
            conn.close()


def movie_actor_info_gen2(mid):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute(''' SELECT n.name, ar.played, ar.name_id FROM movies m
        JOIN acting_roles ar ON ar.movie_id = m.id
        JOIN names n ON ar.name_id = n.id
        WHERE m.id = ?
        ''', (mid,))
        res = c.fetchall()
        c.close()
        return res
    except sqlite3.Error as e:
        print("Databse Error: " + e)

    finally:
        if (conn):
            conn.close()


def movie_aliases_info(mid):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute(''' SELECT 'local title: ' ||a.local_title ||
        ' region: ' || a.region || 
        ' language: ' || a.language ||
        'extra info :' || a.extra_info 
        FROM movies m
        JOIN aliases a ON a.movie_id = m.id
        WHERE m.id = ?
        ''', (mid,))
        res = list()
        for row in c.fetchall():
            if row[0] is not None:
                res.append(str(row[0]))
        return res
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if (conn):
            conn.close()


def movie_list():
    conn = sqlite3.connect(db_dir)

    c = conn.cursor()

    c.execute('''
        SELECT id, title FROM movies limit 10 
    ''')

    res = list()
    for row in c.fetchall():
        res.append(row)
    conn.close()

    return res


def fetch_rating(mid):
    conn = sqlite3.connect(db_dir)
    c = conn.cursor()

    c.execute(''' SELECT m.id, m.title, m.rating FROM movies m
    WHERE m.id = ?
    ''', (mid,))

    res = c.fetchone()
    conn.close()
    return res


def give_rating(mid, rating):
    conn = sqlite3.connect(db_dir)
    c = conn.cursor()

    c.execute(''' SELECT m.rating FROM movies m
    WHERE m.id = ?
    ''', (mid,))
    p = c.fetchone()
    for prev_rating in p:
        print("PREV RATE", prev_rating)
    prev_rating_float = float(prev_rating)

    c.execute(''' SELECT m.nvotes FROM movies m
    WHERE m.id = ?
    ''', (mid,))
    n = c.fetchone()
    for nvotes in n:
        print("NVOTES", nvotes)
    nvotes_float = float(nvotes)
    print("NVF", nvotes_float)

    rating_float = float(rating)

    mul = nvotes_float * prev_rating_float
    print("RATING", rating_float)
    print("MUL", mul)
    sum_mul = float(mul + prev_rating_float)
    print("sum_mul", sum_mul)
    div = float(nvotes_float + 1)
    print("DIV", div)

    res = sum_mul / div

    conn.close()
    return res


def add_review(q_param: ReviewDetail):
    conn = sqlite3.connect(db_dir)
    c = conn.cursor()

    rid = q_param.rid
    name = q_param.name
    uid = q_param.uid
    mid = q_param.mid
    rating = q_param.rating
    upvote = q_param.upvote
    downvote = q_param.downvote
    review_date = q_param.review_date
    review = q_param.review

    c.execute("SELECT mid, uid FROM reviews WHERE uid = ? AND mid = ?", (uid, mid,))
    up_result = c.fetchone()

    if up_result:
        c.execute(
            "UPDATE reviews SET review = ?, rating = ?, review_date = ? WHERE uid = ? AND mid = ?",
            (review, rating, review_date, uid, mid))
        conn.commit()
        conn.close()

    else:
        c.execute("INSERT or REPLACE INTO reviews VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                  (rid, name, uid, mid, rating, upvote, downvote, review_date, review,))
        conn.commit()
        conn.close()


def remove_review(rid):
    conn = sqlite3.connect(db_dir)
    c = conn.cursor()
    c.execute("DELETE FROM reviews WHERE rid=?", (rid,))
    conn.commit()
    conn.close()


def show_reviews(mid, uid):
    conn = sqlite3.connect(db_dir)
    c = conn.cursor()
    c.execute('''SELECT r.rid, r.name, r.uid, r.mid, r.rating, r.upvote, r.downvote, r.review_date, r.review FROM reviews r WHERE r.mid=? 
                AND r.uid NOT IN (SELECT target FROM bans WHERE uid = ?)
            ''',
              (mid, uid))
    res = list()
    for row in c.fetchall():
        res.append(row)
    conn.close()
    return res


def add_movie_query(title: str, orig_title: str, start_year: int, end_year: int, runtime: int, info: str):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        query = '''
            SELECT max(id) FROM movies;
        '''
        c.execute(query)
        mid = 0
        mid = int(c.fetchone()[0]) + 1
        query = '''
            INSERT OR REPLACE INTO movies VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
        '''
        c.execute(query, (mid, title, orig_title, start_year,
                          end_year, runtime, 0, 0, info,))
        conn.commit()
        c.close()
        return "Successful"
    except sqlite3.Error as e:
        return f"Database Error: {e}"
    finally:
        if conn:
            conn.close()


def delete_movie_query(mid: int):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute('''DELETE FROM movies WHERE id = ?;''', (mid,))
        c.execute('''DELETE FROM crew_roles WHERE movie_id = ?;''', (mid,))
        c.execute('''DELETE FROM acting_roles WHERE movie_id = ?;''', (mid,))
        c.execute('''DELETE FROM aliases WHERE movie_id = ?;''', (mid,))
        c.execute('''DELETE FROM movie_genres WHERE movie_id = ?;''', (mid,))
        c.close()
        conn.commit()
        return "Successful"
    except sqlite3.Error as e:
        return f"Database Error: {e}"


def edit_movie_query(mid: int, title: str, orig_title: str, start_year: int, end_year: int, runtime: int, info: str):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        query = '''
            INSERT OR REPLACE INTO movies VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
        '''
        c.execute(query, (mid, title, orig_title,
                          start_year, end_year, runtime, 0, 0, info))
        conn.commit()
        c.close()
        return "Successful"
    except sqlite3.Error as e:
        return f"Database Error: {e}"


def remove_ban_query(uid, target):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        query = '''
            DELETE FROM bans 
            WHERE uid = ? AND target = ?;
        '''
        c.execute(query, (uid, target,))
        conn.commit()
        c.close()
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if conn:
            conn.close()


def upvote(mid, rid, upvote, downvote, uid):
    conn = sqlite3.connect(db_dir)
    c = conn.cursor()

    # Check if user has already upvoted
    c.execute("SELECT rid, uid FROM upvotes WHERE rid = ? AND uid = ?", (rid, uid,))
    up_result = c.fetchone()

    # Check if user has already downvoted
    c.execute(
        "SELECT rid, uid FROM downvotes WHERE rid = ? AND uid = ?", (rid, uid,))
    down_result = c.fetchone()

    if up_result:  # If user already upvoted before then take upvote away
        c.execute("DELETE FROM upvotes WHERE rid = ? AND uid = ?", (rid, uid,))
        c.execute(
            "UPDATE reviews SET upvote = ? WHERE mid = ? AND rid = ?", (upvote - 2, mid, rid,))
        conn.commit()
        conn.close()
    # IF user has not upvoted but has downvoted THEN remove downvote and increase upvote
    elif not up_result and down_result:
        c.execute("DELETE FROM downvotes WHERE rid = ? AND uid = ?", (rid, uid,))
        c.execute(
            "UPDATE reviews SET upvote = ? WHERE mid = ? AND rid = ?", (upvote, mid, rid,))
        c.execute("UPDATE reviews SET downvote = ? WHERE mid = ? AND rid = ?",
                  (downvote - 1, mid, rid,))
        c.execute("INSERT INTO upvotes VALUES (?, ?)", (rid, uid,))
        conn.commit()
        conn.close()
    else:
        c.execute("INSERT INTO upvotes VALUES (?, ?)", (rid, uid,))
        c.execute("UPDATE reviews SET upvote = ? WHERE mid = ? AND rid = ?", (upvote, mid, rid,))
        conn.commit()
        conn.close()


def downvote(mid, rid, downvote, upvote, uid):
    conn = sqlite3.connect(db_dir)
    c = conn.cursor()

    c.execute(
        "SELECT rid, uid FROM downvotes WHERE rid = ? AND uid = ?", (rid, uid,))
    down_result = c.fetchone()

    # Check if user has already upvoted
    c.execute("SELECT rid, uid FROM upvotes WHERE rid = ? AND uid = ?", (rid, uid,))
    upResult = c.fetchone()

    if down_result:
        c.execute("DELETE FROM downvotes WHERE rid = ? AND uid = ?", (rid, uid,))
        c.execute("UPDATE reviews SET downvote = ? WHERE mid = ? AND rid = ?",
                  (downvote - 2, mid, rid,))
        conn.commit()
        conn.close()
    elif not down_result and upResult:
        c.execute("DELETE FROM upvotes WHERE rid = ? AND uid = ?", (rid, uid,))
        c.execute("UPDATE reviews SET downvote = ? WHERE mid = ? AND rid = ?", (downvote, mid, rid,))
        c.execute("UPDATE reviews SET upvote = ? WHERE mid = ? AND rid = ?", (upvote - 1, mid, rid,))
        c.execute("INSERT INTO downvotes VALUES (?, ?)", (rid, uid,))
        conn.commit()
        conn.close()
    else:
        c.execute("INSERT INTO downvotes VALUES (?, ?)", (rid, uid,))
        c.execute("UPDATE reviews SET downvote = ? WHERE mid = ? AND rid = ?", (downvote, mid, rid,))
        conn.commit()
        conn.close()


def add_wishlist(uid, mid):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute("INSERT OR REPLACE INTO list_item VALUES (?, ?)", (uid, mid,))
        conn.commit()
        conn.close()
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if (conn):
            conn.close()


def remove_wishlist(uid, mid):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute("DELETE FROM list_item WHERE uid = ? AND mid = ?", (uid, mid,))
        conn.commit()
        conn.close()
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if (conn):
            conn.close()


def show_wishlist(uid):
    conn = sqlite3.connect(db_dir)
    c = conn.cursor()
    c.execute(
        "SELECT m.title, m.rating, l.uid, l.mid FROM list_item l LEFT JOIN movies m ON l.mid = m.id WHERE l.uid = ?",
        (uid,))
    res = list()
    for row in c.fetchall():
        res.append(row)
        conn.close()
    return res


def add_profile_info(q_param: UserDetail):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()

        uid = q_param.uid
        username = q_param.username
        info = q_param.info

        c.execute("INSERT OR REPLACE INTO users VALUES (?, ?, ?)",
                  (uid, username, info,))
        conn.commit()
        conn.close()
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if (conn):
            conn.close()


def show_ban_list_query(uid):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        query = '''
            SELECT b.uid, b.target, b.name FROM bans b LEFT JOIN users u ON b.uid = u.uid
            WHERE b.uid = ?;
        '''
        c.execute(query, (uid,))
        res = list()
        for row in c.fetchall():
            res.append(row)
        c.close()
        return res
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if conn:
            conn.close()


def show_favourite_query(uid):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        query = '''
        SELECT m.id, m.title FROM favourite f
            JOIN movies m ON m.id = f.mid
            WHERE f.uid = ?;
        '''
        c.execute(query, (uid,))
        res = list()
        for row in c.fetchall():
            res.append(row)
        c.close()
        return res
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if conn:
            conn.close()


def show_profile_info(uid):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute("SELECT info FROM users WHERE uid = ?", (uid,))
        res = c.fetchone()
        return res
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if (conn):
            conn.close()


def add_ban_query(uid, target, name):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        query = '''
            INSERT OR REPLACE INTO bans VALUES (?, ?, ?);
        '''
        c.execute(query, (uid, target, name,))
        c.close()
        conn.commit()
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if conn:
            conn.close()


def show_user_reviews(uid):
    conn = sqlite3.connect(db_dir)
    c = conn.cursor()
    c.execute('''SELECT r.rid, m.title, r.uid, r.mid, r.rating, r.upvote, r.downvote, r.review_date, r.review FROM reviews r 
                LEFT JOIN movies m ON r.mid = m.id WHERE r.uid=? ''', (uid,))
    res = list()
    for row in c.fetchall():
        res.append(row)
    conn.close()
    return res


def user_average_rating(uid):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        query = '''
            SELECT AVG(r.rating) FROM reviews r 
            WHERE r.uid = ? 
        '''
        c.execute(query, (uid,))
        res = c.fetchone()
        c.close()
        return res
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if conn:
            conn.close()


def add_favourite_query(uid, mid):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        query = '''
            SELECT * FROM movies
            WHERE id = ?
        '''
        c.execute(query, (mid,))
        res = list()
        message = "successful"
        for row in c.fetchall():
            res.append(row)
        if len(res) != 0:
            res.clear()

            query = '''
                INSERT OR REPLACE INTO favourite VALUES (?, ?);
            '''
            c.execute(query, (uid, mid,))
            conn.commit()
        else:
            message = "There isn't a movie that matches this mid"
        c.close()
        return message
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if conn:
            conn.close()


def remove_favourite_query(uid, mid):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        query = '''
            DELETE FROM favourite 
            WHERE uid = ? AND mid = ?;
        '''
        c.execute(query, (uid, mid,))
        conn.commit()
        c.close()
    except sqlite3.Error as e:
        return f"Database Error: {e}"
    finally:
        if conn:
            conn.close()


def check_upvote(rid, uid):
    conn = sqlite3.connect(db_dir)
    c = conn.cursor()

    # Check if user has already upvoted
    c.execute("SELECT rid, uid FROM upvotes WHERE rid = ? AND uid = ?", (rid, uid,))
    up_result = c.fetchone()

    conn.close()
    return up_result


def check_downvote(rid, uid):
    conn = sqlite3.connect(db_dir)
    c = conn.cursor()

    # Check if user has already upvoted
    c.execute("SELECT rid, uid FROM downvotes WHERE rid = ? AND uid = ?", (rid, uid,))
    down_result = c.fetchone()

    conn.close()
    return down_result


def get_recent():
    conn = sqlite3.connect(db_dir)
    c = conn.cursor()
    c.execute("SELECT title, id FROM movies ORDER BY start_year DESC LIMIT 16 ")
    res = list()
    for row in c.fetchall():
        res.append(row)
    c.close()
    return res


def get_trending():
    conn = sqlite3.connect(db_dir)
    c = conn.cursor()
    c.execute(
        "SELECT DISTINCT m.title, m.id FROM movies m LEFT JOIN reviews r on m.id = r.mid ORDER BY r.review_date DESC "
        "LIMIT 16 ")
    res = list()
    for row in c.fetchall():
        res.append(row)
    c.close()
    return res


# Similarity functions
def fav_similarity_query(uid: str):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()

        common_fav_query = '''
            SELECT uid, count(uid) FROM favourite
            WHERE mid IN (SELECT distinct id FROM movies m
            JOIN favourite f on f.mid = m.id
            WHERE f.uid = ?)
            AND uid != ?
            GROUP BY uid;
        '''

        c.execute(common_fav_query, (uid, uid,))
        res = c.fetchall()

        c.close()
        return res

    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if conn:
            conn.close()


def rating_similarity_query(uid: str):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()

        rating_differences_query = '''
            SELECT r1.uid, r1.rating, r2.rating FROM reviews r1
            JOIN reviews r2 ON r1.mid = r2.mid
            WHERE r2.uid = ?
            AND r1.uid != ?
            ORDER BY r1.uid
        '''

        c.execute(rating_differences_query, (uid, uid,))
        res = c.fetchall()

        c.close()
        return res

    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if conn:
            conn.close()


def num_fav_and_rating(uid: str):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()

        query = '''
            SELECT distinct id FROM movies m
            JOIN reviews r on r.mid = m.id
            WHERE r.uid = ?
            UNION
            SELECT distinct id FROM movies m
            JOIN favourite f on f.mid = m.id
            WHERE f.uid = ?
        '''

        c.execute(query, (uid, uid,))
        res = c.fetchall()

        c.close()
        return len(res)

    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if conn:
            conn.close()


def get_movies_with_similar_genres_query(mid: int):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute('''SELECT m.id, count(*) FROM movies m
        JOIN movie_genres mg ON mg.movie_id = m.id
        WHERE m.id != ? 
        AND mg.genre IN (SELECT mg2.genre FROM movie_genres mg2
        JOIN movies m2 ON m2.id = mg2.movie_id
        WHERE m2.id = ?)
        GROUP BY m.id
        ''', (mid, mid,))

        res = c.fetchall()
        c.close()
        return res
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if conn:
            conn.close()


def get_movies_with_similar_directors_query(mid: int):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute('''SELECT m.id, count(*) FROM movies m
        JOIN crew_roles cr ON cr.movie_id = m.id
        JOIN names n ON n.id = cr.name_id
        WHERE cr.role = 'director'
        AND m.id != ?
        AND n.id IN (SELECT n2.id FROM movies m2
        JOIN crew_roles cr2 ON cr2.movie_id = m2.id
        JOIN names n2 ON n2.id = cr2.name_id
        WHERE m2.id = ?
        AND cr2.role = 'director')
        GROUP BY m.id
        ''', (mid, mid,))
        res = c.fetchall()
        c.close()
        return res
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if conn:
            conn.close()


def get_movies_with_similar_crews_query(mid: int):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute('''SELECT m.id, count(*) FROM movies m
        JOIN crew_roles cr ON cr.movie_id = m.id
        JOIN names n ON n.id = cr.name_id
        WHERE cr.role != 'director'
        AND m.id != ?
        AND n.id IN (SELECT n2.id FROM movies m2
        JOIN crew_roles cr2 ON cr2.movie_id = m2.id
        JOIN names n2 ON n2.id = cr2.name_id
        WHERE m2.id = ?
        AND cr2.role != 'director')
        GROUP BY m.id
        ''', (mid, mid,))
        res = c.fetchall()
        c.close()
        return res
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if conn:
            conn.close()


def get_movies_with_similar_actors_query(mid: int):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute('''SELECT m.id, count(*) FROM movies m
        JOIN acting_roles ar ON ar.movie_id = m.id
        JOIN names n ON n.id = ar.name_id
        AND m.id != ?
        AND n.id IN (SELECT n2.id FROM movies m2
        JOIN acting_roles ar2 ON ar2.movie_id = m2.id
        JOIN names n2 ON n2.id = ar2.name_id
        WHERE m2.id = ?)
        GROUP BY m.id
        ''', (mid, mid,))
        res = c.fetchall()
        c.close()
        return res
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if conn:
            conn.close()


def get_movies_with_similar_reviews_query(uid: str, mid: int):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute('''SELECT m.id, r1.rating, r2.rating FROM movies m
        JOIN reviews r1 ON m.id = r1.mid
        JOIN reviews r2 ON r1.uid = r2.uid
        WHERE r1.mid != r2.mid
        AND r2.mid = ?
        AND r1.uid NOT IN (
            SELECT target FROM bans WHERE uid = ?
        )
        ''', (mid, uid,))
        res = c.fetchall()
        c.close()
        return res
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if conn:
            conn.close()


def get_username_query(uid: str):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute("SELECT username FROM users WHERE uid = ?", (uid,))
        res = c.fetchall()
        c.close()
        return res
    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if conn:
            conn.close()


def login_query(uid: str, username: str):
    try:
        conn = sqlite3.connect(db_dir)
        c = conn.cursor()
        c.execute("SELECT uid, username, info FROM users WHERE uid = ?", (uid,))
        res = c.fetchall()
        if res:
            info = res[0][2]
            c.execute("INSERT OR REPLACE INTO users VALUES(?, ?, ?)",
                      (uid, username, info))
        else:
            c.execute("INSERT OR REPLACE INTO users VALUES(?, ?, ?)",
                      (uid, username, ""))
        conn.commit()
        c.close()

    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if conn:
            conn.close()


def get_single_review(rid):
    conn = sqlite3.connect(db_dir)
    c = conn.cursor()
    c.execute(
        "SELECT r.rid, r.name, r.uid, r.mid, r.rating, r.upvote, r.downvote, r.review_date, r.review FROM reviews r "
        "WHERE r.rid=?",
        (rid,))
    res = c.fetchone()
    conn.close()
    return res


def get_review_count(uid):
    conn = sqlite3.connect(db_dir)
    c = conn.cursor()
    c.execute("SELECT COUNT(*) FROM reviews WHERE uid=?",
              (uid,))
    res = c.fetchone()
    conn.close()
    return res
