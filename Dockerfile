FROM node:18

WORKDIR /app

COPY ./server/package*.json ./

RUN npm install

COPY ./server ./

RUN npm run build

RUN ls

CMD ["npm", "run", "start:prod"]

EXPOSE 8080