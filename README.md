
# Fanatiz backend developer Test
![](https://img.shields.io/badge/nodejs-v16.13.1-green) ![](https://img.shields.io/badge/python-v3.10.1-yellow) ![](https://img.shields.io/badge/react-v17.0.2-blue)


This repo contains the whole code used to solve the backend developer test by Fanatiz.

## Installation

The repo is divided in 3 folders:

```bash
  > /backend/
  > /frontend/
  > /profiler/
```
### Load data
In backend folder there is a Python script which load the data from the XML file given by test document. It fetch the data and make all the data process to save it into a Mongo DataBase.
```bash
  ./backend/loadData.py
```
It is mandatory configurate the 
```bash
  .env
```
file, these are the environment variables:

`PORT = //Port where server will run`

`JWTSECRET = //Secret for Json Web Token`

`DB_NAME = //DataBase's name`

`DB_PASSWORD = //DataBase's password`

`XML_DATA = https://fx-nunchee-assets.s3.amazonaws.com/data/sports.xml `

`MONGO_CONNECTION = //The url connection provided by Mongo eg: mongodb://db_user_fanatiz:<password>@cluster0-shard-00-00.fhyod.mongodb.net:27017,cluster0-shard-00-01.fhyod.mongodb.net:27017,cluster0-shard-00-02.fhyod.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-rehxkc-shard-0&authSource=admin&retryWrites=true&w=majority`

Next step is install some libraries what were use in the script:

**Note**: It is advisable but not mandatory work in a python virtual environment just for that script
```bash
  cd backend/
  pip install xmltodict
  pip install pymongo
  pip install python-dotenv
```
When all libraries have been installed you are able to run the script:

```bash
  python loadData.py
```
Check the console log, if something goes wrong you will be advised.

### Run node server 

To start the Node server you have to install the dependencies for the project, run the npm installation inside the folder backend:
```bash
  cd backend/
  npm install
```
Once it finished just run the following command to run the server in a development environment:

```bash
  nodemon server
```

### API Reference

**Create user**

```http
  POST /api/users/create
```
Body:

```Json
{
    "user": "string",
    "password": "string"
}
```
----
**Login**
```http
  POST /api/users/login
```

Body: 
```Json
{
    "user": "string",
    "password": "string"
}
```
**Note:** You will get the token for further requests.

----
**Get teams**
```http
  GET /api/teams
```

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
|   `token` | `string` | **Required**. The token saved from login request |

----
**Get player by id team**
```http
  GET /api/teams/:idTeam/players
```

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
|   `token` | `string` | **Required**. The token saved from login request |

----
**Get player by position**
```http
  GET /api/teams/players/:position
```

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
|   `token` | `string` | **Required**. The token saved from login request |


### Run NextJs frontend

Even when the test says *Backend*, a front page has been made due the position is for a fullstack developer.

In the folder */frontend/* there is a NextJS project which use all apis from the Node server, to start it you must to install the npm dependencies:

```bash
  cd frontend/
  npm install
```
Once it finished just run the following command to run the page in a development environment:

**Note:** Make sure the port for the server and front don't be same, by default both starts in 3000 port, change the port in the .env file in backend folder.
```bash
  npm run dev
```
### Profiler

In the folder */profiler* there is a script and a README file with its own description solving the test's solution analysis point.

## Authors

- [@jonatanjosm](https://www.linkedin.com/in/jonatanjosm/)

