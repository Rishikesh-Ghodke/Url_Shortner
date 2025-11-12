# URL Shortener Web Application

## Description
URL Shortener Web Application is a user-friendly tool that allows users to create shortened versions of long URLs, making them easier to share. This project is built using the MERN stack (MongoDB, Express, React, Node.js).

## Features
- **Shorten URLs**: Convert long URLs into shortened versions with a single click.
- **Copy to Clipboard**: Fast copy functionality for easy sharing.
- **Dark/Light Mode**: User-controlled theme toggling.
- **User-friendly Interface**: Intuitive design for a seamless experience.

## Demo
![URL Shortener Demo](demo_screenshot.png)

## Installation
To run the application locally:

1. **Install dependencies**:
   - Backend: `cd server && npm install`
   - Frontend: `cd client && npm install`

2. **Set up environment variables**:
   Create a `.env` file in the `server` directory:
   ```env
   DB_URL=your-mongodb-uri
   PORT=5000
   BASEURI=http://localhost:5000
   ```
   Create a `.env` file in the `client` directory:
   ```env
   VITE_APP_URI=http://localhost:5000
   ```

3. **Start the development servers**:
   - Server: `cd server && npm start`
   - Client: `cd client && npm run start`

## Technologies Used
- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express, MongoDB (Mongoose)
