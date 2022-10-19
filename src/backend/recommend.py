import math

import auth.auth as auth
import database.database as db
import finder
from database.dataclass import *


def fav_similarity(uid: str):
    res = db.fav_similarity_query(uid)
    return res


def rating_similarity(uid: str):
    res = db.rating_similarity_query(uid)
    return res

# See full detail of the algorithms in the report.
def user_similarity(uid: str):
    sim_map = dict()
    fav_sim = fav_similarity(uid)
    rat_sim = rating_similarity(uid)

    for row in fav_sim:
        row_uid = row[0]
        row_fav_sim = row[1]

        if row_uid in sim_map:
            sim_map[row_uid] += row_fav_sim
        else:
            sim_map[row_uid] = row_fav_sim

    for row in rat_sim:
        row_uid = row[0]
        rat_diff = abs(row[1] - row[2])
        if rat_diff < 2:
            rat_diff = 5 - rat_diff
        else:
            rat_diff = -rat_diff
        row_rat_sim = float(rat_diff) / float(5)
        if row_uid in sim_map:
            sim_map[row_uid] += row_rat_sim
        else:
            sim_map[row_uid] = row_rat_sim


    banned_users = db.show_ban_list_query(uid)
    for row in banned_users:
        sim_map.pop(row[1])

    sim_map = list(
        sorted(sim_map.items(), key=lambda item: item[1], reverse=True))

    sim_map = sim_map[:5]

    nsample = db.num_fav_and_rating(uid)

    res = list()

    if sim_map:
        for i in range(0, len(sim_map)):
            other_nsample = db.num_fav_and_rating(sim_map[i][0])
            username_query_res = db.get_username_query(sim_map[i][0])
            username_firebase = auth.get_username_firebase(sim_map[i][0])
            username = ""
            if username_query_res:
                username = username_query_res[0][0]
            ratio_of_samples_num = float(min(nsample, other_nsample)) / \
                                   float(max(nsample, other_nsample))
            ratio_of_samples_num = math.sqrt(math.sqrt(ratio_of_samples_num))

            if sim_map[i][1] < 0.0:
                similarity = 0.0
            else:
                similarity = math.sqrt(sim_map[i][1] / nsample) * 5 * ratio_of_samples_num

            user_similarity = UserSimilarity(uid=sim_map[i][0], username=username_firebase, similarity=similarity)
            res.append(user_similarity)

    return res


def movie_similarity_fetching(similar_movie_param: SimilarMovieParam):
    uid = similar_movie_param.uid
    mid = similar_movie_param.mid
    similar_genre_flag = similar_movie_param.similar_genre_flag
    similar_director_flag = similar_movie_param.similar_director_flag
    similar_crew_flag = similar_movie_param.similar_crew_flag
    similar_actor_flag = similar_movie_param.similar_actor_flag
    similar_reviews_flag = similar_movie_param.similar_reviews_flag

    movie_detail = finder.fetch_movie_detail_gen2(uid, mid)

    genre_score = 15
    director_score = 15
    crew_score = 10
    actor_score = 10
    review_score = 10

    sim_map = dict()
    sim_genre_ret = None
    sim_director_ret = None
    sim_crew_ret = None
    sim_actor_ret = None
    sim_review_ret = None

    if similar_genre_flag:
        sim_genre_ret = db.get_movies_with_similar_genres_query(mid)
    if similar_director_flag:
        sim_director_ret = db.get_movies_with_similar_directors_query(mid)
    if similar_crew_flag:
        sim_crew_ret = db.get_movies_with_similar_crews_query(mid)
    if similar_actor_flag:
        sim_actor_ret = db.get_movies_with_similar_actors_query(mid)
    if similar_reviews_flag:
        sim_review_ret = db.get_movies_with_similar_reviews_query(uid, mid)

    total_mark = len(movie_detail.genres) * genre_score + len(movie_detail.directors) * director_score + len(
        movie_detail.crews) * crew_score + len(movie_detail.actors) * actor_score

    if sim_genre_ret:
        for row in sim_genre_ret:
            row_mid = row[0]
            row_genres_num = row[1]
            if row_mid in sim_map:
                sim_map[row_mid]["score"] += row_genres_num * genre_score
            else:
                sim_map[row_mid] = dict()
                sim_map[row_mid]["score"] = row_genres_num * genre_score
                sim_map[row_mid]["total"] = total_mark

    if sim_director_ret:
        for row in sim_director_ret:
            row_mid = row[0]
            row_directors_num = row[1]
            if row_mid in sim_map:
                sim_map[row_mid]["score"] += row_directors_num * director_score
            else:
                sim_map[row_mid] = dict()
                sim_map[row_mid]["score"] = row_directors_num * director_score
                sim_map[row_mid]["total"] = total_mark

    if sim_crew_ret:
        for row in sim_crew_ret:
            row_mid = row[0]
            row_crews_num = row[1]
            if row_mid in sim_map:
                sim_map[row_mid]["score"] += row_crews_num * crew_score
            else:
                sim_map[row_mid] = dict()
                sim_map[row_mid]["score"] = row_crews_num * crew_score
                sim_map[row_mid]["total"] = total_mark

    if sim_actor_ret:
        for row in sim_actor_ret:
            row_mid = row[0]
            row_actors_num = row[1]
            if row_mid in sim_map:
                sim_map[row_mid]["score"] += row_actors_num * actor_score
            else:
                sim_map[row_mid] = dict()
                sim_map[row_mid]["score"] = row_actors_num * actor_score
                sim_map[row_mid]["total"] = total_mark

    if sim_review_ret:
        for row in sim_review_ret:
            row_mid = row[0]
            row_r1_rating = row[1]
            row_r2_rating = row[2]
            rat_diff = abs(row_r1_rating - row_r2_rating)
            if rat_diff < 2:
                rat_diff = 5 - rat_diff
            else:
                rat_diff = -rat_diff
            row_rat_sim = float(rat_diff) / float(5)

            if row_mid in sim_map:
                sim_map[row_mid]["score"] += row_rat_sim * review_score
                sim_map[row_mid]["total"] += review_score
            else:
                sim_map[row_mid] = dict()
                sim_map[row_mid]["score"] = row_rat_sim * review_score
                sim_map[row_mid]["total"] = total_mark + review_score

    return sim_map


