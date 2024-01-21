# tuka moze da se run sekoja komanda, ne zavisi od instaliranite
#!/bin/bash

if [ ! -f 'vendor/autoload.php' ] || [ ! "$(ls -A vendor)" ]; then
    composer install --no-progress --no-interaction
fi



# if do not exist .env, create .env file
if [ ! -f ".env" ]; then
    echo "Creating env file for env $APP_ENV"
    cp -p .env.example .env
else
    echo ".env file already exists"
fi


#  CONTAINTER_ROLE SE SOSTOI VO docker-compose.yml
role="${CONTAINER_ROLE:-app}"

if [ "$role" = "app" ]; then
    php artisan migrate
    php artisan key:generate
    php artisan cache:clear
    php artisan route:clear
    php artisan config:clear
    # portata ja imam deklarirano vo Dockerfile
    php artisan serve --port=$PORT --host=0.0.0.0 --env=.env
    exec ./entrypoint.sh "$@"
elif [ "$role" = "queue" ]; then
    echo "Running the queue..."
    php /var/www/artisan queue:work --verbose --tries=3 --time --timeout=18
elif [ "$role" = "websocket" ]; then
    echo "Running the websocket..."
    php artisan websockets:serve
fi

















