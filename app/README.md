# Development

## Docker network setup
1. Run:
```
docker network create --driver bridge dev_network
```

## Server
1. In your dev environment go to [Dockerfile](/app/backend/Dockerfile) parent directory
2. When you finished development, run commands:
```
docker build -t sample-node-backend .
```
3. Run container:
```
docker run -p 5500:5500 -d --env-file ./.env --network dev_network --name server sample-node-backend
```

## Client
1. In your dev environment go to [Dockerfile](/app/frontend/Dockerfile) parent directory
2. Specify REACT_APP_PROXY_HOST=*SERVER CONTAINER NAME* in ./.env file.
3. When you finished development,  run commands:
```
docker build -t sample-react-frontend .
```
4. Run container:
```
docker run -p 3000:3000 -d --env-file ./.env --network dev_network --name frontend sample-react-frontend
```

# Deployment

## Server
1. In your dev environment go to [app](/app) parent directory
2. Run commands:
```
docker compose -f docker-compose.green.yml up -d
```
```
docker compose -f docker-compose.blue.yml up -d
```
3. Launch load balancer:
```
docker compose -f docker-compose.nginx.yml up -d
```