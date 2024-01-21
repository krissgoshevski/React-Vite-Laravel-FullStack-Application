# ===================================================
# PHP

FROM php:8.1 as php

# Install dependencies
RUN apt-get update -y && apt-get install -y \
    unzip \
    libpq-dev \
    libcurl4-gnutls-dev

# Install required PHP extensions
RUN docker-php-ext-install pdo pdo_mysql bcmath

# Install and enable Redis extension
RUN pecl install -o -f redis \
    && rm -rf /tmp/pear \
    && docker-php-ext-enable redis

# Install Composer
COPY --from=composer:2.3.5 /usr/bin/composer /usr/bin/composer


# Set working directory
WORKDIR /var/www

# Copy application files
COPY . .

# Set environment variables
ENV PORT=8000

# Run the entrypoint script
CMD ["Docker/entrypoint.sh"]


# =====================================================
# Node

FROM node:14-alpine as node

WORKDIR /var/www
COPY . .

# Combine npm commands and specify versions
RUN npm install --global \
    npm@7.21.1

RUN npm install

# volume for node_modules (if needed)
VOLUME /var/www/node_modules




