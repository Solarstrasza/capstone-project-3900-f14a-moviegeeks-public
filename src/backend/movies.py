import database.database as db
from database.dataclass import *


def show_movie():
    query_res = db.movie_list()

    res = SearchList()
    for row in query_res:
        movie_info = MovieList(mid=int(row[0]), title=str(row[1]))
        res.movie_info_list.append(movie_info)

    return res


def movie_rating_fetch(mid):
    rating_info = db.fetch_rating(mid)

    res = MovieRating(
        mid=int(rating_info[0]), \
        title=str(rating_info[1]), \
        rating=float(rating_info[2])
    )

    return res


def movie_rating_give(mid, rating):
    res = db.give_rating(mid, rating)

    return res


def add_review(search_param: ReviewDetail):
    q_param = ReviewDetail(
        rid=search_param.rid,
        name=search_param.name,
        uid=search_param.uid,
        mid=search_param.mid,
        rating=search_param.rating,
        upvote=search_param.upvote,
        downvote=search_param.downvote,
        review_date=search_param.review_date,
        review=search_param.review
    )

    db.add_review(q_param)


def show_review(mid, uid):
    show_review_res = db.show_reviews(mid, uid)

    res = ReviewList()
    for row in show_review_res:
        review_info = ReviewDetail(
            rid=int(row[0]),
            name=str(row[1]),
            uid=str(row[2]),
            mid=int(row[3]),
            rating=int(row[4]),
            upvote=int(row[5]),
            downvote=int(row[6]),
            review_date=str(row[7]),
            review=str(row[8])
        )
        res.movie_review_list.append(review_info)

    return res


def remove_review(rid):
    db.remove_review(rid)


def upvote(mid, rid, upvote, downvote, uid):
    db.upvote(mid, rid, upvote, downvote, uid)


def downvote(mid, rid, downvote, upvote, uid):
    db.downvote(mid, rid, downvote, upvote, uid)


def add_wishlist(uid, mid):
    db.add_wishlist(uid, mid)


def remove_wishlist(uid, mid):
    db.remove_wishlist(uid, mid)


def show_wishlist(uid):
    show_wishlist_res = db.show_wishlist(uid)

    res = WishlistList()
    for row in show_wishlist_res:
        movie_detail = db.movie_rating_info_query(uid=uid, mid=row[3])
        rating = movie_detail[0] if movie_detail[0] is not None else 0

        wishlist_info = WishlistDetail(
            title=str(row[0]),
            rating=float(rating),
            uid=str(row[2]),
            mid=int(row[3])
        )
        res.wishlist_list.append(wishlist_info)

    return res


def add_profile_info(search_param: UserDetail):
    q_param = UserDetail(
        uid=search_param.uid,
        username=search_param.username,
        info=search_param.info
    )
    db.add_profile_info(q_param)


def show_profile_info(uid):
    res = db.show_profile_info(uid)
    if res:
        return res[0]
    else:
        return ""


def show_user_review(uid):
    show_user_review_res = db.show_user_reviews(uid)

    res = ReviewList()
    for row in show_user_review_res:
        review_info = ReviewDetail(
            rid=int(row[0]),
            name=str(row[1]),
            uid=str(row[2]),
            mid=int(row[3]),
            rating=int(row[4]),
            upvote=int(row[5]),
            downvote=int(row[6]),
            review_date=str(row[7]),
            review=str(row[8]),
        )
        res.movie_review_list.append(review_info)

    return res


def user_average_rating(uid):
    res = db.user_average_rating(uid)
    return res


def check_upvote(rid, uid):
    res = db.check_upvote(rid, uid)
    return res


def check_downvote(rid, uid):
    res = db.check_downvote(rid, uid)
    return res


def get_recent():
    show_movie_poster_res = db.get_recent()

    res = SearchResPoster()
    for row in show_movie_poster_res:
        movie_poster_info = MoviePosterInfo(
            title=str(row[0]),
            id=int(row[1])
        )
        res.movie_poster_list.append(movie_poster_info)

    return res


def get_trending():
    show_movie_poster_res = db.get_trending()
    res = SearchResPoster()
    for row in show_movie_poster_res:
        movie_poster_info = MoviePosterInfo(
            title=str(row[0]),
            id=int(row[1])
        )
        res.movie_poster_list.append(movie_poster_info)

    return res


def get_single_review(rid):
    if rid == 0:
        res = ReviewDetail(
            rid=int(0),
            name=str("0"),
            uid=str("0"),
            mid=int("0"),
            rating=int("0"),
            upvote=int("0"),
            downvote=int("0"),
            review_date=str("0"),
            review=str("0")
        )
        return res

    else:
        row = db.get_single_review(rid)
        res = ReviewDetail(
            rid=int(row[0]),
            name=str(row[1]),
            uid=str(row[2]),
            mid=int(row[3]),
            rating=int(row[4]),
            upvote=int(row[5]),
            downvote=int(row[6]),
            review_date=str(row[7]),
            review=str(row[8])
        )

        return res


def get_review_count(uid):
    res = db.get_review_count(uid)
    return res
