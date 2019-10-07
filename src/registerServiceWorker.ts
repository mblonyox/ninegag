/* tslint:disable:no-console */

import { register } from 'register-service-worker';
import { onServiceWorkerUpdate } from './main';

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB',
      );
    },
    registered() {
      console.log('Service worker has been registered.');
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updatefound(registration) {
      console.log('New content is downloading.');
      if (navigator.serviceWorker.controller) {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          switch (installingWorker.state) {
            case 'installed':
              onServiceWorkerUpdate();
              break;
            case 'redundant':
              throw new Error(
                'The installing service worker became redundant.',
              );
            default:
              break;
          }
        };
      }
    },
    updated() {
      console.log('New content is available; please refresh.');
    },
    offline() {
      console.log(
        'No internet connection found. App is running in offline mode.',
      );
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}
