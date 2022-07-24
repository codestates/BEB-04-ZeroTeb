FROM node:18

WORKDIR /app

COPY ./server/package*.json ./

RUN npm install

COPY ./server ./

# 다운로드 디렉토리 생성
RUN mkdir /app/static

# RUN npm run build

CMD ["npm", "run", "start:dev"]

EXPOSE 8080