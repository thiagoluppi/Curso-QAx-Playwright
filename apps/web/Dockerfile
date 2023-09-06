# Usando uma imagem base do Node.js
FROM node:18

# Definindo o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiando o package.json e package-lock.json primeiro para aproveitar o cache do Docker
COPY package*.json ./

# Instalando as dependências do projeto
RUN npm install

# Copiando o restante dos arquivos do projeto
COPY . .

# Definindo a porta que a API irá usar
EXPOSE 3000

# Comando para rodar a WEBAPP
CMD [ "npm", "run", "dev" ]
