# News Aggregator API Service
**Objective**: Build a RESTful API that allows users to fetch news articles from multiple sources based on their preferences.


**Project Description**: In this project, we will create a RESTful API using Node.js, Express.js, and NPM packages. The API will allow users to register, log in, and set their news preferences (e.g., categories, sources). The API will then fetch news articles from multiple sources using external news APIs (e.g., NewsAPI). The fetched articles should be processed and filtered asynchronously based on user preferences.

## Installation

### Clone this repository using command

    git clone <repository_url> 

### Install required dependencies using command:
    npm install 

### Audit installed dependencies using below command (fix the dependencies if any vulnerabilities found)
    npm audit 

## Usage

### Update .env file and configure required fields
    
    PORT=Port number where server will run at
    MONGODB_CONNECTION=MongoDB connection string
    JWT_SECRET=JWT secret to sign/decode JWT
    NEWS_API_KEY=News API key configured on your account. Can be found at https://newsapi.org/
    

### Start the server using command:
    npm run start 


### Access the API routes using the following URL:
    http://localhost:PORT/tasks

> **NOTE**  
> Test the API using Postman. Collections are available in public folder for reference

### Run the unit test cases (with code coverage) using command:
    npm run test:unit

# Available Rest API Endpoints

## Register a user

### Request
    
`POST /register`

    curl --location 'http://localhost:8996/user/register' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "test@gmail.com",
        "firstName": "Test",
        "lastName": "Testing",
        "password": "Test@1234",
        "role": "user"
    }' 

### Response

    Status 201


  
## Login a user

### Request

`POST /login` 

    curl --location 'http://localhost:8996/user/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "test@gmail.com",
        "password": "Test@1234"
    }'
### Response
    Status 200 with access token
    
## Set user preferences

### Request
`PUT /preferences`

    curl --location --request PUT 'http://localhost:8996/preferences' \
    --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjUyYTQ4MjBmNzJmM2VhMmI2MjEyNCIsInJvbGUiOiJ1c2VyIiwic3ViIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE2OTY5MzcwMjYsImV4cCI6MTY5NzAyMzQyNn0.rGFzaZ7S_kI0kmyraIFtyptU494XpnWFIhWZnqwBLZ0' \
    --header 'Content-Type: application/json' \
    --data '{
        "category": "technology"
    }'
     
#### Required parameters: 
    category
    token in authorization header
    Available categories are: business, entertainment, general, health, science, sports, technology.
    Default is business

### Response
    Status 200

## Get user preferences
  
### Request
`GET /preferences`

    curl --location 'http://localhost:8996/preferences' \
    --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjUyYTQ4MjBmNzJmM2VhMmI2MjEyNCIsInJvbGUiOiJ1c2VyIiwic3ViIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE2OTY5MzcwMjYsImV4cCI6MTY5NzAyMzQyNn0.rGFzaZ7S_kI0kmyraIFtyptU494XpnWFIhWZnqwBLZ0'

#### Required parameters:
    token in authorization header
    
### Response
    Status 200 with user preferences, if any set by user.

## Fetch news articles based on the logged-in user's preferences
   
### Request
`GET /news`

    curl --location 'http://localhost:8996/news' \
    --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjUyYTQ4MjBmNzJmM2VhMmI2MjEyNCIsInJvbGUiOiJ1c2VyIiwic3ViIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE2OTY5MzcwMjYsImV4cCI6MTY5NzAyMzQyNn0.rGFzaZ7S_kI0kmyraIFtyptU494XpnWFIhWZnqwBLZ0'

#### Required parameters:
    token in authorization header


### Response
    Status 200 with news articles based on the logged-in user's preferred category. 
    Default is business

## Implement an endpoint to search for news articles based on keywords

### Request 
`GET /news/search/:keyword`

    curl --location 'http://localhost:8996/news/search/bitcoin' \
    --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjUyYTQ4MjBmNzJmM2VhMmI2MjEyNCIsInJvbGUiOiJ1c2VyIiwic3ViIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE2OTY5MzcwMjYsImV4cCI6MTY5NzAyMzQyNn0.rGFzaZ7S_kI0kmyraIFtyptU494XpnWFIhWZnqwBLZ0'    

#### Required parameters:
    token in authorization header

### Response
    Status 200 with news articles for searched keyword