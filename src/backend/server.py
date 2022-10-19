import os
import shutil
from pathlib import Path

from PIL import Image
from fastapi import FastAPI
from fastapi import UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

import admin
import ban
import favourite
import finder
import movies
import recommend
from auth import auth
from database.dataclass import *
from trailer import get_trailer

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


# --------------------------------------search functions----------------------------------------------------------------
@app.get("/search/", response_model=SearchRes)
async def search(uid, keyword_str, genre_enum, order_enum, descend, limit, offset):
    query_sample = searchParam(uid=str(uid),
                               keyword_str=str(keyword_str),
                               genre_enum=int(genre_enum),
                               order_enum=int(order_enum),
                               descend=int(descend),
                               limit=int(limit),
                               offset=int(offset))

    res = finder.search_movie(query_sample)  # res is a list of searchRes class
    return res


@app.get("/search_gen2/", response_model=SearchResGen2)
async def search_gen2(uid, keyword_str, genre_enum, order_enum, descend, limit, offset):
    query_sample = searchParam(uid=str(uid),
                               keyword_str=str(keyword_str),
                               genre_enum=int(genre_enum),
                               order_enum=int(order_enum),
                               descend=int(descend),
                               limit=int(limit),
                               offset=int(offset))

    res = finder.search_movie_gen2(query_sample)
    return res


@app.get("/search_by_director/", response_model=SearchResGen2)
async def search_by_director(director_id, director_name, uid, keyword_str, genre_enum, order_enum, descend, limit,
                             offset):
    query_sample = searchParam(uid=str(uid),
                               keyword_str=str(keyword_str),
                               genre_enum=int(genre_enum),
                               order_enum=int(order_enum),
                               descend=int(descend),
                               limit=int(limit),
                               offset=int(offset))
    director_query_sample = SearchByDirectorParam(director_id=str(director_id),
                                                  director_name=str(director_name),
                                                  search_param=query_sample)
    res = finder.search_movie_by_director(director_query_sample)
    return res


# --------------------------------------movie detail functions----------------------------------------------------------
@app.get("/fetch_movie_detail/{uid}/{mid}", response_model=MovieDetail)
async def fetch_movie_detail(uid: str, mid: int):
    res = finder.fetch_movie_detail(uid, mid)
    return res


@app.get("/fetch_movie_detail_gen2/{uid}/{mid}", response_model=MovieDetailGen2)
async def fetch_movie_detail_gen2(uid: str, mid: int):
    res = finder.fetch_movie_detail_gen2(uid, mid)
    return res


@app.get("/movies/", response_model=SearchList)
async def movielist_fetch():
    res = movies.show_movie()
    return res


@app.post("/movies/")
async def movielist_fetch():
    res = movies.show_movie()
    return res


@app.get("/ratingShow/", response_model=MovieRating)
async def movie_rating_fetch(mid):
    res = movies.movie_rating_fetch(mid)
    return res


@app.get("/ratingGive/")
async def movie_rating_give(mid, rating):
    res = movies.movie_rating_give(mid, rating)
    return res


# --------------------------------------reviews functions---------------------------------------------------------------
@app.get("/reviews/{mid}/{uid}", response_model=ReviewList)
async def show_review(mid: int, uid: str):
    res = movies.show_review(mid, uid)  # res is a list of searchRes class
    return res


@app.delete("/deleteReview/{rid}")
async def remove_review(rid: int):
    res = movies.remove_review(rid)
    return res


@app.post("/postReview/{rid}/{name}/{uid}/{mid}/{rating}/{upvote}/{downvote}/{review_date}/{review}")
async def post_review(rid: int, name: str, uid: str, mid: int, rating: int, upvote: int, downvote: int,
                      review_date: str,
                      review: str):
    q_param = ReviewDetail(
        rid=int(rid),
        name=str(name),
        uid=str(uid),
        mid=int(mid),
        rating=int(rating),
        upvote=int(upvote),
        downvote=int(downvote),
        review_date=str(review_date),
        review=str(review)
    )
    movies.add_review(q_param)


class Review(BaseModel):
    rid: str
    name: str
    uid: str
    mid: str
    rating: str
    upvote: str
    downvote: str
    review_date: str
    review: str


@app.post("/addReview/")
async def add_review(review: Review):
    q_param = ReviewDetail(
        rid=int(review.rid),
        name=str(review.name),
        uid=str(review.uid),
        mid=int(review.mid),
        rating=int(review.rating),
        upvote=int(review.upvote),
        downvote=int(review.downvote),
        review_date=str(review.review_date),
        review=str(review.review)
    )
    movies.add_review(q_param)


# --------------------------------------auth functions------------------------------------------------------------------
@app.post("/auth/register")
async def register(uid: str, username: str):
    auth.register(uid, username)
    return {"message": "User registered"}


@app.delete("/auth/delete")
async def delete_user(uid: str):
    auth.delete_user(uid)
    return {"message": "User deleted"}


@app.put("/auth/change_username")
async def change_username(uid: str, username: str):
    auth.change_username(uid, username)
    return {"message": "Username changed"}


