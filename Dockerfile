FROM node:18.15

WORKDIR /app

COPY . /app

EXPOSE 4000

CMD ["npx", "next", "dev", "-p", "4000"]

