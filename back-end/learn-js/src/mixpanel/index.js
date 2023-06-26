const Mixpanel = require('mixpanel');

const token = '515be421a26583816763d65f4b78d1a9';
// initialize mixpanel client configured to communicate over http instead of https
const mixpanel = Mixpanel.init(token, {
  protocol: 'http',
});

// track an event with optional properties
const res1 = mixpanel.track('my event', {
  distinct_id: 'some unique client id',
  as: 'many',
  properties: 'as',
  you: 'want',
});
const res2 = mixpanel.track('played_game');
console.log('🚀 ~ data', {
  mixpanel,
  res1,
  res2,
});
