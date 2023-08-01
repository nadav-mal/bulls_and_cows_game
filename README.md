[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/YDg-_nm7)
## Authors
* Name:  Email: Ely Asaf 
* Name:  Email: Nadav Malul 

## Explanations


This is a web-based implementation of the Bulls and Cows game, also known as "Bulls and Bulls", where the player tries to guess a random 4-digit number using digits from 0 to 9, with no repetition of digits. For each guess, the game displays the number of bulls and cows. A bull represents a correct digit in the correct position, while a cow represents a correct digit in the wrong position. The player wins the game if they guess the number with 4 bulls.

The solution consists of a React frontend and a Servlet backend. The backend provides endpoints for adding a player's name and score to the high scores, as well as retrieving the top 5 high scores ordered by increasing guesses. The high scores are stored in a file named scores.dat using ObjectStreams.
<h1> Example API calls for postman: <h1>
<p> POST localhost:8080/java_react_war/api/highscores?name=nadav&score=1 <p>
<p> GET localhost:8080/java_react_war/api/highscores <p>

###  dependencies
The template depends on:
* your local installation of tomcat, this template uses
  tomcat 9.0.45 that can be downloaded from https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.45/bin/apache-tomcat-9.0.45.tar.gz.
  In order to point to your own installation of tomcat, edit configuration in IntelliJ change the application server.
* your local installation of nodejs, this template is based on nodejs v18.15.0 (npm 9.5.0). You can download it from https://nodejs.org/en/download.
* your local installation of java (select one SDK at: File->Project Structure->Platform SDK). You can add SDK from IntelliJ by cliking on  File->Project Structure->Platform Settings-> +).
  This template is based on version 19, you can also download it from https://jdk.java.net/19/).

###  source files
The template includes:
* a Java Web template with an empty Servlet to implement your server side REST API under the src/main/java folder
* a React template under the reac-client folder, with an initialized npm project.

## In order to run your exercise you:
* run the server side; with IntelliJ configuration at the upper right (created above)
* run the client side: open the terminal: `cd react-client`, `npm install`,  run with the command `npm start`

Then browse:
* your react client at http://localhost:3000
* your server will be available at http://localhost:8080/api/highscores (you have of course to implement the REST API).
  Note that you should never specify the host and port in your React code! (use 'api/' instead of 'http://localhost:8080/api/')

