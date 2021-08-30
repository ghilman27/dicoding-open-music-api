# Submission Dicoding Belajar Fundamental Aplikasi Backend

## How to run

### Clone this repository

```bash
git clone <thisrepourl>.git
cd <repofolder>
```

### Setup environment variables

```bash
cp .env.example .env
```
Open `.env` files and edit it with your environment variables


Description of each variables
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

### Install all dependencies
```bash
npm install
```

### Setup database
This command will setup table in the database required for server to run.
```bash
npm run migrate up
```

### Start the server in development mode
```
npm run start-dev
```
