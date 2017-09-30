'use static'

const Bacon = require('baconjs')

module.exports = ({ mongoose }) => {
  return (config) => {
    // Set mongoose promises to be node global
    mongoose.Promise = global.Promise
    // Return mongoose connect promise
    return Bacon.fromPromise(mongoose.connect(
      config.url,
      config.options
    ))
  }
}
