'use strict'

const mongoose = require('mongoose')
const express = require('express')
const DbConfig = require('./config/db')
const ExpressConfig = require('./config/express')

const AppEnum = require('./enum/app.js')
const createApplicationBus = require('./bus/app.js')
const createDbStream = require('./loaders/mongo-loader.js')({ mongoose })
const createServerStream = require('./loaders/express-loader.js')({ express })

module.exports = () => {
  const applicationBus = createApplicationBus()
  const dbStream = createDbStream(DbConfig)
  applicationBus.plug(dbStream.map({ state: AppEnum.DB_BOOT_SUCCESS }))

  applicationBus.onState(AppEnum.DB_BOOT_SUCCESS).onValue(() => {
    console.log('MongoDB connected')
    const serverStream = createServerStream(ExpressConfig)
    applicationBus.plug(serverStream.map({ state: AppEnum.SERVER_BOOT_SUCCESS }))
  })

  applicationBus.onState(AppEnum.SERVER_BOOT_SUCCESS).onValue(() => {
    console.log('Express server started')
    applicationBus.push({ state: AppEnum.BOOT_SUCCESS })
  })

  applicationBus.onState(AppEnum.BOOT_SUCCESS).onValue(() => {
    console.log('Application started successfully')
  })

  applicationBus.onError((error) => {
    console.error('Aplication startup error. Due to errors:')
    console.error(error)
  })
  //const serverStream = createServerStream()
}