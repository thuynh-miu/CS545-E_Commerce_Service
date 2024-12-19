# CS545-E_Commerce_Service

## Client
Link: https://cs-545-e-commerce-service.vercel.app/

### How to run the client
To run the client, please execute the following from the root directory:

```cd ./client
npm install
npm start
```

## Server

Swagger API Deploy on Azure Link:
https://online-market-chffh4dscnawd6a6.eastus2-01.azurewebsites.net/swagger-ui/index.html

### How to run the server
To run the server:

Config Local:
- docker-compose up -d
- Create a new database in PostgreSQL name  `online-market`
- then Run:

```
cd ./server
./mvnw spring-boot:run
```

### App Service Deploy on Azure
`CI/CD` auto deploy to Azure after commmiting, Config App Settings in Azure:
- Go to Azure Portal
- Go to App Service
- Environment variables
- Under App Settings

`spring.datasource.username={DB_USERNAME}` // Ex: postgres

`spring.datasource.password={DB_PASSWORD}` // Ex: 1

`spring.datasource.url={DB_URL}` // Ex: jdbc:postgresql://online-market-server.postgres.database.azure.com:5432/online-market

## Team Members
- [x] 1. Ngoc Cuong Nguyen
- [x] 2. Tuan Anh Huynh
