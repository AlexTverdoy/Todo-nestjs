## How to set up the project

### Prerequisites
Run `yarn install` in `client` and `server` folders to install all dependencies


### "Client" folder

In the 'client' project directory, you can run:
### `yarn start`

Runs the client in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### "Server" folder

Before starting the server you need to replace `mongoDbConnectionlink` string in `src/app.module.ts` file\
This can be done by creating a new instance of MongoDb in the cloud [https://account.mongodb.com/account/login](https://account.mongodb.com/account/login) and assigning connection string from the database settings

Then in the 'server' project directory, you can run:
### `yarn start:dev`

Runs the server in the development mode.\
Make requests to [http://localhost:3001](http://localhost:3001) to send and receive data.

#### Available endpoints:
`POST api/auth/signup`: Registration for new users with the specified `username` and `password` \
`POST api/auth/login`: Login for existing users with the specified `username` and `password`

`GET api/todo`: Returns list of ToDo items. Receives optional `page` query param for pagination\
`POST api/todo`: Creates new ToDo item in database\
`PATH api/todo/:id`: Updates the ToDo item by the specified `id`\
`DELETE api/todo/:id`: Deletes the ToDo item by the specified `id`


