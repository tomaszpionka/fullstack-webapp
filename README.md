# Demo full-stack app

## Structure

Application consists of:
1. [server](/app/backend)
<br> 
Node.js API routing, requests handling with JWT auth, logic and database Object-Relational Mapping.
<br>
2. [client](/app/frontend)
<br>
ReactJS user interface to communicate with server.
<br>
3. [database setup](/database/)
<br>
Python (alembic) app for local use, which purpose is to provide models to the database of our application and handle versioning.
<br>

## Deploying changes

1. [database](/database/README.md)
2. [web app](/app/README.md)