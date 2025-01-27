# Use Node.js 18.18.0 as the base image
FROM node:18.18.0-alpine
WORKDIR /app

# Build arguments
ARG MONGO_URL
ARG JWT_SECRET
ARG CLOUDINARY_CLOUD_NAME
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET

# Set environment variables using build arguments
ENV MONGO_URL=${MONGO_URL} \
    JWT_SECRET=${JWT_SECRET} \
    CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME} \
    CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY} \
    CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}

# Copy package files
COPY package*.json ./

# Print the file list and Node.js version for debugging
RUN ls && node -v

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Build the application
RUN npm run build

# Expose the application's port
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
