import database.database as db
from database.dataclass import *


def search_movie(search_param: searchParam):
    q_param = SearchQueryParam(uid=search_param.uid,
                               keyword_str=search_param.keyword_str,
                               genre_str=__genre_enum_to_genre_str(search_param.genre_enum),
                               order_str=__order_enum_to_order_str(search_param.order_enum),
                               descend=__convert_descend_str(search_param.descend),
                               limit=search_param.limit,
                               offset=search_param.offset)

    query_res = db.search_query(q_param)

    res = SearchRes()
    for row in query_res:
        mid = int(row[0]) if row[0] is not None else 0
        title = str(row[1]) if row[1] is not None else ""
        start_year = int(row[2]) if row[2] is not None else 0
        rating = float(row[3]) if row[3] is not None else 0

        movie_info = MovieInfo(mid=mid, title=title, start_year=start_year, rating=rating)
        res.movie_info_list.append(movie_info)

    return res


def search_movie_gen2(search_param: searchParam):
    q_param = SearchQueryParam(uid=search_param.uid, keyword_str=search_param.keyword_str,
                               genre_str=__genre_enum_to_genre_str(search_param.genre_enum),
                               order_str=__order_enum_to_order_str(search_param.order_enum),
                               descend=__convert_descend_str(search_param.descend), limit=search_param.limit,
                               offset=search_param.offset)

    movie_ids = db.search_query_gen2(q_param)
    movies = list()
    for row in movie_ids:
        movies.append(fetch_movie_detail_gen2(search_param.uid, row[0]))

    order_enum = search_param.order_enum
    movies = __sort_by_order_enum(order_enum=order_enum, movies=movies, descend=search_param.descend)
    res = SearchResGen2(movies=movies)
    return res


def search_movie_by_director(param: SearchByDirectorParam):
    director_id = param.director_id
    director_name = param.director_name
    keyword_str = param.search_param.keyword_str
    genre_str = __genre_enum_to_genre_str(param.search_param.genre_enum)
    limit = param.search_param.limit
    offset = param.search_param.offset
    uid = param.search_param.uid
    movie_ids = None
    if int(director_id) == -1:
        movie_ids = db.search_movie_by_director_name_query(director_name, keyword_str, genre_str, limit, offset)
    else:
        movie_ids = db.search_movie_by_director_id_query(director_id, keyword_str, genre_str, limit, offset)

    movies = list()
    for row in movie_ids:
        movies.append(fetch_movie_detail_gen2((uid), row[0]))

    order_enum = param.search_param.order_enum
    movies = __sort_by_order_enum(order_enum=order_enum, movies=movies, descend=param.search_param.descend)
    res = SearchResGen2(movies=movies)
    return res


def fetch_movie_detail(uid, mid):
    # validate_uid(uid)
    basic_info = db.movie_basic_info_query(mid)
    rating_info = db.movie_rating_info_query(uid, mid)
    crew_info = db.movie_crew_info(mid)
    actor_info = db.movie_actor_info(mid)
    alias_info = db.movie_aliases_info(mid)

    mid = int(basic_info[0]) if basic_info[0] != None else 0
    title = str(basic_info[1]) if basic_info[1] != None else ""
    orig_title = str(basic_info[2]) if basic_info[2] != None else ""
    start_year = int(basic_info[3]) if basic_info[3] != None else 0
    end_year = int(basic_info[4]) if basic_info[4] != None else 0
    runtime = int(basic_info[5]) if basic_info[5] != None else 0
    rating = float(rating_info[0]) if rating_info[0] != None else 0.0
    nvote = int(rating_info[1]) if rating_info[1] != None else 0
    genre = str(basic_info[7]) if basic_info[7] != None else ""
    description = str(basic_info[8]) if basic_info[8] != None else ""
    crew = crew_info
    actor = actor_info
    alias = alias_info

    res = MovieDetail(mid=mid,
                      title=title,
                      orig_title=orig_title,
                      start_year=start_year,
                      end_year=end_year,
                      runtime=runtime,
                      rating=rating,
                      nvote=nvote,
                      genre=genre,
                      description=description,
                      crew=crew,
                      actor=actor,
                      aliases=alias)

    return res


def fetch_movie_detail_gen2(uid, mid):
    basic_info = db.movie_basic_info_query_gen2(mid)
    genre_info = db.movie_genre_info_query(mid)
    rating_info = db.movie_rating_info_query(uid, mid)
    crews_info = db.movie_crew_info_gen2(mid)
    actors_info = db.movie_actor_info_gen2(mid)

    mid = -1
    title = ""
    orig_title = ""
    start_year = -1
    end_year = -1
    runtime = -1
    description = ""
    rating = 0
    nvote = 0

    if basic_info:
        mid = int(basic_info[0]) if basic_info[0] != None else 0
        title = str(basic_info[1]) if basic_info[1] != None else ""
        orig_title = str(basic_info[2]) if basic_info[2] != None else ""
        start_year = int(basic_info[3]) if basic_info[3] != None else 0
        end_year = int(basic_info[4]) if basic_info[4] != None else 0
        runtime = int(basic_info[5]) if basic_info[5] != None else 0
        description = str(basic_info[6]) if basic_info[6] != None else ""
    if rating_info:
        rating = float(rating_info[0]) if rating_info[0] != None else 0.0
        nvote = int(rating_info[1]) if rating_info[1] != None else 0

    genres = list()
    for row in genre_info:
        genres.append(row[0])
    directors = list()
    crews = list()
    for row in crews_info:
        if row[1] == "director":
            directors.append(CrewInfo(name=row[0], role=row[1], name_id=row[2]))
        else:
            crews.append(CrewInfo(name=row[0], role=row[1], name_id=row[2]))
    actors = list()
    for row in actors_info:
        actors.append(ActorInfo(name=row[0], played=row[1], name_id=row[2]))

    res = MovieDetailGen2(mid=mid,
                          title=title,
                          orig_title=orig_title,
                          start_year=start_year,
                          end_year=end_year,
                          runtime=runtime,
                          rating=rating,
                          nvote=nvote,
                          description=description,
                          genres=genres,
                          directors=directors,
                          crews=crews,
                          actors=actors)
    return res


def __convert_descend_str(input_: int):
    res = "ASC"
    if input_ == 1:
        res = "DESC"

    return res


def __order_enum_to_order_str(order_enum: orderEnum):
    if order_enum == orderEnum.mid:
        return "m.id"
    elif order_enum == orderEnum.title:
        return "m.title"
    elif order_enum == orderEnum.rating:
        return "m.rating"


def __genre_enum_to_genre_str(genre_enum: genreEnum):
    if genre_enum == genreEnum.all:
        return "%"
    return genre_enum.name


def __sort_by_order_enum(order_enum: orderEnum, movies: list, descend: int):
    descend_flag = True if descend != 0 else False
    if order_enum == orderEnum.mid:
        movies = sorted(movies, key=lambda x: x.mid, reverse=descend_flag)
    elif order_enum == orderEnum.title:
        movies = sorted(movies, key=lambda x: x.title, reverse=descend_flag)
    elif order_enum == orderEnum.rating:
        movies = sorted(movies, key=lambda x: ([x.rating], [x.title]), reverse=descend_flag)
    return movies