@app.post("/auth/login")
async def login(uid: str, username: str):
    auth.login(uid, username)
    return "successful"


@app.get("/auth/get_username")
async def get_username(uid: str):
    return auth.get_username(uid)


@app.on_event("startup")
async def load_admins():
    admin.load_admins()


# --------------------------------------admin functions------------------------------------------------------------------
@app.post('/admin/add_admin')
async def add_admin(uid: str, new_admin_uid: str):
    return admin.add_admin(uid, new_admin_uid)


@app.post("/admin/add_movie")
async def add_movie(uid: str, title: str, orig_title: str, start_year: int, end_year: int, runtime: int, info: str):
    res = admin.add_movie(uid, title, orig_title,
                          start_year, end_year, runtime, info)
    return res


@app.delete("/admin/delete_movie")
async def delete_movie(uid: str, mid: int):
    res = admin.remove_movie(uid, mid)
    return res


@app.put("/admin/edit_movie")
async def edit_movie(uid: str, mid: str, title: str, orig_title: str, start_year: int, end_year: int, runtime: int,
                     info: str):
    res = admin.edit_movie(uid, mid, title, orig_title,
                           start_year, end_year, runtime, info)
    return res


# --------------------------------------wishlist functions--------------------------------------------------------------
@app.post("/profile/wishlist/add/{uid}/{mid}/")
async def add_wishlist(uid: str, mid: str):
    movies.add_wishlist(uid, mid)


@app.post("/profile/wishlist/remove/{uid}/{mid}/")
async def remove_wishlist(uid: str, mid: str):
    movies.remove_wishlist(uid, mid)


@app.get("/profile/wishlist/show/{uid}/")
async def show_wishlist(uid: str):
    res = movies.show_wishlist(uid)
    return res


# --------------------------------------poster functions----------------------------------------------------------------
@app.get("/fetch_poster/")
async def fetch_poster(mid: int):
    file = Path(f'./posters/{mid}.jpg')
    if file.is_file():
        return FileResponse(path=f'./posters/{mid}.jpg', filename=f'{mid}.jpg', media_type='image/jpeg')
    else:
        return {'message': f'No poster found for movie {mid}'}


@app.post("/upload_poster/")
async def upload_poster(mid: int, file: UploadFile = File(...)):
    file_extension = file.filename.split('.')[-1]
    if file_extension not in ['jpg', 'jpeg', 'png']:
        return {"message": "File extension not supported"}
    if file_extension == 'jpg' or file_extension == 'jpeg':
        with open(f'posters/{mid}.jpg', 'wb') as buffer:
            shutil.copyfileobj(file.file, buffer)
        return {"filename": file.filename,
                "message": "Profile picture uploaded"}
    else:
        with open(f'posters/{mid}.{file_extension}', 'wb') as buffer:
            shutil.copyfileobj(file.file, buffer)
        im = Image.open(f'posters/{mid}.{file_extension}')
        rgb_im = im.convert("RGB")
        rgb_im.save(f'posters/{mid}.jpg', "JPEG")
        os.remove(f'posters/{mid}.{file_extension}')
        return {"filename": file.filename,
                "message": "Poster uploaded"}


# -----------------------------------------ban functions----------------------------------------------------------------
@app.get("/ban/show/{uid}")
async def get_ban_list(uid: str):
    res = ban.show_ban(uid)
    return res


@app.post("/ban/add_ban/{uid}/{target}/{name}")
async def ban_user(uid: str, target: str, name: str):
    res = ban.add_ban(uid, target, name)
    return res


@app.post("/ban/remove_ban/{uid}/{target}")
async def unban_user(uid: str, target: str):
    res = ban.remove_ban(uid, target)
    return res


class UserInfo(BaseModel):
    uid: str
    username: str
    info: str

# -----------------------------------------profile functions----------------------------------------------------------------
@app.post("/profile/description/add/")
async def add_profile_info(info: UserInfo):
    q_param = UserDetail(
        uid=str(info.uid),
        username=str(info.username),
        info=str(info.info)
    )
    movies.add_profile_info(q_param)


@app.get("/profile/description/show/{uid}")
async def show_profile_info(uid: str):
    res = movies.show_profile_info(uid)
    return res


@app.get("/profile/reviews/{uid}", response_model=ReviewList)
async def show_review(uid: str):
    res = movies.show_user_review(uid)  # res is a list of searchRes class
    return res


@app.get("/profile/rating/{uid}")
async def user_average_rating(uid: str):
    res = movies.user_average_rating(uid)
    return res


@app.get("/favourite/show/{uid}/")
async def get_favourite(uid: str):
    return favourite.show_favourite(uid)


@app.post("/favourite/add/{uid}/{mid}")
async def add_favourite(uid: str, mid: int):
    return favourite.add_favourite(uid, mid)


@app.post("/favourite/remove/{uid}/{mid}")
async def remove_favourite(uid: str, mid: int):
    favourite.remove_favourite(uid, mid)
    return "successful"


