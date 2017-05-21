FROM node:6

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install
COPY . /usr/src/app
RUN ["chmod", "+x", "/usr/src/app/entrypoint.sh"]
CMD ./entrypoint.sh

EXPOSE 9000
