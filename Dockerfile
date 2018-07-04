## docker build -t apiserver .
## docker run -p 3000:3000 -v /Users/Gama-Mike/WebstormProjects/lab/APIServer/dist:/var/app -v /Users/Gama-Mike/WebstormProjects/lab/APIServer/config:/var/app/config -v /var/app/node_modules apiserver

FROM node:8.0.0

RUN mv /etc/localtime /etc/localtime.bak
RUN ln -s /usr/share/zoneinfo/Asia/Taipei /etc/localtime

RUN npm install pm2 -g
RUN mkdir -p /var/app

WORKDIR /var/app

COPY ./package.json /var/app

RUN npm set registry http://192.168.122.130:4873/
RUN npm install
## DEVELOPMENT MODE
EXPOSE 3000
CMD ["pm2", "start", "app.js", "--name", "apiserver", "--no-daemon"]