import auth.auth as auth
import favourite
import movies
from database.dataclass import *

# This purpose of this file is just to populate the database for project demo.

# movies.add_review(ReviewDetail(rid=8761239, name=auth.get_username_firebase("HW0a1uhBT1WELr30l6GKl0mEXCI3"),
#                                uid="HW0a1uhBT1WELr30l6GKl0mEXCI3",
#                                mid=10437086, rating=3, upvote=0, downvote=0, review_date="1/7/2022", review="It's OK"))

# movies.add_review(ReviewDetail(rid=9821732, name=auth.get_username_firebase("6d6jYtsbLLawOBPGNLNiVAI7Ar43"),
#                                uid="6d6jYtsbLLawOBPGNLNiVAI7Ar43",
#                                mid=10437086, rating=4, upvote=0, downvote=0, review_date="1/5/2022",
#                                review="It's decent"))

movies.add_review(ReviewDetail(rid=9821512, name=auth.get_username_firebase("Q1FZYndDTvMVSlmHThQ4QBsb4jE3"),
                               uid="Q1FZYndDTvMVSlmHThQ4QBsb4jE3",
                               mid=10437086, rating=1, upvote=0, downvote=0, review_date="1/2/2022", review="It's bad"))

movies.add_review(ReviewDetail(rid=1521732, name=auth.get_username_firebase("u0Yec7qxzfTS76b49avUAWm1lmx2"),
                               uid="u0Yec7qxzfTS76b49avUAWm1lmx2",
                               mid=10437086, rating=4, upvote=0, downvote=0, review_date="1/6/2022",
                               review="It's good"))

movies.add_review(ReviewDetail(rid=1851732, name=auth.get_username_firebase("b9hNoN5KUcTUPK4zzxVlhOZy1M92"),
                               uid="b9hNoN5KUcTUPK4zzxVlhOZy1M92",
                               mid=10437086, rating=3, upvote=0, downvote=0, review_date="15/3/2022",
                               review="It's accetable"))

movies.add_review(ReviewDetail(rid=1850932, name=auth.get_username_firebase("hjaIGHxaJBa6XyQ996GpY72Ofnl2"),
                               uid="hjaIGHxaJBa6XyQ996GpY72Ofnl2",
                               mid=10437086, rating=1, upvote=0, downvote=0, review_date="8/3/2022",
                               review="It's disappointing"))

movies.add_review(ReviewDetail(rid=1851632, name=auth.get_username_firebase("hDlwKvCvpZVJXJ4o8T1T81h0AIa2"),
                               uid="hDlwKvCvpZVJXJ4o8T1T81h0AIa2",
                               mid=10437086, rating=1, upvote=0, downvote=0, review_date="5/2/2022",
                               review="It's terrible"))

movies.add_review(ReviewDetail(rid=4351732, name=auth.get_username_firebase("El80M7NuUYRCB1I41hfhuYlNkTk1"),
                               uid="El80M7NuUYRCB1I41hfhuYlNkTk1",
                               mid=10437086, rating=3, upvote=0, downvote=0, review_date="5/3/2022",
                               review="It's not that bad"))

movies.add_review(ReviewDetail(rid=5359532, name=auth.get_username_firebase("5c8m7x241HNhRSFRWeMB7ZtLnYB2"),
                               uid="5c8m7x241HNhRSFRWeMB7ZtLnYB2",
                               mid=10437086, rating=5, upvote=0, downvote=0, review_date="5/7/2022",
                               review="It awesome, I favourited it!"))

movies.add_review(ReviewDetail(rid=7351732, name=auth.get_username_firebase("cFwUkQbbkRWxWmuYm9ud0TSKRPM2"),
                               uid="cFwUkQbbkRWxWmuYm9ud0TSKRPM2",
                               mid=10437086, rating=2, upvote=0, downvote=0, review_date="5/3/2022", review="It's meh"))

#   "mid": 10448115,
#   "title": "Shazam!",

# movies.add_review(ReviewDetail(rid=8751239, name=auth.get_username_firebase("HW0a1uhBT1WELr30l6GKl0mEXCI3"),
#                                uid="HW0a1uhBT1WELr30l6GKl0mEXCI3",
#                                mid=10448115, rating=1, upvote=0, downvote=0, review_date="1/7/2022", review="It's bad"))

# movies.add_review(ReviewDetail(rid=9821122, name=auth.get_username_firebase("6d6jYtsbLLawOBPGNLNiVAI7Ar43"),
#                                uid="6d6jYtsbLLawOBPGNLNiVAI7Ar43",
#                                mid=10448115, rating=2, upvote=0, downvote=0, review_date="1/5/2022", review="It's bad"))

movies.add_review(ReviewDetail(rid=6821512, name=auth.get_username_firebase("Q1FZYndDTvMVSlmHThQ4QBsb4jE3"),
                               uid="Q1FZYndDTvMVSlmHThQ4QBsb4jE3",
                               mid=10448115, rating=1, upvote=0, downvote=0, review_date="1/2/2022", review="It's bad"))

movies.add_review(ReviewDetail(rid=1561732, name=auth.get_username_firebase("u0Yec7qxzfTS76b49avUAWm1lmx2"),
                               uid="u0Yec7qxzfTS76b49avUAWm1lmx2",
                               mid=10448115, rating=2, upvote=0, downvote=0, review_date="1/6/2022", review="It's bad"))

movies.add_review(ReviewDetail(rid=1862732, name=auth.get_username_firebase("b9hNoN5KUcTUPK4zzxVlhOZy1M92"),
                               uid="b9hNoN5KUcTUPK4zzxVlhOZy1M92",
                               mid=10448115, rating=1, upvote=0, downvote=0, review_date="15/3/2022",
                               review="It's bad"))

movies.add_review(ReviewDetail(rid=1890932, name=auth.get_username_firebase("hjaIGHxaJBa6XyQ996GpY72Ofnl2"),
                               uid="hjaIGHxaJBa6XyQ996GpY72Ofnl2",
                               mid=10448115, rating=1, upvote=0, downvote=0, review_date="8/3/2022", review="It's bad"))

movies.add_review(ReviewDetail(rid=2851632, name=auth.get_username_firebase("hDlwKvCvpZVJXJ4o8T1T81h0AIa2"),
                               uid="hDlwKvCvpZVJXJ4o8T1T81h0AIa2",
                               mid=10448115, rating=1, upvote=0, downvote=0, review_date="5/2/2022", review="It's bad"))

movies.add_review(ReviewDetail(rid=4126312, name=auth.get_username_firebase("El80M7NuUYRCB1I41hfhuYlNkTk1"),
                               uid="El80M7NuUYRCB1I41hfhuYlNkTk1",
                               mid=10448115, rating=1, upvote=0, downvote=0, review_date="5/3/2022", review="It's bad"))

movies.add_review(ReviewDetail(rid=5351632, name=auth.get_username_firebase("5c8m7x241HNhRSFRWeMB7ZtLnYB2"),
                               uid="5c8m7x241HNhRSFRWeMB7ZtLnYB2",
                               mid=10448115, rating=2, upvote=0, downvote=0, review_date="5/7/2022", review="It's bad"))

movies.add_review(ReviewDetail(rid=7359082, name=auth.get_username_firebase("cFwUkQbbkRWxWmuYm9ud0TSKRPM2"),
                               uid="cFwUkQbbkRWxWmuYm9ud0TSKRPM2",
                               mid=10448115, rating=1, upvote=0, downvote=0, review_date="5/3/2022", review="It's meh"))

favourite.add_favourite(uid="5c8m7x241HNhRSFRWeMB7ZtLnYB2", mid=10437086)
