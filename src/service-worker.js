//  Manually call the precache methods of workbox
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.core.setCacheNameDetails({prefix: "ninegag"});
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener('message', (event) => {
  if (event.data === 'skipwaiting') self.skipWaiting();
});
