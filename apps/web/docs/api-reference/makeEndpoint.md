# makeEndpoint

Make endpoint is the function that wraps server.js's api function so it has typesafety from our core definitions. It looks like this:

```jsx

makeEndpoint("requestAccess", "POST", async (ctx) => {
    const { email } = ctx.body;

    const user = await User.create({ email });

    if (!user) {
      return {
        response: "Something went wrong",
        success: false,
      };
    }

    return {
      response: "You can get it for free on GitHub, but thanks for your email!",
      success: true,
    };
  }),

```

You don't loose any freedom from server.js, but makeEndpoint is very useful because it will warn you if you make any mistakes in the type interface of the input and output.
