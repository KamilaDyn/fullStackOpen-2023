# University of Helsinki - Full Stack Open 2023

## About the course

The course is about an introduction to modern web development in JavaScript. Main focus in a single page applications implemented with React and supporting them with RESTful and GraphQL web services implemented with Node.js. The course also has parts on TypeScript, React Native, and Continuous integration. <a href='https://fullstackopen.com/en/'>More info</a>

## PART0 Fundamentals of Web apps

An overall introduction to the course. It introduces to some concepts like HTTP requests, how traditional web apps work, DOM, CSS and Single Page Applications. <a href='https://fullstackopen.com/en/part0/fundamentals_of_web_apps'>Info</a>

<ul>
<li><b>New note diagram: </b>The diagram shows how communicate the browser and the server when user added a note to a page containing JavaScript.</li>
<li><b>Single page app diagram: </b> The diagram shows the communication between the browser and the server when user opened single page app on the browser.</li>
<li><b>New note in Single page app diagram: </b>The diagram shows how communicate the browser and the server when user added a note to a single page app.</li>
</ul>

## PART1 Introduction to React

This part introduces to React concepts. It covers the basics: components, props, JSX and more advanced concepts: Javascript functionalities that are used a lot in React (.map(), .filter(), .reduce()), destructuring, event handlers in React and passing state to child components, spread operator, hooks and their rules and conditional rendering. <a href='https://fullstackopen.com/en/part1'>Info</a>

<ul>
<li><b>Course information: </b>  Simple app about course information page which counts total number of exercises of the course.
</li>
<li><b>Unicafe: </b>React app gathers feedbacks and makes statistic</li>
<li><b>Anecdotes</b>React app provides to vote for a random anecdote, and shows the most voted anecdote.</li>
</ul>

## PART2 Communicating with server

This part covers how to display list items in React and how to handle forms. Introduces JSON server and fetching data from it, axios for sending GET, PUT, POST and DELETE requests. Extend app, with adding style CSS. <a href='https://fullstackopen.com/en/part2'>Info</a>

<ul>
<li><b>Course information: </b> Extended Course info app from part 1. Show sum of exercises, extend application to allow for an arbitrary number of courses</li>
<li><b>The Phonebook: </b>Phonebook, add/delete contacts with numbers, edit numbers. Show notification about errors, and add validation if data of user exist in app. </li>
<li><b>Data for countries: </b>- A react app that fetches and displays information form the <a href='https://restcountries.com/v3.1/all'> REST Countries</a> and <a href='https://openweathermap.org/api'>Weatcher Stack API's.</a></li>
</ul>

## PART3 Programming a server with NodeJS and Express

In this part our focus shifts towards the backend, that is, towards implementing functionality on the server side of the stack. Implement a simple REST API in Node.js by using the Express library, and the application's data will be stored in a MongoDB database. Deploy application to the internet. I used render free server.

<ul>
<li><b>Phone boook backend </b> Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons.</br> Implement a page at the address http://localhost:3001/info </br> Implement the functionality for displaying the information for a single phonebook entry.  </br> Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request  </br> Expand the backend so that new phonebook entries can be added by making HTTP POST requests </br> Implement error handling for creating new entries. </li>
<li><b> Phone book deploy app to internet </b>
Deploy the backend to the internet, I choose  Render. </b>
Generate a production build of  frontend from part 3
</li>
<li>
<b>Saving data to MongoDB</b>
connect app to mongoDB 
</li>
<li><b>Validation and ESLint</b>
add validation so that the name stored in the database has to be at least three characters long and phone numbers are of correct form  </br> Add liny configuration 
</li>
</ul>

<h2>My app is deployed here (front with backend) <a href='https://phonebook-5bn3.onrender.com/' target='_blank'>https://phonebook-5bn3.onrender.com/</a></h2>

## PART4 Testing Express servers, user administration

In this part, is focused on unit and integration tests for the backend. Implementing user authentication and authorization.
Focus on async/ await in the backend. Error handling. Add user administration (creating users and new blog), token authorization for login.

<ul>
<li>
bloglist -  backend project.
Allows user to save information about blog (title, author , url and likes). (Post, put , delete request)
Endpoint to create user and login existing one.
</li>
</ul>

## PART5 Testing React apps

Focus on frontend part. Looking at different possibilities for testing the React code. Implement token based authentication which will enable users to log in to our application. (Used backend from par4).

<ul>
<li>Bloglist - frontend
App frontend code with connected backend from previous part. 
Saving token in browser local storage to keep user logged in. Display all blogs after logged user. 
Creating new blog for logged user. Delete blog just by user who  created blog, add btn to delete. 
Testing test with jest-dom library.
Add cypress test E2E testing. Test login with correct and wrong credentials. Check displaying remove btn just if user created it.

My project app is deployed <a href='https://bloglist-l1do.onrender.com/' target='_blank'>https://bloglist-l1do.onrender.com/</a> </br>
API Users <a href='https://bloglist-l1do.onrender.com/api/users' target='_blank'>https://bloglist-l1do.onrender.com/api/users</a> </br>
API blogs <a href='https://bloglist-l1do.onrender.com/api/blogs' target='_blank'>https://bloglist-l1do.onrender.com/api/blogs</a>

</li>

</ul>