# -----------------------------------------vote functions----------------------------------------------------------------
@app.get("/checkUpvote/{rid}/{uid}")
async def check_upvote(rid: int, uid: str):
    res = movies.check_upvote(rid, uid)
    return res


@app.get("/checkDownvote/{rid}/{uid}")
async def check_downvote(rid: int, uid: str):
    res = movies.check_downvote(rid, uid)
    return res


@app.post("/upvote/{mid}/{rid}/{upvote}/{downvote}/{uid}")
async def upvote(mid: int, rid: int, upvote: int, downvote: int, uid: str):
    res = movies.upvote(mid, rid, upvote, downvote, uid)


@app.post("/downvote/{mid}/{rid}/{downvote}/{upvote}/{uid}")
async def downvote(mid: int, rid: int, downvote: int, upvote: int, uid: str):
    res = movies.downvote(mid, rid, downvote, upvote, uid)


@app.get("/recent/")
async def get_recent():
    res = movies.get_recent()
    return res


@app.get("/trending/")
async def get_trending():
    res = movies.get_trending()
    return res


# -----------------------------------------recommend functions----------------------------------------------------------
@app.get("/recommend/users/{uid}", response_model=List[UserSimilarity])
async def user_similarity(uid: str):
    res = recommend.user_similarity(uid)
    return res


@app.get("/recommend/user_pref_movie_rec/", response_model=List[MovieDetailGen2])
async def user_pref_movie_rec(uid: str, limit: int, similar_genre_flag: int, similar_director_flag: int,
                              similar_crew_flag: int, similar_actor_flag: int, similar_reviews_flag: int):
    input = SimilarMovieParam(uid=uid,
                              limit=limit,
                              similar_genre_flag=similar_genre_flag,
                              similar_director_flag=similar_director_flag,
                              similar_crew_flag=similar_crew_flag,
                              similar_actor_flag=similar_actor_flag,
                              similar_reviews_flag=similar_reviews_flag)
    res = recommend.get_similar_movies_user_preference_based(input)
    return res


@app.get("/recommend/similar_movie_rec/", response_model=List[MovieDetailGen2])
async def similar_movie_rec(uid: str, mid: int, limit: int, similar_genre_flag: int, similar_director_flag: int,
                            similar_crew_flag: int, similar_actor_flag: int, similar_reviews_flag: int):
    input = SimilarMovieParam(uid=uid,
                              limit=limit,
                              similar_genre_flag=similar_genre_flag,
                              similar_director_flag=similar_director_flag,
                              similar_crew_flag=similar_crew_flag,
                              similar_actor_flag=similar_actor_flag,
                              similar_reviews_flag=similar_reviews_flag,
                              mid=mid)
    res = recommend.get_similar_movies_one_movie_based(input)
    return res


# -----------------------------------------profile picture functions----------------------------------------------------

@app.post("/profile-picture/upload/{uid}")
async def upload_profile_picture(uid: str, file: UploadFile = File(...)):
    file_extension = file.filename.split('.')[-1]
    if file_extension not in ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG']:
        return {"message": "File extension not supported"}
    if file_extension == 'jpg' or file_extension == 'jpeg' or file_extension == 'JPG' or file_extension == 'JPEG':
        with open(f'profilePics/{uid}.jpg', 'wb') as buffer:
            shutil.copyfileobj(file.file, buffer)
    else:
        with open(f'profilePics/{uid}.{file_extension}', 'wb') as buffer:
            shutil.copyfileobj(file.file, buffer)
        im = Image.open(f'profilePics/{uid}.{file_extension}')
        rgb_im = im.convert("RGB")
        rgb_im.save(f'profilePics/{uid}.jpg', "JPEG")
        os.remove(f'profilePics/{uid}.{file_extension}')

    return {"filename": file.filename,
            "message": "Profile picture uploaded"}


@app.get("/profile-picture/{uid}")
async def get_profile_picture(uid: str, time: str):
    file = Path(f'./profilePics/{uid}.jpg')
    if file.is_file():
        return FileResponse(path=f'./profilePics/{uid}.jpg', filename=f'{uid}.jpg', media_type='image/jpeg')
    else:
        return FileResponse(path=f'./profilePics/default.jpg', filename=f'{uid}.jpg', media_type='image/jpeg')


@app.get("/review/get/{rid}", response_model=ReviewDetail)
async def get_single_review(rid: int):
    res = movies.get_single_review(rid)  # res is a list of searchRes class
    return res


# ----------------------------------------------trailer functions-------------------------------------------------------
@app.get("/trailer/embed/{mid}")
async def server_get_embedded_trailer(mid: int):
    try:
        trailer = get_trailer(mid)
        return trailer
    except:
        return None


@app.get("/trailer/{mid}")
async def server_get_trailer(mid: int):
    try:
        trailer = get_trailer(mid, False)
        return trailer
    except:
        return None


@app.get("/review/count/{uid}")
async def get_review_count(uid: str):
    res = movies.get_review_count(uid)
    return res
