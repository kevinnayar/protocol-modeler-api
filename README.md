# Protocol Modeler API

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Overview

1. `bootstrap()` -> swagger

2. DI and IoC

- Module
- Service as `providers`
- Controller as `controllers`

```ts
// foo.controller.ts
export class FooController {
  constructor(private fooService: FooService) {}
}

// foo.module.ts
@Module({
  controllers: [FooController],
  providers: [FooService],
})
export class FooModule {}
```

3. Guards

4. Pipes

5. Request Lifecycle (abbreviated)

- Request
- Guards
- Pipes
- Controller
- Service (if exists)
- Response

create study request...

- auth.guard.ts -> validates jwt, adds user or throws
- zod-validation.pipe.ts -> validates incoming post body or throws
- study.controller.ts -> calls studyService
- study.service.ts -> writes to db

Full lifecycle:

- Incoming request
- Globally bound middleware
- Module bound middleware
- Global guards
- Controller guards
- Route guards
- Global interceptors (pre-controller)
- Controller interceptors (pre-controller)
- Route interceptors (pre-controller)
- Global pipes
- Controller pipes
- Route pipes
- Route parameter pipes
- Controller (method handler)
- Service (if exists)
- Route interceptor (post-request)
- Controller interceptor (post-request)
- Global interceptor (post-request)
- Exception filters (route, then controller, then global)
- Server response
