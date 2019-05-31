# NestjsWebpush

This is the server-side application for PWA push notification subscription.

This application depends on the Angular [client-side app](https://stash.hilti.com/users/strotra/repos/angular-webpush/browse) to function.


## Initial Setup

Copy the `example.env` file to `.env`. This is where you will set your personal credentials.

If you have defined a `NODE_ENV` in your local environment, you may also name this file accordingly; e.g. `production.env`.


## Getting VAPID Credentials

Navigate to [https://web-push-codelab.glitch.me](https://web-push-codelab.glitch.me/) to get receive your public and private keys. Set these in your `.env` file.


## Getting Twitter Credentials

Navigate to [https://apps.twitter.com/app/new](https://apps.twitter.com/app/new) to set up a new application. You will need consumer key/secret as well as access token/secret. Set these in your `.env` file.


## Installation

```bash
$ npm i
```

## Running the PWA

```bash
$ npm run start:prod
```
