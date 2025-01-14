# Changelog

## [2.0.0-alpha.5](https://github.com/supercharge/framework/compare/v2.0.0-alpha.4...v2.0.0-alpha.5) - 2021-07-xx

### Added
- `@supercharge/http`
    - added `HeaderBag`, `ParameterBag`, `FileBag` classes to provide helpful methods to access request input
    - add bodyparser middleware replacing the previously used `koa-body`
- `@supercharge/contracts`
    - extend the container types to resolve classes when passed to as a namespace
    - extend the HTTP `Request` contract: added `request.hasPayload()`, `request.setPayload()`, `request.rawPayload()`, `request.setRawPayload()`, `request.isContentType(...types)`, `request.contentType()`
- `@supercharge/container`
    - add handling to bind and resolve classes as the namespace in the container

### Updated
- bump dependencies
- `@supercharge/contracts`
    - use `Record<string, any>` as types for `request.params` and `request.query`
- `@supercharge/core`
    - use `HttpError` class from `@supercharge/errors` as base class
- `@supercharge/routing`
    - add comments to `RouteCollection`
    - refine comments of `Router` methods
    - internal refinements of the `RouteCollection`

### Breaking Changes
- `@supercharge/http`
    - the properties `request.query`, `request.params`, and `request.headers` return an input bag instead of an object
    ```js
    // before
    const query = request.query
    const params = request.params
    const headers = request.headers

    // after
    const query = request.query().all()
    const params = request.params().all()
    const headers = request.headers().all()
    ```


## [2.0.0-alpha.4](https://github.com/supercharge/framework/compare/v2.0.0-alpha.3...v2.0.0-alpha.4) - 2021-07-09

### Added
- add npm scripts
    - `clean` to remove all node_modules folders from managed packages
    - `fresh` to freshly bootstrap all packages

### Updated
- bump dependencies
- `@supercharge/database`
    - add `sqlite3` as a default dependency
    - move to sqlite for testing
    - removed mysql NPM devDependency

### Fixed
- `@supercharge/view`
  - fix `append` helper to properly pass through the appended content stack


## [2.0.0-alpha.3](https://github.com/supercharge/framework/compare/v2.0.0-alpha.2...v2.0.0-alpha.3) - 2021-06-28

### Added
- `@supercharge/http`
    - the `response.redirect().to(<path>)` method now returns the redirect instance (instead of `void`)
    - support a callback to customize the view config as the second or third argument in `response.view(template, data | viewBuilder)`
    - refine types of `request.headers` to use the `IncomingHttpHeaders` interface
- `@supercharge/view`
    - add handlebars helpers: `append` , `prepend`
- `@supercharge/contracts`
    - add npm script `dev` to watch and compile the contracts

### Updated
- `@supercharge/view`
  - update the `async render(template, data, config?)` method to require the second `data` parameter

### Fixed
- `@supercharge/routing`
    - handle HTTP redirect responses properly without throwing a response error


## [2.0.0-alpha.2](https://github.com/supercharge/framework/compare/v2.0.0-alpha.1...v2.0.0-alpha.2) - 2021-06-25

### Added
- `@supercharge/http`
    - created a base controller

### Updated
- refined lerna configuration to bootstrap without lock files
- `@supercharge/contracts` and `@supercharge/routing`
    - refine types for route groups allowing strings (representing the path to a route file)
- `@supercharge/contracts`
    - refine types for application booting callbacks allowing `unknown` instead of `void`
- `@supercharge/http`
    - refine typings for request properties (moving to `Record<K, V>`)

### Removed
- remove `CHANGELOG.md` files from the individual packages (leaving only this changelog as a central place)


## [2.0.0-alpha.1](https://github.com/supercharge/framework/compare/v1.0.0-beta1...v2.0.0-alpha.1) - 2021-06-23

### Updated
- full framework rewrite in TypeScript and bringing some new ideas and architecture to the project


## [1.0.0-beta0.1](https://github.com/supercharge/framework/compare/v1.0.0-beta0...v1.0.0-beta0.1) - 2019-02-23

### Changed
- move required packages from `devDependencies` to `dependencies` (`package.json`)
- set publish config in `package.json` to public (required for scoped packages)


## 1.0.0-beta0 - 2019-02-23

First beta release :rocket: :tada:
