#step 1, creating a a production build using node image
# FROM node:12-alpine as build-step
# WORKDIR /app
# COPY package.json /app
# RUN npm install
# COPY . /app
# RUN npm run build

# #step 2
# FROM nginx:1.17.1-alpine
# COPY --from=build-step app/dist/client /usr/share/nginx/html

#stage 1
FROM node:15-alpine as build-step
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm i npm@latest -g
RUN npm install
COPY . /usr/src/app
RUN npm run build
EXPOSE 4200
CMD ["npm","start"]

#stage 2
FROM nginx:1.13.12-alpine
COPY --from=build-step /usr/src/app/dist /usr/share/nginx/html
COPY ./nginx.conf etc/nginx/conf.d/default.conf