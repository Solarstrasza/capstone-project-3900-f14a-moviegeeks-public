import auth.auth as auth
import favourite
import movies
from database.dataclass import *

# This purpose of this file is just to populate the database for project demo.


shao1 = "cCudRmSWZxYa7F3l13S6uFlu3IE3"
shao2 = "5q548TvC39hZDNs3GJUrQiqJiMl2"
shao3 = "ucqG6n7Lp6as5JaKG7PAXGywpyM2"
shao4 = "U2GgoO2WirgWnhUPwJyBm4hkUeF2"
shao5 = "lfzKuSsrO3cpdabPDEFPqRJKloR2"
shao6 = "j4lpASm0AZXW9NkxJ4lJbzsBMi33"
shao7 = "kyeSff5REFWySbsry2nIxoIMUar2"
shao8 = "17cwrakaYFQuK51HJuVEOZeoOUn1"
shao9 = "HgElzSti5TXZS5FA4MoTXiJhyol1"
shao10 = "6O1FptrITCPGtxFsIxrAseNlib53"
shao11 = "TsQOiX0Wk2aYZaylhnnBUIbuVcW2"
shao12 = "5Lqhaf5Tv4XS7NY4Mtafyo6ZsAQ2"
shao13 = "FkCoOMI0yOX8nBlHJOk9XBRISbZ2"
shao14 = "BwTFA3IaS4UNL73nfPU0vWo6S8k1"


avengers_mid = 14154796
shazam_mid = 10448115
smaug_mid = 11170358
dragonheart_mid = 10116136
httyd_mid = 10892769
iron_man_mid = 10371746
poc_1_mid = 10325980
poc_2_mid = 10383574
poc_3_mid = 10449088
poc_4_mid = 11298650
poc_5_mid = 11790809
cur_rid = list()
cur_rid.append(100)


def get_rid(cur_rid):
    cur_rid[0] += 1
    print(cur_rid[0])
    return cur_rid[0]


# How to train your dragon
mid = httyd_mid
movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao1),
                               uid=shao9,
                               mid=mid, rating=4, upvote=0, downvote=0, review_date="1/7/2022", review="4/5"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao2),
                               uid=shao10,
                               mid=mid, rating=4, upvote=0, downvote=0, review_date="1/5/2022",
                               review="It's decent."))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao3),
                               uid=shao11,
                               mid=mid, rating=3, upvote=0, downvote=0, review_date="1/2/2022", review="It's good"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao4),
                               uid=shao12,
                               mid=mid, rating=4, upvote=0, downvote=0, review_date="1/6/2022",
                               review="It's good."))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao5),
                               uid=shao13,
                               mid=mid, rating=5, upvote=0, downvote=0, review_date="15/3/2022",
                               review="I missed you Iron man!"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao6),
                               uid=shao14,
                               mid=mid, rating=5, upvote=0, downvote=0, review_date="8/3/2022",
                               review="Toothless is so cute."))

# Dragonheart
mid = dragonheart_mid
movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao1),
                               uid=shao9,
                               mid=mid, rating=3, upvote=0, downvote=0, review_date="1/7/2022", review="4/5"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao2),
                               uid=shao10,
                               mid=mid, rating=5, upvote=0, downvote=0, review_date="1/5/2022",
                               review="It's classic."))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao3),
                               uid=shao11,
                               mid=mid, rating=2, upvote=0, downvote=0, review_date="1/2/2022", review="A bit silly, but not too bad"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao4),
                               uid=shao12,
                               mid=mid, rating=4, upvote=0, downvote=0, review_date="1/6/2022",
                               review="It's good."))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao5),
                               uid=shao13,
                               mid=mid, rating=5, upvote=0, downvote=0, review_date="15/3/2022",
                               review="Draco!"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao6),
                               uid=shao14,
                               mid=mid, rating=4, upvote=0, downvote=0, review_date="8/3/2022",
                               review="One of the kind."))


# Smaug
mid = smaug_mid
movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao1),
                               uid=shao9,
                               mid=mid, rating=5, upvote=0, downvote=0, review_date="1/7/2022", review="5/5 best movie"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao2),
                               uid=shao10,
                               mid=mid, rating=4, upvote=0, downvote=0, review_date="1/5/2022",
                               review="Smaug is so intimidating."))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao3),
                               uid=shao11,
                               mid=mid, rating=3, upvote=0, downvote=0, review_date="1/2/2022", review="It's good"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao4),
                               uid=shao12,
                               mid=mid, rating=5, upvote=0, downvote=0, review_date="1/6/2022",
                               review="It's awesome, I had favourited it."))

favourite.add_favourite(shao12, mid)

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao5),
                               uid=shao13,
                               mid=mid, rating=5, upvote=0, downvote=0, review_date="15/3/2022",
                               review="I missed you Iron man!"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao6),
                               uid=shao14,
                               mid=mid, rating=5, upvote=0, downvote=0, review_date="8/3/2022",
                               review="Bad Smaug."))

# poc 1
mid = poc_1_mid
movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao1),
                               uid=shao1,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="1/7/2022", review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao2),
                               uid=shao2,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="1/5/2022",
                               review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao3),
                               uid=shao3,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="1/2/2022", review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao4),
                               uid=shao4,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="1/6/2022",
                               review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao5),
                               uid=shao5,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="15/3/2022",
                               review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao6),
                               uid=shao6,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="8/3/2022",
                               review="bad review"))

mid = poc_2_mid
movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao1),
                               uid=shao1,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="1/7/2022", review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao2),
                               uid=shao2,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="1/5/2022",
                               review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao3),
                               uid=shao3,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="1/2/2022", review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao4),
                               uid=shao4,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="1/6/2022",
                               review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao5),
                               uid=shao5,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="15/3/2022",
                               review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao6),
                               uid=shao6,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="8/3/2022",
                               review="bad review"))

mid = poc_3_mid
movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao1),
                               uid=shao1,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="1/7/2022", review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao2),
                               uid=shao2,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="1/5/2022",
                               review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao3),
                               uid=shao3,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="1/2/2022", review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao4),
                               uid=shao4,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="1/6/2022",
                               review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao5),
                               uid=shao5,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="15/3/2022",
                               review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao6),
                               uid=shao6,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="8/3/2022",
                               review="bad review"))

mid = poc_4_mid
movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao1),
                               uid=shao1,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="1/7/2022", review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao2),
                               uid=shao2,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="1/5/2022",
                               review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao3),
                               uid=shao3,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="1/2/2022", review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao4),
                               uid=shao4,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="1/6/2022",
                               review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao5),
                               uid=shao5,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="15/3/2022",
                               review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao6),
                               uid=shao6,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="8/3/2022",
                               review="bad review"))

mid = poc_5_mid
movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao1),
                               uid=shao1,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="1/7/2022", review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao2),
                               uid=shao2,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="1/5/2022",
                               review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao3),
                               uid=shao3,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="1/2/2022", review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao4),
                               uid=shao4,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="1/6/2022",
                               review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao5),
                               uid=shao5,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="15/3/2022",
                               review="bad review"))

movies.add_review(ReviewDetail(rid=get_rid(cur_rid), name=auth.get_username_firebase(shao6),
                               uid=shao6,
                               mid=mid, rating=1, upvote=0, downvote=0, review_date="8/3/2022",
                               review="bad review"))