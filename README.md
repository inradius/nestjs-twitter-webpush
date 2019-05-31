# Nestjs-twitter-webpush

This is a server-side application for PWA push notification subscription using Twitters push api.


## Initial Setup

Copy the `example.env` file to `.env`. This is where you will set your personal credentials.

If you have defined a `NODE_ENV` in your local environment, you may also name this file accordingly; e.g. `production.env`.


## Getting VAPID Credentials

Navigate to [https://web-push-codelab.glitch.me](https://web-push-codelab.glitch.me/) to get receive your public and private keys. Set these in your `.env` file.


## Getting Twitter Credentials

Navigate to [https://apps.twitter.com/app/new](https://apps.twitter.com/app/new) to set up a new application. You will need consumer key/secret as well as access token/secret. Set these in your `.env` file.


## Installation

```bash
$ npm ci
```

## Running the server app

```bash
$ npm run start:prod
```

## What next?

I've included an [endpoint](http://localhost:3000/preload) so that your frontend can fetch the VAPID public key necessary to subscribe.

Try subscribing to the POST endpoint using your frontend application to receive notifications from Twitter about NASA. Check out [@angular/pwa](https://angular.io/guide/service-worker-getting-started) and [@angular/service-worker](https://angular.io/api/service-worker)

This is just a demo application I threw together based on a workshop by [Maxim Salnikov](https://github.com/webmaxru) at Ng-Conf 2019
