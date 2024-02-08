FROM node:20.10

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 4000

CMD ["npx", "next", "dev", "-p", "4000"]

