This is an endpoint definition, which should be done in core.

```tsx
export interface SignupEndpoint extends Endpoint {
  method: "POST";
  body: {
    email: string;
    username?: string;
    password?: string;
    name?: string;
    image?: string;
    subscribeToNewsletter?: boolean;
  };
  response: DefaultResponse;
}
```

As you can see, an endpoint always has a method, body and response. You should define these (along with your types) in the core package, so it will be introspected by the sensible-server and you can see them in the auto-generated docs.
