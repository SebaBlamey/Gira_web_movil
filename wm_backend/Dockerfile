# Utiliza una imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación al contenedor
COPY . .

# Expón el puerto en el que la aplicación NestJS se ejecutará
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "/app/dist/main"]
