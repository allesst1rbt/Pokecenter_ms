FROM node 

WORKDIR /app/users

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8001

RUN chmod -R 777 ./

RUN npm install @prisma/client

RUN npx prisma generate

RUN npx tsc

RUN npx prisma migrate dev

CMD ["npm", "run", "start"]
