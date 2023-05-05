# syntax=docker.io/docker/dockerfile:latest

FROM docker.io/nginx:latest

# Enable APT package caching
RUN rm -f /etc/apt/apt.conf.d/docker-clean && \
    echo 'Binary::apt::APT::Keep-Downloaded-Packages "true";' > /etc/apt/apt.conf.d/keep-cache

# Install packages we might need during development
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update && \
    apt-get install -y --no-install-recommends \
        npm \
        python3 \
        python3-pip \
        python3-virtualenv

# Work in the webroot
WORKDIR /usr/share/nginx/html

# Install npm dependencies
RUN --mount=type=cache,target=/root/.npm,sharing=locked \
    --mount=type=bind,source=package.json,target=package.json,rw \
    --mount=type=bind,source=package-lock.json,target=package-lock.json,rw \
    npm install
