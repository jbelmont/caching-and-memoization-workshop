'use strict';

const client = require('../../redis');
const test = require('ava');

test.cb('test set redis command', t => {
  t.plan(1);

  client.set('name', 'John Rambo');
  client.get('name', (err, name) => {
    t.is(name, 'John Rambo');
    t.end();
  });
});
