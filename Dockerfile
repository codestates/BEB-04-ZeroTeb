FROM node:18

WORKDIR /app

COPY ./server/package*.json ./

RUN npm install

COPY ./server ./

# RUN npm run build

CMD ["npm", "run", "start:dev"]

EXPOSE 8080