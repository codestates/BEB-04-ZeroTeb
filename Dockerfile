FROM node:18

WORKDIR /app

COPY ./server/package*.json ./

RUN npm install

COPY ./server ./

RUN npm run build

RUN cd /app/server

CMD ["npm", "run", "start:prod"]

EXPOSE 8080