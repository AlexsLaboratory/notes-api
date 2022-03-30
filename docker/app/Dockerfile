FROM node:17.8.0-alpine3.15
ENV NODE_ENV development
WORKDIR /app
COPY package*.json .
RUN npm install --production
COPY . .
CMD ["npm", "run", "start"]