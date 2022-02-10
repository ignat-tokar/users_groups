# Use a lighter version of Node as a parent image
FROM node:17.4.0

# Set the working directory to /client
WORKDIR /client

# copy package.json into the container at /client
# COPY package*.json /client/

# install dependencies
# RUN npm install

# Copy the current directory contents into the container at /client
# COPY . /client/

COPY --chown=node:node package*.json /client/
RUN npm install

COPY --chown=node:node . /client/
USER node

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]

