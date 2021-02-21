Hello, I hope you're safe and doing great :)

I humbly present to you my coding challenge for CF-Calendar.

This is NOT a full project, I focused more on the approach I took to provide the API and I tried to cover several aspects like Custom validation, API docs, DTOs and of course the main features provided by the Framework itself (modules, services, controllers ...).

I'm also aware that there are some important aspects that I didn't cover; more on this later.

## Description

CF-Calendar is a REST API made with [Nest.js](https://nestjs.com/).

Nest.js is progressive Node.js framework for building efficient, reliable and scalable server-side applications and supports TypeScript out of the box.


This API allow students to check if their favorite mentor is available and book a learning slot.

## Requirements and Installation

This project requires (recommended versions):
- Node.js 14.0+
- MongoDB 4.0+

Install the dependencies using the following command
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

I recommend running the app using the watch mode to make and track any changes if needed.

Since the app uses MongoDB the database will be automatically created upon saving our first object and it will be called `cf-calendar`.

Database config is set as default, but it can be changed in `app.module.ts` line `9`.

Once the application is up and running open the following link `http://localhost:3000/docs` to see the endpoints and try them out from the same interface.

## Happy scenario

1 - Create the mentor(s) using [POST] /mentors

2 - Book one or more slots using the endpoint [POST] /mentors/{id}/calendar

3 - Use the same endpoint to book a reserved slot (this will let you know that the slot is not available)

4 - Check the mentor's calendar for a specific date if you need to: [GET] /mentors/{id}/calendar (since we are looking for the whole day, you can use this date format: YYYY-MM-DD)


## Potential improvements and additions

- Config file support to export our different ENV variables: database string, port ...
- More validations
- API docs improvements: Default values, field formats ...
- Better error handling using exception filters
- Unit tests and E2E tests (Personally I prefer to use In-Memory MongoDB instead of mocks to have closer behavior to the real database)