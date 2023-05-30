# About
* This application allows users to take quizzes for grades and for administrators to deploy new quizzes.
* This project was to test out the waters of React and NodeJS app development & deployment.

# Features
* Individual User Accounts
* Secure front-end password salting & hashing
* Take quizzes for grades
* Create quizzes for users
* Quiz Analytics

# To Download & Run
    $ git clone https://github.com/alrandle/CS499.git
    $ cd ./CS499/backend
    $ npm run all
    
# Backend Dependencies:                  
    "bcryptjs": "^2.4.3",
    "concurrently": "^7.6.0",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "mongoose": "^6.7.4",
    "morgan": "^1.10.0"
    
# Backend Dependencies usage:
    "bcryptjs": Enables storing passwords as hashed passwords
    "concurrently": Allows running sever and client side simutaneously
    "cors": Enables cors to prevent possible cors policy security errors
    "express": Back end web apllication framwork used to build APIs
    "mongoose": Allows ease in creating and managing MongoDB data
    "morgan": HTTP logger. Posts requests and errors
    
### Frontend Dependencies: 
    "axios": "^1.2.0"
    "bcryptjs-react": "^2.4.6"
    "bootstrap": "^5.2.3"
    "react": "^18.2.0"
    "react-dom": "^18.2.0"
    "react-scripts": "5.0.1"
    "web-vitals": "^2.1.4"

### Layout
    Quiz-App
    | - Home : Home page/About section
    | - Login/Registration : Returning/New User forums
    | - Dashboard (Student/Teacher Dash) : For users / Admins to navigate webapp functions
    | - | Exam (Quiz function)
    | - | Quiz Creator
    | - | Analytics

### Usage
    Register
        Click Register button
        Fill out information
        Click Submit
    Login
        Click Login button
        Enter email and password
        Click Submit
## Instructors
    Creator: make quizzes with questions and answers
    Analytics: data related to quizzes
    Dashboard: navigate app

## Students
    Exam: take quizzes
    Dashboard: navigate app

### Mongo Server
    Our instance uses default port 27017

    ** Main Collections **

    use quiz;

    db.createCollection('users');
    db.createCollection('quizs');
    db.createCollection('quizs_responses');

    Database samples can be found in ./docs/mongosh_commands.pdf

### Documentation
    ** Wireframes **
    ./docs/wireframe

    Mongo Setup
    ./docs/mongosh_commands.pdf

    Dev Documentation
    ./docs/dev_docs.pdf

