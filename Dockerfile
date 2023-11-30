FROM node:18-alpine

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install

# Bundle app source
  
COPY ./jsconfig.json  .  
COPY ./.babelrc  .  
COPY ./src/  ./src/ 

CMD [ "npm", "run", "production" ]
