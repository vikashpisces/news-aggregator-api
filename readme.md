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
4. Fetch news articles from multiple sources