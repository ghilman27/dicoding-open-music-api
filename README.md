# Submission Dicoding Belajar Fundamental Aplikasi Backend

## How to run

### Clone this repository

```bash
git clone <thisrepourl>.git
cd <repofolder>
```

### Install all dependencies
```bash
npm install
```

### Setup environment variables

```bash
cp .env.example .env
```
Open `.env` files and configure the app with your local environment variables


**Description of each variables**
| Variables | Description |
| :---: | :-: |
| HOST | Server host (default `localhost`) |
| PORT | Server port (default `5000`) |
| PGHOST | Postgres host |
| PGPORT | Postgres port |
| PGDATABASE | Postgres database |
| PGUSER | Postgres username |
| PGPASSWORD | Postgres password |
| ACCESS_TOKEN_KEY | JWT access token key |
| REFRESH_TOKEN_KEY | JWT refresh token key |
| ACCESS_TOKEN_AGE | JWT token expiration in seconds |
| RABBITMQ_PROTOCOL | Rabbit MQ protocol (default `amqp`) |
| RABBITMQ_SERVER | Rabbit MQ Server address |
| RABBITMQ_PORT | Rabbit MQ Server port |
| AWS_ACCESS_KEY_ID | AWS SDK access key ID |
| AWS_SECRET_ACCESS_KEY | AWS SDK secret access Key |
| AWS_BUCKET_NAME | AWS S3 bucket name |
| REDIS_SERVER | Redis Server Host |
| REDIS_PORT | Redis Server Port |
| PGADMIN_DEFAULT_EMAIL | PG Admin username / email |
| PGADMIN_DEFAULT_PASSWORD | PG Admin password |

### Setup the required infrastructure
If you have docker installed on your machine, just type this command:
```bash
docker-compose up -d
```
It will setup and run several infrastructures required for this app to run in your local machine (`localhost`), including:
- PostgreSQL Database and [PG Admin Web UI](http://localhost:8082)
- RabbitMQ Server and [Management Web UI](http://localhost:15672)
- Redis Server and [Redis Commander Web UI](http://localhost:8081)

You would also need to setup your own AWS S3 Bucket Instance before running this app.

### Initialize database table
Setup table in the database required for this app to run.
```bash
npm run migrate up
```

### Start the server in development mode
```
npm run start-dev
```

### Clean Up
For clean up, delete all the tables by typing this command:
```bash
# revert database changes to the last 6 migrations
npm run migrate down 6
```

Then you can terminate all infrastructures by typing:
```bash
docker-compose down
```
