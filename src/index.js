import { fromJS, Map } from 'immutable';
import flyd from 'flyd';
import fetch from 'node-fetch';
import mdnsJs from 'mdns-js';

/**
 * Searches for mDNS sK advertisers, establishes a connection to each,
 * and streams back individual status & data.
 *
 * @returns {flyd.stream}
 */
const search = () => {
  const stream = flyd.stream();
  const browser = mdnsJs.createBrowser(
    mdnsJs.tcp('signalk-http')
  );
  browser.on('update', service => {
    const url = `http://${service.host}:${service.port}/signalk`;
    return fetch(
      url
    ).then(
      res => res.json()
    ).then(
      server => [ true, url, service, server ],
      error => [ false, url, service, error ]
    ).then(
      stream
    );
  });
  browser.on('ready', browser.discover);
  flyd.on(browser.stop, stream.end);
  return stream;
};

/**
 * Searches for mDNS sK advertisers, and streams back a map of them.
 *
 * @returns {flyd.stream<immutable.Map>}
 */
const discover = () => flyd.scan(
  (acc, [ add, id, service, data ]) => acc.set(
    id,
    fromJS(add ? { ...data, service } : undefined)
  ),
  new Map(),
  search()
);

export {
  search
};
export default discover;
