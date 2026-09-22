FROM node:24-alpine AS frontend-build

WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client/ ./
RUN npm run build


FROM node:24-alpine

WORKDIR /app

COPY server/package*.json ./server/
RUN cd server && npm install --omit=dev

COPY server/ ./server/

COPY --from=frontend-build /app/client/build ./client/build

EXPOSE 5000

CMD ["node", "server/index.js"]