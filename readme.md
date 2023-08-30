 ## Ghi chu
 
 1. Setup: express (npm i express)  // framework cua node js de build server
 2. Setup type express: (npm i --save-dev @types/express) // type cua express cho typescript
 3. Setup ts-node: (npm i -D ts-node or npm i ts-node --save-dev) // thu vien giup chay truc tiep file ts ko can build js

 ## ORM 
  - Type ORMS
  - npm i typeorm mysql reflect-metadata --save
  
  ## 2 Prisma

- npm i prisma
- npm i @prisma/client
- Setup path schema.prisma in package.json =>  

"prisma": {
    "schema": "./src/prisma/schema.prisma"
}

- Setup create database, client:

"db": "prisma db push",
"client": "prisma generate"