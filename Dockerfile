# set up node
# set node version
FROM node:20.11.1-alpine AS build
# set app to run on port 80
EXPOSE 80
# set working directory
WORKDIR /app
# copy files to working directory
COPY . .
# install dependencies
RUN npm install
# build app
RUN npm run build
# set up nginx
FROM nginx:alpine
# copy build files to nginx
COPY --from=build /app/dist/finance-tracker-application/browser /usr/share/nginx/html