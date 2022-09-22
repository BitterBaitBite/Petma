# Petma
Petma is a social network for animal lovers. This first version is incomplete for a real social network, and so it will be further developed afterwards.

The repo consist of two main directories, the server and the client. The first one is an express server (a simple backend) which can be called as a REST API, fetching data from a Postgres Database. On the other hand we have the client ((the frontend), which is designed and developed in Next.js for mobile devices. The idea is making it responsive in the future for more devices.

## Server

To run the server, the first thing you'll need is to install it's dependencies with `npm install`. Then you should create a `.env` file to store some environment variables for the project to run. These are the environment variables you will need:

| VARIABLE                                 | EXAMPLE                   |   
|------------------------------------------|---------------------------|
| PORT                                     | 8000                      |
| ORIGIN                                   | http://localhost:3000     |
| SESS_SECRET                              | secret-string             |
| TOKEN_SECRET                             | secret-string             |
| PGDATABASE                               | railway                   |
| PGHOST                                   | database-host.railway.app |
| PGPASSWORD                               | database-password         |
| PGPORT                                   | database-port             |
| PGUSER                                   | database-usesr            |

After all of them are set, you can run `npm run dev` to start the server on your local.

---

The server is working as a REST API, and so it has several endpoints to get some json data from the backend. These are the ones you have to care about!

| API Endpoints          | METHOD | Description                                                     |
|------------------------|--------|-----------------------------------------------------------------|
| /api/users             | GET    | Fetches all users                                               |
| /api/users/:id         | GET    | Fetches the user with the specified id                          |
| /api/users/:id/pets    | GET    | Fetches the pets of the user with the specified id              |
| /api/users/:id/friends | GET    | Fetches the friends of the user with the specified id           |
| /api/users             | POST   | Creates a new user in the database with the body of the request |
| /api/users/:id         | PUT    | Updates a specified by id user with the body of the request     |
| /api/users/:id         | DELETE | Deletes an user specified by it's id                            |

## Client

In order to run the client you have to install it's dependencies with `npm install` and then create a `.env.local` file with a single environment variable for the URI or domain of the REST API (you may also hardcode it...). This environment variable is `NEXT_PUBLIC_REST_API_URI`.

To see the frontend client on your local, simply run `npm run dev`!
