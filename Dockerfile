FROM node:latest

RUN mkdir /code/
WORKDIR /code
ADD . /code/

ENV NODE_ENV=production

RUN npm install --save-dev && npm run build

FROM nginx:latest
COPY --from=0 /code/build/ /usr/share/nginx/html/
