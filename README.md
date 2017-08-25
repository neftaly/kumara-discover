# 🍠 Kūmara-discover [![CircleCI](https://circleci.com/gh/neftaly/kumara-discover.svg?style=shield)](https://circleci.com/gh/neftaly/kumara-discover)

Kumara-discover is a streaming [Signal K](http://signalk.org) mDNS discovery library.

## API
### `discover` ()

Returns [Flyd](https://github.com/paldepind/flyd) stream of [immutable](https://facebook.github.io/immutable-js/) Maps, identifying sK advertisers by URL.

## Example
```js
import discover from 'kumara-discover';

const servers = discover();

servers.map(
  state => state.toJS() // Convert immutable to plain JS object
).map(
  state => JSON.stringify(state, null, 2)
).map(
  state => console.log('\n###', state)
);
```

This would return a bunch of messages such as the following:
```json
{
  "http://neftaly-xps.local:3000/signalk": {
    "endpoints": {
      "v1": {
        "version": "1.alpha1",
        "signalk-http": "http://neftaly-xps.local:3000/signalk/v1/api/",
        "signalk-ws": "ws://neftaly-xps.local:3000/signalk/v1/stream",
        "signalk-tcp": "tcp://neftaly-xps.local:3858"
      }
    },
    "server": {
      "id": "signalk-server-node",
      "version": "0.1.28"
    },
    "service": {
      "port": 3000,
      "addresses": [
        "192.168.0.15"
      ],
      "query": [],
      "host": "neftaly-xps.local",
      "networkInterface": "pseudo multicast",
      "txt": [
        "server=signalk-server",
        "version=0.1.28",
        "roles=master, main",
        "self=urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d",
        "vessel_name=Volare",
        "vessel_brand=Friendship",
        "vessel_type=22",
        "vessel_uuid=urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d"
      ],
      "interfaceIndex": 1,
      "fullname": "neftaly-xps._http._tcp.local",
      "type": [
        {
          "name": "http",
          "protocol": "tcp",
          "subtypes": [],
          "description": "Web Site"
        },
        {
          "name": "http",
          "protocol": "tcp",
          "subtypes": [],
          "description": "Web Site"
        }
      ]
    }
  }
}
```
