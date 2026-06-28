<!-- @format -->

# Checkpoint_rest_api

## Proejct setup steps

1. setup project by running `npm init -y`
2. install dependencies by running `npm install express mongoose dotenv nodemon`
3. create folder structure. run

- `mkdir config models` -- creates two new folder
- `touch config/.env models/User.js server.js` - create the file

```bash
    mongo-express-api/
    ├── config/
    │   └── .env
    ├── models/
    │   └── User.js
    ├── server.js
    └── package.json
```

4. Define Schema
5. Build server and routes, controller no needed
6. Test with post man

## Test

- Create User POST http://localhost:3000/users
  {"name": "John Doe", "email": "john@example.com", "age": 30}
- Get All Users GET http://localhost:3000/users
- Update User PUT http://localhost:3000/users/<USER_ID>
- Delete User DELETE http://localhost:3000/users/<USER_ID>
