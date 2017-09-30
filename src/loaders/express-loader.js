'use strict'

// Possible side effects
const helmet = require('helmet')
const morgan = require('morgan')
const R = require('ramda')
const Bacon = require('baconjs')

const startServer = (express, config) => {
  return new Promise((resolve, reject) => {
    if (R.isNil(express)) reject(new Error('express cannot be undefined'))

    const app = express()

    // Load express middleware
    app.use(helmet())
    app.use(morgan(config.morgan))

    // Start server
    app.listen(config.port, resolve)
  })
}

module.exports = ({ express }) => {
  return (config) => {
    return Bacon.fromPromise(startServer(express, config))
  }
}
