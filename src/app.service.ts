import * as Twitter from 'twitter';
import * as webPush from 'web-push';

import { HttpStatus, Injectable } from '@nestjs/common';

import { Request, Response } from 'express';

import { ConfigService } from './config.service';

@Injectable()
export class AppService {

  private subscriptions: webPush.PushSubscription[] = [];
  private twitterClient: Twitter;

  constructor(private config: ConfigService) {
    this.setupTwitter();
    this.setupWebPush();
    this.streamNotifications();
  }

  getIndex(): string {
    return 'Welcome to Ask Hilti Nest.js';
  }

  /**
   * Expose our web-push public key, so the frontend can use it.
   * @param response
   */
  getPreload(response: Response): any {
    return response.status(HttpStatus.OK).json({VAPID_PUBLIC_KEY: this.config.get('VAPID_PUBLIC_KEY')});
  }

  postSubscribe(request: Request): void {
    if (request.body && request.body.subscription) {
      if (request.body.action === 'subscribe') {
        if (this.arrayObjectIndexOf(this.subscriptions, request.body.subscription.endpoint, 'endpoint') == -1) {
          this.subscriptions.push(request.body.subscription);
        }
      } else if (request.body.action === 'unsubscribe') {
        const subscriptionIndex = this.arrayObjectIndexOf(this.subscriptions, request.body.subscription.endpoint, 'endpoint');
        if (subscriptionIndex >= 0) {
          this.subscriptions.splice(subscriptionIndex, 1);
        }
      }
    }
  }

  sendNotification(subscriptions: webPush.PushSubscription, data: any): any {
    webPush.sendNotification(subscriptions, data)
    .then(() => {})
    .catch(error => {
      console.error(error);
    });
  }

  setupTwitter(): void {
    this.twitterClient = new Twitter({
      consumer_key: this.config.get('TWITTER_CONSUMER_KEY'),
      consumer_secret: this.config.get('TWITTER_CONSUMER_SECRET'),
      access_token_key: this.config.get('TWITTER_ACCESS_TOKEN_KEY'),
      access_token_secret: this.config.get('TWITTER_ACCESS_TOKEN_SECRET'),
    });
  }

  setupWebPush(): void {
    webPush.setVapidDetails(
      'mailto:my_email@my_domain.com',
      this.config.get('VAPID_PUBLIC_KEY'),
      this.config.get('VAPID_PRIVATE_KEY'),
    )
  }

  streamNotifications(): void {
    this.twitterClient.stream('statuses/filter', {
      language: 'en',
      track: 'nasa',
    },  stream => {
      stream.on('data', tweet => {
        if (tweet && tweet.user) {
          this.subscriptions.forEach(subscription => {
            this.sendNotification(subscription, JSON.stringify({
              notification: {
                title: tweet.user.name,
                actions: [{
                  action: 'opentweet',
                  title: 'Open tweet'
                }],
                body: tweet.text,
                dir: 'auto',
                icon: tweet.user.profile_image_url_https,
                badge: tweet.user.profile_image_url_https,
                lang: tweet.lang,
                renotify: true,
                requireInteraction: true,
                tag: tweet.id,
                vibrate: [300, 100, 400],
                data: {
                  url: `https://twitter.com/statuses/${tweet.id_str}`,
                  created_at: tweet.created_at,
                  favorite_count: tweet.favorite_count,
                  retweet_count: tweet.retweet_count
                }
              }
            }))
          });
        }
      })
    })
  }

  arrayObjectIndexOf(arr, searchTerm, property): number {
    for (var i = 0, len = arr.length; i < len; i++) {
      if (arr[i][property] === searchTerm) return i
    }
    return -1
  }
}
