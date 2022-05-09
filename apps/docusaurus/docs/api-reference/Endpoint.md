This is an endpoint definition, which should be done in core.

```tsx
export interface SignupEndpoint extends Endpoint {
  method: "POST";
  body: {
    email: string;
    source: SignupSource;
    username?: string;
    password?: string;
    name?: string;
    image?: string;
    base64?: string;
    subscribeToNewsletter?: boolean;
  };
  response: DefaultResponse;
}
```

As you can see, an endpoint always has a method, body and response.
