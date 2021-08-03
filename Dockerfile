FROM nginx:alpine
EXPOSE 80
WORKDIR /usr/share/nginx/html/games
COPY . .
RUN mv default.conf /etc/nginx/conf.d/default.conf

