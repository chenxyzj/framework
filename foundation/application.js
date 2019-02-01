'use strict'

const Env = require('./../env')
const Config = require('./../config')
const Helper = require('./../helper')
const Server = require('./http/server')
const Dispatcher = require('../event/dispatcher')
const ExceptionHandler = require('./exceptions/handle-system-exceptions')

class Application {
  constructor () {
    this.server = null
    this.appRoot = null
    this.exceptionHandler = new ExceptionHandler()
  }

  withAppRoot (appRoot) {
    this.appRoot = appRoot

    return this
  }

  /**
   * Returns the HTTP server instance.
   */
  getServer () {
    return this.server
  }

  /**
   * Initialize the hapi server to run
   * your application.
   */
  async launchWithFullSpeed () {
    try {
      this.exceptionHandler.listenForSystemErrors()

      if (!this.appRoot) {
        throw new Error('Cannot start HTTP server without app root directory. Ensure to call .appRoot() inside the server.js file.')
      }

      Helper.setAppRoot(this.appRoot)
      this.loadEnvironmentVariables()
      this.loadApplicationConfig()

      await this.initializeEvents()

      await this.bootstrapHttpServer()
      await this.startServer()
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  loadEnvironmentVariables () {
    Env.loadEnvironmentVariables()
  }

  loadApplicationConfig () {
    Config.loadConfigFiles()
  }

  /**
   * Start the hapi server.
   */
  async startServer () {
    try {
      await this.server.start()
    } catch (err) {
      this.server = null
      console.error(err)
      process.exit(1)
    }
  }

  /**
   * Initialize the hapi server instance and
   * register core plugins, middleware, app
   * plugins and configure views.
   */
  async bootstrapHttpServer () {
    this.server = await new Server().bootstrap()
  }

  /**
   * Register all application events and
   * assign listeners.
   */
  async initializeEvents () {
    await Dispatcher.init()
  }
}

module.exports = Application
