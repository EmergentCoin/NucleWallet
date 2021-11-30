FROM node:lts-alpine3.13
WORKDIR /home/app
COPY / .
RUN  npm install --production > /dev/null 2>&1

EXPOSE 7001

CMD npm run start