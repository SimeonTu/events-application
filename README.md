# Dev Events
Dev Events is a serverless, Progressive Web Application (PWA) designed to provide users with a seamless experience in discovering upcoming events in various cities. The project was developed using a Test-Driven Development (TDD) approach, ensuring robust functionality through unit, integration, and end-to-end testing.

Key features include:

- Event Discovery: Fetches events from the Google Calendar API.
- Authentication: Utilizes Google OAuth for secure access.
- Serverless Architecture: Hosted on AWS Lambda for cost efficiency and scalability.
- Progressive Web App: Enables offline support, instant loading, and cross-platform compatibility.
- Data Visualization: Displays insights on event frequency and technology trends.

## Technologies Used
- Frontend: React, HTML, CSS
- Backend: Serverless functions (AWS Lambda)
- Authentication: Google OAuth
- Testing: Jest, Cucumber.js (unit, integration, end-to-end testing)
- Data Visualization: Recharts
- Geolocation API: Detects user's country for localized event recommendations
- AI Integration: ChatGPT API for dynamic app name generation

## Features

### 1. Test-Driven Development (TDD)
The application was built using TDD principles, ensuring that all features meet predefined requirements before implementation. This methodology improved reliability and maintainability.

### 2. Serverless Functions
Using AWS Lambda for serverless architecture allowed for efficient backend operations without managing dedicated servers.

### 3. Progressive Web Application (PWA)
The app supports:

- Offline mode
- Instant loading
- Cross-device compatibility

### 4. Authentication with Google OAuth
Users can securely log in using their Google accounts to access personalized event recommendations.

### 5. Interactive Data Visualization
Event trends are displayed using charts, showing event distribution across cities and recurring technology topics.

### 6. Additional Enhancements
- Landing Page: A welcoming page with a "Login with Google" button for better user experience.
- Geolocation Feature: Detects the user’s country and suggests relevant events.
- AI-powered Name Generator: A ChatGPT-powered button allows users to generate a new app name dynamically.

## Installation and setup

1. Clone the repository:

   ```bash
   git clone https://github.com/SimeonTu/events-application
   cd events-application
   ```

2. Install dependencies:

    ```bash
    npm install
    ```
3. Run tests:

   ```bash
   npm test
   ```

4. In order to run the project in development mode, type :

    ```bash
    npm run dev
    ```
    
This will run both the server and the frontend simultaneously using the library ```concurrently```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

