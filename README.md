## Backend of G-story web

This is a software application that enables story seekers to from all over the world to visit and read stories. 
Storytellers from any part of the world can also register and publish story, and has an Admin with priviledge over all stories and storytellers' profile.

## How to run application

We'll clone our repo by running these commands

1. `git clone repo_url` 
2. `cd repoDir/back-end` 

Now that  we have cloned our repo and entered inside our backend directory, we'll set up our application 

1. Make sure that your database service is running, 
2. Create a new database and take note of the name.
3. Locate the `.env` file in our project root, fill up the database section using the data from the new database that you created. 
4. Run our migrations to prepare our database tables `php artisan migrate`
5. Run the Database seed to generate test data for our application `php artisan db:seed`
6. Link `storage` directory to `public`  by running `php artisan storage:link` 
7. After Setting up your application environment, run `php artisan serve`  
8. Take note of the url, this is what you'll use to connect to the endpoint from the Frontend.
9. Access your database `story-teller` using phpmyadmin or any  other database client, on table `users`.
10. You can create an admin user by creating a new user, and assigning the `type` as `admin`.

## Setting up story-teller front end 

1. Clone git repo using `git clone repoUrl`
2. `cd repoDir`
3. Access `.env` file change VITE_APP_BASE_URL=`server_url_of_backend/api` 
4. Run app, `npm run dev`

## Note 
1. You can create a new user account, login, write and publish stories.
You can also copy user emails from the database, all password is defaulted to `password` 
2. You can also create an admin user by setting the table `type` to `admin`

## Library Used
1. Php Laravel

## Database
1. MysQl Database


## Description of G-web Story Front End
This is a software application that enables story seekers to from all over the world to visit and read stories. 
Storytellers from any part of the world can also register and publish story, and has an Admin with priviledge over all stories and storytellers' profile.

## Setting up story-teller front end 
1. Clone git repo using `git clone repoUrl`
2. `cd repoDir`
3. Access `.env` file change VITE_APP_BASE_URL=`server_url_of_backend/api` 
4. Run app, `npm run dev`

## Note 
1. You can create a new user account, login, write and publish stories.
You can also copy user emails from the database, all password is defaulted to `password` 
2. You can also create an admin user by setting the table `type` to `admin`

## Library Used
1. React
2. TailwindCss

**_Photo by Amina Filkins from Pexels_** url("link")[https://www.pexels.com/photo/black-girl-with-books-sitting-on-floor-5561161/]

**_Photo by Keira Burton:_** url("Link")[https://www.pexels.com/photo/black-children-playing-on-couch-6624179/]

