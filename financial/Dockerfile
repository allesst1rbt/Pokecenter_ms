FROM node 

WORKDIR /app/financial

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8002

RUN chmod -R 777 ./

RUN npm install @prisma/client

RUN npx prisma generate

RUN npx tsc

CMD ["npm", "run", "start"]



