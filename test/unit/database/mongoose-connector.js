'use strict'

const Config = require('@root/config')
const BaseTest = require('@root/testing/base-test')
const MongooseConnector = require('@root/database/mongoose-connector')

class MongooseConnectorTest extends BaseTest {
  async connectorLifecycle (t) {
    const connector = new MongooseConnector(Config.get('database.connections.mongoose'))

    await connector.connect()
    t.true(await connector.isConnected())

    await connector.close()
    t.false(await connector.isConnected())
  }

  async mongooseFailsToConnectWithBadConnectionString (t) {
    const connector = new MongooseConnector({
      host: 'wrong',
      port: 27017,
      database: 'not-existent',
      options: {
        useNewUrlParser: true
      }
    })

    await connector.connect()

    t.false(await connector.isConnected())
  }

  async throwsWithoutConfig (t) {
    t.throws(() => new MongooseConnector())
  }
}

module.exports = new MongooseConnectorTest()