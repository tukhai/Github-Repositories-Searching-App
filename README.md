## Introduction

This project is a part of React Frontend Quiz

In a Redux-backed React App, actions are often dispatched from different places, eg: Mouse click on button, Asynchronous response from http APIs, etc. One challenge of writing an Web Application is that application’s actions are often triggered from url changes.

#### Task One
Create a React web app which can do the following:

Search public Github repositories
Has a text input field where user can type in the (part of the) name of the Github repository
The app will then search for the repository via Github API v3, whenever the user is typing in the text input.
Results of the search must be displayed in a list below the search field. (Just displaying the repositories’ name with anchor link to source it will do)
The browser url must display the search query upon every keystroke input by the user, something like this:
  http://localhost:8080?search=react
Users are allowed to directly visit the domain with search query intact. For example, if user key in http://localhost:8080?search=redux directly into the browser url, the search field should be pre-filled with the word redux and search results list below it should asynchronously display the relevant results.

#### Task Two
In the Application above, search (API call) will be triggered upon every keystroke from the user. This is not ideal as it will consume up the rate limit too quickly. Without implementing a hard button for the “search action”, how would you design a solution where user can search without pressing a button on UI, while not consuming the quota too quickly.


## Project Accessing

### Deployment

This project has been deployed at: [https://github-repo-searching-app.herokuapp.com/](https://github-repo-searching-app.herokuapp.com/) <br>
Please visit the url to access the project.

### Project clone
Alternatively, you can clone this project code. <br>
Make sure node and npm are installed in your local machine: <strong>brew install node<strong> <br><br>
In the project root directory, you can run it in 1 of the following modes: <br>

`npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

`npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!


## Explaination

### Task 2 solution
What I did was clear the exiting setTimout, then creating a setTimeout function after every key press. The setTimeout is 3 seconds, inside setTimeout, I call the github repo api. By this way I can prevent over consumption.

### Mobile responsive
This web app is optimize for both mobile and desktop screen.

### shouldComponentUpdates
In this app, I also implement React shouldComponentUpdates to optimize performance.