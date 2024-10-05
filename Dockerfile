# Use the official Node.js image
FROM  mcr.microsoft.com/playwright:v1.47.2-noble


# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Command to run the Playwright script
CMD ["npx", "playwright", "test", "--project=dockerized"]