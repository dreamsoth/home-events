'use strict'

const Bacon = require('baconjs').Bacon

module.exports = () => {
  const AppBus = new Bacon.Bus()
  AppBus.onState = (state) => AppBus.filter(appEvent => appEvent.state === state)
  return AppBus
}
