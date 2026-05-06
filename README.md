# ZKTeco BioTime PDF Card Generator

Next.js application for generating employee PDF cards using data provided by the [zkteco-biotime-attendance-api](https://github.com/AnthonyTepach/zkteco-biotime-attendance-api).

This project does **not** connect directly to the BioTime PostgreSQL database. Instead, it consumes the external API to retrieve employee attendance and check-in data, and then generates downloadable PDF documents from that information.

## Features

- Generate employee PDF cards from BioTime attendance data.
- Built with Next.js for a fast and modern web interface.
- Connects to `zkteco-biotime-attendance-api` to fetch employee records.
- Docker-ready development workflow.
- Supports mounting local resources for PDF generation.

## Architecture

This project works as the PDF generation layer of the BioTime ecosystem:

- **API layer:** [`zkteco-biotime-attendance-api`](https://github.com/AnthonyTepach/zkteco-biotime-attendance-api)
- **Frontend / PDF layer:** `zkteco-biotime-pdf-card-generator`

The application sends requests to the attendance API, processes the response, and renders employee card data into PDF files.

## Requirements

Before running this project, make sure you have:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/) (optional)
- Access to a running instance of [`zkteco-biotime-attendance-api`](https://github.com/AnthonyTepach/zkteco-biotime-attendance-api)

## Clone the repository

```bash
git clone git@github.com:AnthonyTepach/zkteco-biotime-pdf-card-generator.git
cd zkteco-biotime-pdf-card-generator
```

## Build the Docker image

From the project root, run:

```bash
docker build -t zkteco-biotime-pdf-card-generator:dev .
```

## Run the container

```bash
docker run -d \
  --name zkteco-biotime-pdf-card-generator \
  -p 4001:4000 \
  -v "$PWD":/app \
  -v /app/node_modules \
  -v "$PWD/public/resources_pdf:/app/public/resources_pdf" \
  zkteco-biotime-pdf-card-generator:dev
```

## Verify the container

To confirm the container is running:

```bash
docker ps
```

Look for the container named `zkteco-biotime-pdf-card-generator` and verify that port `4001` is mapped correctly.

## Access the application

Open your browser and go to:

```bash
http://localhost:4001
```

## Stop and remove the container

Stop the container:

```bash
docker stop zkteco-biotime-pdf-card-generator
```

Remove the container:

```bash
docker rm zkteco-biotime-pdf-card-generator
```

## View container logs

```bash
docker logs zkteco-biotime-pdf-card-generator
```

## Remove the Docker image

```bash
docker rmi zkteco-biotime-pdf-card-generator:dev
```

## Docker Compose

If you prefer Docker Compose, you can use a setup like this:

```yml
version: '3'

services:
  pdf_card_generator:
    container_name: zkteco-biotime-pdf-card-generator
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "4001:4000"
    volumes:
      - .:/app
      - /app/node_modules
      - ./public/resources_pdf:/app/public/resources_pdf
    restart: unless-stopped
```

Start the service with:

```bash
docker-compose up --build -d
```

## Notes

- Make sure the `public/resources_pdf` directory exists on your local machine before starting the container.
- This project depends on the availability of `zkteco-biotime-attendance-api`.
- Configure the API base URL in your environment variables if your frontend expects a custom endpoint.

## Related project

- [zkteco-biotime-attendance-api](https://github.com/AnthonyTepach/zkteco-biotime-attendance-api)

## Author

[@AnthonyTepach](https://github.com/AnthonyTepach)
