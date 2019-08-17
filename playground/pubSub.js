'use strict'

const pub = require('redis').createClient()
const sub = require('redis').createClient()

sub.subscribe('some channel')

sub.on('subscribe', (c, count) => {
  pub.publish('some channel', 'my message here')
})

sub.on('message', (channel, message) => {
  console.log('message:')
  console.log(channel, message)
  sub.unsubscribe()
  sub.quit()
  pub.quit()
})
