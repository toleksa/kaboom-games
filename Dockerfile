FROM nginx:alpine
RUN sed -i '/location \/ {/a \\tautoindex on;' /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/index.html /usr/share/nginx/html/50x.html
WORKDIR /usr/share/nginx/html/games
COPY . .