def movie_similarity_map_addition(sim_map1, sim_map2):
    sim_map_ret = sim_map1

    for row in sim_map2.items():
        mid = row[0]
        score = row[1]["score"]
        total = row[1]["total"]
        if mid in sim_map_ret:
            sim_map_ret[mid]["score"] += score
            sim_map_ret[mid]["total"] += total
        else:
            sim_map_ret[mid] = dict()
            sim_map_ret[mid]["score"] = score
            sim_map_ret[mid]["total"] = total

    return sim_map_ret


def finalize_similarity_map(sim_map: dict, similar_movie_param: SimilarMovieParam):
    mid_list = list()
    uid = similar_movie_param.uid
    limit = similar_movie_param.limit
    mid = similar_movie_param.mid

    reviews = db.show_user_reviews(uid)
    favourites = db.show_favourite_query(uid)
    for row in reviews:
        mid_list.append(row[3])
    for row in favourites:
        mid_list.append(row[0])
    mid_list = list()
    reviews = db.show_user_reviews(uid)
    favourites = db.show_favourite_query(uid)
    for row in reviews:
        mid_list.append(row[3])
    for row in favourites:
        mid_list.append(row[0])

    for other_mid in mid_list:
        if other_mid in sim_map:
            sim_map.pop(other_mid)

    sorted_map = list(sorted(sim_map.items(), key=lambda item: item[1]["score"], reverse=True))
    index_trim = 0
    index_orig = 0

    cur_md = finder.fetch_movie_detail_gen2(uid, mid)

    sorted_trimed_map = list()

    while index_trim < limit and index_orig < len(sorted_map):
        other_mid = sorted_map[index_orig][0]
        other_md = finder.fetch_movie_detail_gen2(uid, other_mid)
        other_appendable = True

        if not similar_movie_param.similar_genre_flag:
            for genre in cur_md.genres:
                if genre in other_md.genres:
                    other_appendable = False
        if not similar_movie_param.similar_director_flag:
            for director in cur_md.directors:
                if director in other_md.directors:
                    other_appendable = False
        if not similar_movie_param.similar_crew_flag:
            for crew in cur_md.crews:
                if crew in other_md.crews:
                    other_appendable = False
        if not similar_movie_param.similar_actor_flag:
            for actor in cur_md.actors:
                if actor in other_md.actors:
                    other_appendable = False

        if other_appendable:
            sorted_trimed_map.append(sorted_map[index_orig])
            index_trim += 1
        index_orig += 1

    ret = list()
    for row in sorted_trimed_map:
        mid = row[0]
        movie_detail = finder.fetch_movie_detail_gen2(uid, mid)
        movie_detail.similarity = math.sqrt(float(row[1]["score"]) / float(row[1]["total"])) * 5
        ret.append(movie_detail)
    return ret


# See full detail of the algorithms in the report.
def get_similar_movies_one_movie_based(similar_movie_param: SimilarMovieParam):
    sim_map = movie_similarity_fetching(similar_movie_param)
    ret = finalize_similarity_map(sim_map, similar_movie_param)
    return ret

# See full detail of the algorithms in the report.
def get_similar_movies_user_preference_based(similar_movie_param: SimilarMovieParam):
    mid_list = list()
    uid = similar_movie_param.uid
    reviews = db.show_user_reviews(uid)
    favourites = db.show_favourite_query(uid)
    for row in reviews:
        if row[4] >= 4:
            mid_list.append(row[3])

    for row in favourites:
        mid_list.append(row[0])

    sim_map = dict()
    for num in mid_list:
        new_similar_movie_param = similar_movie_param
        new_similar_movie_param.mid = num
        new_sim_map = movie_similarity_fetching(new_similar_movie_param)
        sim_map = movie_similarity_map_addition(sim_map, new_sim_map)

    ret = finalize_similarity_map(sim_map, similar_movie_param)
    return ret
