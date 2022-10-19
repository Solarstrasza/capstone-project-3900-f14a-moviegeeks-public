# capstone-project-3900-f14a-moviegeeks-public-repository
capstone-project-3900-f14a-moviegeeks created by GitHub Classroom
 
## System Installation

### Backend Installation

#### Setup Sqlite3 Database:

1. Install sqlite3 from [https://www.sqlite.org/index.html](https://www.sqlite.org/index.html)
2. If the `imdb.db` file can be found in `/src/backend/database` directory, then the following sqlite3 database setup steps can be skipped.
3. Open the terminal.
4. `cd` to `src/backend/database` directory 
5. Input `sqlite3 imdb.db` and press enter.
6. Input `.read seeds.sql` and press enter. If the terminal does not output any error messages, then the database is set up successfully.

#### Setup Uvicorn Server:

1. Install python 3.8 from [https://www.python.org/downloads/](https://www.python.org/downloads/)
2. At the root directory, type `python3 -m venv venv` and press enter
3. Type `source venv/bin/activate` and press enter to get into the virtual environment.
4. Type `pip install -r requirements.txt` and press enter, it will automatically install all the needed python3 library for this virtual environment.
5. Then backend installation is finished.

### Frontend installation

1. Install Node.js 16 LTS from [https://nodejs.org/en/](https://nodejs.org/en/)
2. Go to the `src/frontend/frontend\_movie/` directory by using the `cd` command.
3. Type `npm install` and press enter, it will setup the frontend environment automatically.
4. Frontend installation is finished.

### Launching backend server

1. Check if python is running in a virtual environment (i.e. there is `(venv)` at the beginning of the terminal command line.)
2. If not, type `source venv/bin/activate` and press `enter` in the root directory, to enter the virtual environment.
3. Go to `src/backend/` by using the `cd` command.
4. Type `uvicorn server:app` and press enter, then the backend server will launch.


### Launching frontend server

1. Go to `src/frontend/frontend\_movie` by using the `cd` command.
2. Type `npm start` and press enter, then the frontend server will launch.
3. Using the browser to get to the address shown in the terminal, the user can access the website.

(Note that the backend server should launch before the frontend server.)

## Frontend walkthrough
Users will find themselves in the intro page when they first get into the website. Here you may choose to start browsing by clicking the button in the middle. They may also go to the sign in page to register their accounts by clicking the button on the top right.

### Creating an account
To register, the user must click on the `Sign in` button on the right side of the navigation bar. Next, they simply put in username, email and password in the form and click on `Register`. Then the users will get their own accounts and the system will log the user in.
### Logging on
Should the user already have an account, they can simply enter their details and click `Login`. There is also the options to reset password, as well as create an account should the user need.

### Resetting password
Should the user forget their account password, they are able to click the `Forgot password` button. They can then input their email address, and a password reset link will be sent to the email that the user entered.

### Searching a specific movie

The users can find the search bar at the top of the website. Simply type in the keyword of the movies, and the results will show up automatically. On the left side, users can also select a specific genre or type in the specific director they want to search.

### Viewing home page

The homepage shows the recently released movies as well as the current trending list of movies. User activities, as well as the activities of other users will have an impact on the trending page. Users will find lots of movies of interest here.

### Rating and leaving a review

When users click into one of the movie posters, it will redirect them into the corresponding movie detail page. Inside it, users can post their reviews and give ratings on the movie.

### Similar movies

Below any movie information page, below the reviews section, is the `similar titles` section. This recommends other movies that are similar to the movie on that page. Users are free to click on the movie posters to travel to that movie.

The user is also able to select the criteria that goes into the system finding similar movies. Instead of taking all criteria into account, the user may only be concerned with movies with the same director or crew. In this case, they can tick off the other categories and update the list of similar movies. The page will then refresh to showcase a set of similar movies that fit with the users new criteria.

### Browse profile

Users are able to view their profiles by clicking the top right button on the nav-bar. It will redirect them to their own profiles. They may click on any reviewers and view their profiles as well. In the profile page, users can update their description and profile picture. They can have an overview of their reviews, wishlist and favourites. If the users ban any other users, they may unban them in this page as well.

`Wishlist` in the navigation bar will display a full list of the user&#39;s wishlist. For each movie in the users wishlist, the system will display the movie poster, name and rating. Users have an option to delete the movie from their wishlist using the `Delete from Wishlist` button.


Favourites tab is very similar to wishlist. It can be used by the user to store a list of their favourite movies that they have watched. Users again have the option to delete elements from their favourites.


`Banned Reviewers` in the navigation bar will display a list of all other users that the user has banned in review sections. In this section, the user can see their profile pictures, username, user ID, and an option to unban that user. Banned users reviews&#39; will not appear for the user that banned them, and their rating won&#39;t be taken into calculation for movies for the user.

### Recommendation

To view any recommended movies, users will find this page by clicking into the `Recommended` button at the top nav-bar. This will display a list of movies that has the highest recommendation score for that user. Recommendation scores are affected by the users ratings, favourites, wishlist, reviews and various other factors.

To see the list of similar users, users can find them by clicking into the `Similar Users` button at the top nav-bar. This will display a page with a list of other similar users using the system. The user is able to travel to the user&#39;s profile page by clicking on them and viewing their profile, favourites and wishlist. The similarity score is calculated by the user ratings, reviews, wishlists and favourites as compared to other users.

