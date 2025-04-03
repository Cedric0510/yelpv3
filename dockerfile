FROM node:node@sha256:990d0ab35ae15d8a322ee1eeaf4f7cf14e367d3d0ee2f472704b7b3df4c9e7c1

WORKDIR /src

COPY . .

RUN npm i

RUN npm run build

RUN npm run delete-src

CMD ["npm", "run", "dev"]