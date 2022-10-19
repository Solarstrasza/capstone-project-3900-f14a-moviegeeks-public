from enum import Enum
from typing import List

from pydantic import BaseModel


class genreEnum(Enum):
    all = 0
    comedy = 1
    fantasy = 2
    romance = 3
    crime = 4
    film_noir = 5
    thriller = 6
    drama = 7
    family = 8
    adventure = 9
    biography = 10
    musical = 11
    action = 12
    sci_fi = 13
    mystery = 14
    war = 15
    history = 16
    western = 17
    animation = 18
    sport = 19
    documentary = 20
    music = 21
    horror = 22
    news = 23


class orderEnum(Enum):
    mid = 0
    title = 1
    # genre = 2 cannot order by genre, one movie has multiple genres.
    rating = 3


class searchParam(BaseModel):
    uid: str
    keyword_str: str
    genre_enum: genreEnum
    order_enum: orderEnum
    descend: int
    limit: int
    offset: int


class SearchByDirectorParam(BaseModel):
    director_id: int
    director_name: str
    search_param: searchParam


class SearchQueryParam(BaseModel):
    uid: str
    keyword_str: str
    genre_str: str
    order_str: str
    descend: str
    limit: int
    offset: int


class MovieInfo(BaseModel):
    mid: int
    title: str
    start_year: int
    rating: float
    # director : str    


class SearchRes(BaseModel):
    movie_info_list: List[MovieInfo] = list()


class MovieDetail(BaseModel):
    mid: int
    title: str
    orig_title: str
    start_year: int
    end_year: int
    runtime: str
    rating: float
    nvote: int
    genre: str
    description: str
    crew: List[str]
    actor: List[str]
    aliases: List[str]


class ActorInfo(BaseModel):
    name: str
    played: str
    name_id: str


class CrewInfo(BaseModel):
    name: str
    role: str
    name_id: str


class MovieDetailGen2(BaseModel):
    mid: int
    title: str
    orig_title: str
    start_year: int
    end_year: int
    runtime: str
    rating: float
    nvote: int
    description: str
    genres: List[str] = list()
    directors: List[CrewInfo] = list()
    crews: List[CrewInfo] = list()
    actors: List[ActorInfo] = list()
    similarity: float = 0


class SearchResGen2(BaseModel):
    movies: List[MovieDetailGen2] = list()


class MovieRating(BaseModel):
    mid: int
    title: str
    rating: float


class GiveRating(BaseModel):
    mid: int
    title: str
    rating: float
    nvotes: int


class MovieList(BaseModel):
    mid: int
    title: str


class SearchList(BaseModel):
    movie_info_list: List[MovieList] = list()


class ReviewDetail(BaseModel):
    rid: int
    name: str
    uid: str
    mid: int
    rating: int
    upvote: int
    downvote: int
    review_date: str
    review: str


class ReviewList(BaseModel):
    movie_review_list: List[ReviewDetail] = list()


class WishlistDetail(BaseModel):
    title: str
    rating: int
    uid: str
    mid: int


class WishlistList(BaseModel):
    wishlist_list: List[WishlistDetail] = list()


class UserDetail(BaseModel):
    uid: str
    username: str
    info: str


class UserSimilarity(BaseModel):
    uid: str
    username: str
    similarity: float


class MoviePosterInfo(BaseModel):
    title: str
    id: int


class SearchResPoster(BaseModel):
    movie_poster_list: List[MoviePosterInfo] = list()


class BanDetail(BaseModel):
    uid: str
    target: str
    username: str


class BanList(BaseModel):
    banList_list: List[BanDetail] = list()


# 10892769
class SimilarMovieParam(BaseModel):
    uid: str
    limit: int
    similar_genre_flag: int
    similar_director_flag: int
    similar_crew_flag: int
    similar_actor_flag: int
    similar_reviews_flag: int
    mid: int = -1
