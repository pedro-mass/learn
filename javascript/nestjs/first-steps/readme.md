## refs

- following official docs: https://docs.nestjs.com/first-steps

## notes

- first steps
- controllers
  - `nest g resource [name]`
    To quickly create a CRUD controller with built-in validation, you can use the CLI's CRUD generator:
  - `nest g controller [name]`
    create a controller using the CLI
  - Routes with parameters should be declared after any static paths. This prevents the parameterized paths from intercepting traffic destined for the static paths.
  - while you could inject the Response with `@Res() res: Response` - you lose compatibility with Nest features that rely on standard response handling, such as Interceptors and the @HttpCode() / @Header() decorators.
  To address this, you can enable the passthrough option like this:
  ```ts
  @Get()
  findAll(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.OK);
    return [];
  }
  ```
  With this approach, you can interact with the native response object (for example, setting cookies or headers based on specific conditions), while still allowing the framework to handle the rest.
- providers
  - Providers are a core concept in Nest. Many of the basic Nest classes, such as services, repositories, factories, and helpers, can be treated as providers. The key idea behind a provider is that it can be injected as a dependency, allowing objects to form various relationships with each other. The responsibility of "wiring up" these objects is largely handled by the Nest runtime system.
  - If your class doesn't extend another class, it's generally better to use constructor-based injection. The constructor clearly specifies which dependencies are required, offering better visibility and making the code easier to understand compared to class properties annotated with @Inject.
- modules
  - provides metadata that Nest uses to organize and manage app structure efficiently
  - `nest g module cats`
- middleware
