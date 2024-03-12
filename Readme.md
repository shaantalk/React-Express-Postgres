To run

```
docker-compose build --no-cache
docker-compose up
```

To create certificate

```
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx/certs/nginx.key -out nginx/certs/nginx.crt
openssl dhparam -out nginx/certs/dhparam.pem 4096
```

```mermaid
sequenceDiagram
    participant User as User (Browser)
    participant Frontend as Frontend Application
    participant Backend as Backend Server
    participant DB as PostgreSQL Database

    User->>Frontend: Interact with UI
    Frontend->>Backend: HTTP Request
    Backend->>DB: Query/Update
    DB-->>Backend: Results
    Backend->>Frontend: HTTP Response
    Frontend->>User: Update UI
```
