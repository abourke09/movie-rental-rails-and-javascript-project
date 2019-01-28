 - [X] video walkthrough recorded & uploaded, blogpost finished, ReadMe finalized
 - [ ] upon login, the currentUser() evaluated, but the current_user_id is still undefined.
 - [ ] after project review, incorporate final edits & suggestions, delete this file, commit to master, push to GitHub

Rails App with JavaScript Frontend Spec
======================================
Project Specs:
---------------
 - [X] **Must have a Rails Backend and new requirements implemented through JavaScript.**
    - I've used my Rails project as a starting point and implemented the requirements below using JS.
 - [X] **Makes use of ES6 features as much as possible(e.g Arrow functions, Let & Const, Constructor Functions)**
    - A constructor function is employed to build my Movie Javascript Object Models. I use Let to declare my variable movieQuotes in Movie.prototype.movieHTML. In my mind, a major difference between Const and Let is that the value of Const cannot be reassigned to another value after it is declared. I used Let because I would need to redeclare the value of movieQuotes every time a user clicked on a Movie to view it's info.
 - [X] **Must translate the JSON responses into Javascript Model Objects using either ES6 class or constructor
    syntax.**
    - The JSON response for movies are translated into JS model objects by calling on a new instance of a Movie class, which used a constructor function to assign attributes to each object.
 - [X] **Must render at least one index page (index resource - 'list of things') via JavaScript and an Active
    Model Serialization JSON Backend.**
    - I've rendered an index page of Movies via Javascript (json can be viewed at 'localhost:3000/movies.json'). The user clicks on All Movies, which gets picked up by the moviesNavClick function. That function then shovels in some fresh html to the DOM and sends an AJAX json request to '/movies' to get the data. In the AJAX success function, we loop through the data while employing the Movie constructor function (as defined in movie.js) and shovel it onto the dom using html formatting defined in Movie.prototype.movieList.

 - [X] **Must render at least one show page (show resource - 'one specific thing') via JavaScript and an
    Active Model Serialization JSON Backend.**
    - I've rendered a show page (an instance of one specific resource) of a single Movie. While viewing the All Movies index page, the user can choose to click on a single Movie to see more details. The click is heard by the listenForMovieClick function, which sends an AJAX request for json to that movie's show page url 'localhost:3000/movies/:id'. Similar to the index list, the AJAX success funciton them employs the Movie constructor function and shovels it onto the dom using html formatting defined in Movie.prototype.movieHTML.

 - [X] **Your Rails application must reveal at least one `has-many` relationship through JSON that is then
    rendered to the page.**
    - This Rails App employs a has-many relationship through JSON when displaying a Movie the has many Famous Quotes associated with it. The movie_serializer and famous_quote_serializer define the has_many/belongs_to relationship so that it is displayed at that movie resource's '.json' url. When a single movie is displayed to the DOM using an AJAX request, the Famous Quotes are simultaneously displayed on the DOM using the same Movie.prototype.movieHTML.

 - [X] **Must use your Rails application and Javascript to render a form for creating a resource that submits
    dynamically.**
    - New Famous Quote or edit user info (age)
 - [X] **At least one of the JS Model Objects must have a method on the prototype.**
    - The Movie Javascript Object Model has two prototype methods, Movie.prototype.movieHTML and Movie.prototype.movieList.  

Project Repo Specs:
---------------
**Read Me file contains:**
 - [X] Application Description
 - [X] Installation guide (e.g. fork and clone repo, migrate db, bundle install, etc)
 - [X] Contributors guide (e.g. file an issue, file an issue with a pull request, etc)
 - [X] Licensing statement at the bottom (e.g. This project has been licensed under the MIT open source license.)
 - [ ] Repo General
 - [X] You have a large number of small Git commits
 - [X] Your commit messages are meaningful
 - [X] You made the changes in a commit that relate to the commit message
 - [X] You don't include changes in a commit that aren't related to the commit message
