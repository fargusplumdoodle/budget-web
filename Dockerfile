FROM node:latest

RUN mkdir /code/
WORKDIR /code
ADD ./package.json .
ADD ./package-lock.json .

RUN npm install

ADD . /code/

ENV NODE_ENV=production
RUN npm run build

FROM nginx:latest
COPY --from=0 /code/build/ /usr/share/nginx/html/

ADD ./docker/nginx.conf /etc/nginx/nginx.conf
ADD ./docker/entrypoint.sh /docker-entrypoint.d/set_host.sh
