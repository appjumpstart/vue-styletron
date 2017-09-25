FROM node:8.5

# Create vuestyle directory.
RUN mkdir /srv/vuestyle
WORKDIR /srv/vuestyle

# Install dependencies.
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

# Copy over source files.
COPY . .

CMD [ "npm", "test", "--silent" ]
