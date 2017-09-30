'use strict'

const mongoose = require('mongoose')
const DbConfig = require('./config/db')

const AppEnum = require('./enum/app.js')
const createApplicationBus = require('./bus/app.js')
const createDbStream = require('./loaders/mongo-loader.js')({ mongoose })
//const createServerStream = require()

module.exports = () => {
  const applicationbus = createApplicationBus()
  const dbStream = createDbStream(DbConfig)
  applicationbus.plug(dbStream.map({ state: AppEnum.DB_BOOT_SUCCESS }))

  applicationbus.onState(AppEnum.DB_BOOT_SUCCESS).onValue(() => {
    console.log('Works')
  })

  applicationbus.onError((error) => {
    console.error('Aplication startup error. Due to errors:')
    console.error(error)
  })
  //const serverStream = createServerStream()
}