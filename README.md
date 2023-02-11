<p align="center">Home assignment for FashionCloud company</p>

## Description

REST API that exposes methods to interact with a cache.

To simplify the review process, please use an existing [postman collection](FashionCloud.postman_collection.json).
We expect you use node [v18.14.0](https://nodejs.org/en/) or higher.

## Quick Start

To run a project, simply run:

```bash
docker compose up -d
```

## Manual Start

If you would still prefer to run the project manually, follow these steps:

### Installation

```bash
npm install
```

### Environment variables

Set the environment variables:

```bash
cp config/local.yml.example config/local.yml

# open local.yml and modify the environment variables (if needed)
```


### Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

### Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```
