# Deployment

## Server
1. In your dev environment go to [Dockerfile](/app/backend/Dockerfile) parent directory
2. When you finished development, run commands:
```
docker build -t tpionka/sample-node-backend .
```
```
docker push tpionka/sample-node-backend
```
3. Login to your VPS, get to directory with .env file containing secrets and run commands:
```
docker pull tpionka/sample-node-backend
```
```
docker run -p 0.0.0.0:5500:5500 -d --env-file ./.env tpionka/sample-node-backend
```

## Client
1. In your dev environment go to [Dockerfile](/app/frontend/Dockerfile) parent directory
2. When you finished development, run commands:
```
docker build -t tpionka/sample-node-frontend .
```
```
docker push tpionka/sample-node-frontend
```
3. Login to your VPS and run commands:
```
docker pull tpionka/sample-node-frontend
```
```
docker run -p 0.0.0.0:3000:3000 -d tpionka/sample-node-frontend
```