'use strict'

const Path = require('path')
const Config = require('../../../config')
const Helper = require('../../../helper')
const BaseTest = require('../../../base-test')
const HttpKernel = require('../../../http/kernel')
const Application = require('../../../foundation/application')
const AuthBootstrapper = require('../../../auth/bootstrapper')

class AuthBootstrapperTest extends BaseTest {
  async serialLoadSchemesAndStrategies (t) {
    Helper.setAppRoot(Path.resolve(__dirname, 'fixtures'))

    const kernel = new HttpKernel(new Application())
    await kernel._createServer()
    const server = kernel.getServer()

    const bootstrapper = new AuthBootstrapper(server)
    await bootstrapper.boot()

    t.true(Object.keys(server.auth._schemes).includes('test-scheme', 'class-test-scheme'))
    t.true(Object.keys(server.auth._strategies).includes('test-auth', 'class-test-auth'))

    server.route({
      method: 'GET',
      path: '/',
      options: {
        auth: {
          strategy: 'class-test-auth'
        },
        handler: (request) => {
          return request.auth.credentials || {}
        }
      }
    })

    const request = {
      method: 'GET',
      url: '/'
    }

    const response = await server.inject(request)
    t.deepEqual(response.statusCode, 200)
    t.deepEqual(response.result, { name: 'Marcus' })
  }

  async serialNoAuthStrategiesAvailable (t) {
    Config.set('auth.default', 'test-auth')
    Helper.setAppRoot(Path.resolve(__dirname, 'not-existent-folder'))

    const kernel = new HttpKernel(new Application())
    await kernel._createServer()
    const server = kernel.getServer()

    const bootstrapper = new AuthBootstrapper(server)
    await bootstrapper.boot()

    t.deepEqual(Object.keys(server.auth._schemes), ['session'])
    t.deepEqual(Object.keys(server.auth._strategies), [])
  }

  async serialSetDefaultStrategy (t) {
    Config.set('auth.default', 'test-auth')
    Helper.setAppRoot(Path.resolve(__dirname, 'fixtures'))

    const kernel = new HttpKernel(new Application())
    await kernel._createServer()
    const server = kernel.getServer()

    const bootstrapper = new AuthBootstrapper(server)
    await bootstrapper.boot()

    t.deepEqual(server.auth.settings.default.strategies, ['test-auth'])
  }
}

module.exports = new AuthBootstrapperTest()