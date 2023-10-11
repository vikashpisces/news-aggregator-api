# News Aggregator API Service
**Objective**: Build a RESTful API that allows users to fetch news articles from multiple sources based on their preferences.


**Project Description**: In this project, we will create a RESTful API using Node.js, Express.js, and NPM packages. The API will allow users to register, log in, and set their news preferences (e.g., categories, sources). The API will then fetch news articles from multiple sources using external news APIs (e.g., NewsAPI). The fetched articles should be processed and filtered asynchronously based on user preferences.

## Supported Endpoints

1. Register a user

    - POST /register
    - Required parameters: firstName, lastName, email, password, role (user/ admin)
    - Response: Status 201
  
2. Login a user

    - POST /login
    - Required parameters: email, password
    - Response: Status 200 with access token
    
3. Set user preferences
    - PUT /preferences
    - Required parameters: 
        - category
        - token in authorization header
    - Available categories are: business, entertainment, general, health, science, sports, technology.
    - Default is business
    - Response: Status 200

4. Get user preferences
    - GET /preferences
    - Required parameters:
        - token in authorization header
    - Response: Status 200 with user preferences, if any set by user.

4. Fetch news articles based on the logged-in user's preferences
    - GET /news
    - Required parameters:
        - token in authorization header
    - Response: Status 200 with news articles based on the logged-in user's preferred category. Default is business

## Installation

1. Clone the repository:
``` git clone <repository_url> ```

2. Install dependencies:
``` npm install ```


## Usage

1. Start the server:
``` npm run start ```

2. Update .env file and configure required fields

2. Access the API routes using the following URL:
``` http://localhost:PORT/tasks ```

3. Test the API using Postman or Curl: