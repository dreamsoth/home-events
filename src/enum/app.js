'use strict'

const { Enum } = require('enumify')

class App extends Enum { }
App.initEnum(['DB_BOOT_SUCCESS', 'SERVER_BOOT_SUCCESS', 'BOOT_SUCCESS']);

module.exports = App