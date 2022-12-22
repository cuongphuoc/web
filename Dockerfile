FROM node:18-alpine
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
CMD ["node", "src/index.js"]
EXPOSE 3000