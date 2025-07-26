## refs

- following: https://www.freecodecamp.org/news/the-nestjs-handbook-learn-to-use-nest-with-code-examples/

## notes

- Guards & Authorization
  - summary
    - determine whether a given request should be allowed to proceed based on custom logic
    - This is ideal for authentication, role checks, or feature flags.
  - lifecycle
    - After pipes (pipes validate incoming data to the handlers)
    - Before interceptors/controllers
  - implements `CanActivate` interface
- Interceptors
  - summary
    - wrap around method execution, letting you transform responses, bind extra logic before/after method calls, or measure performance
    - ideal for cross-cutting concerns like logging, response shaping, caching, or timing metrics
- @nestjs/config
  - avoids sprinkling `process.env` throughout code

- uses
  - Create FeatureFlag guard for auth. Add it to the controller levels


<!-- toggle change -->