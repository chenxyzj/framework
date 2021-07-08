'use strict'

import _ from 'lodash'
import { ConfigStore } from '@supercharge/contracts'

export class Config implements ConfigStore {
  /**
   * The in-memory config store keeping all the config items.
   */
  private config: object = {}

  /**
   * Create a new config store instance.
   */
  constructor (config?: object) {
    this.config = config ?? {}
  }

  /**
   * Returns the config store as an object.
   */
  all (): object {
    return this.config
  }

  /**
   * Returns the requested config value for the given `key`. You may pass in
   * a default value as the second argument. The default value will be
   * returned if the config value for `key` is not existent.
   *
   * @param {String} key
   * @param {String} defaultValue
   *
   * @returns {*}
   */
  get (key: string, defaultValue?: any): any {
    return _.get(this.config, key, defaultValue)
  }

  /**
   * Set a value in the config store.
   *
   * @param {String} key
   * @param {String} value
   */
  set (key: string, value: any): Config {
    _.set(this.config, key, value)

    return this
  }

  /**
   * Determine whether the config store contains an item for the given `key`.
   *
   * @param {String} key
   *
   * @returns {Boolean}
   */
  has (key: string): boolean {
    return _.has(this.all(), key)
  }

  /**
   * Ensure the given config `key` in the application’s configuration.
   *
   * @param {String} key
   * @param {Function} callback
   *
   * @example
   * ```
   * config.ensure('view')
   * config.ensure('app.port')
   * ```
   */
  ensure (key: string, callback?: () => void): void {
    if (this.has(key)) {
      return
    }

    if (typeof callback === 'function') {
      callback()
    }

    throw new Error(`Missing configuration for "${key}".`)
  }

  /**
   * Clear all values from the config store.
   */
  clear (): void {
    this.config = {}
  }
}
