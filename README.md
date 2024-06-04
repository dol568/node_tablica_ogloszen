# Tablica ogłoszen

### backend

```
cd .\server\
```

- plik .env (przy zmianie portu na inny trzeba uzyc tego samego nr poru w .\client\src\context\axiosInstance.jsx)

```
CONNECTION_STRING="mongodb+srv://admin:admin123@cluster0.juy7b2h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
DATABASE_NAME="myDatabase"
PORT=4700
```

```
npm i
```

- wypelnie bazy danych przyklaadowymi danymi

```
node .\bin\populate_db.js
```

- bez logowania do pliku

```
npm run dev
```

- z logowaniem

```
npm run debug
```

### frontend

```
cd .\client\
```

```
npm i
```

- port 4900

```
npm run dev
```

Dane do logowania

```json
{
  "email": "sarah@gmail.com",
  "password": "123",

  "email": "colin@gmail.com",
  "password": "123",

  "email": "adam@gmail.com",
  "password": "123"
}
```
