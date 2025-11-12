# Dockerization Summary: URL Shortener Backend

This document summarizes the steps taken to containerize the backend of the URL Shortener application for deployment to Google Compute Engine.

## 1. File Created: `server/Dockerfile`
The `Dockerfile` is a blueprint for your application container. Here is what each line does:

```dockerfile
# Step 1: Use an official Node.js runtime as the base image
# 'alpine' is a tiny, secure version of Linux perfect for containers.
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package files first
# This is a Docker "trick" to make builds faster by caching dependencies.
COPY package*.json ./

# Step 4: Install production dependencies
RUN npm install --production

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Inform Docker that the container listens on port 5000
EXPOSE 5000

# Step 7: Define the command to run the app
CMD ["node", "src/server.js"]
```

## 2. File Created: `server/.dockerignore`
This file tells Docker which files to **ignore** when building the image. This keeps the image size small and secure.

**Ignored items:**
- `node_modules`: We install these fresh inside the container.
- `.env`: We will pass environment variables through the cloud console instead of hardcoding them.
- `npm-debug.log`: Unnecessary logs.
- `.git`: Source control history is not needed for execution.

## 3. How to Build and Run (Your Reference)

### **To Build the Image Locallly:**
Open your terminal in the `server` folder and run:
`docker build -t url-shortener-backend .`

### **To Run the Container Locally:**
`docker run -p 5000:5000 --env-file .env url-shortener-backend`
*This maps port 5000 of your computer to port 5000 of the container.*

---
**Next Step Recommendation:** 
Before pushing this to the cloud, you should build the image and push it to a registry like **Docker Hub** so your Google VM can "pull" it later.
