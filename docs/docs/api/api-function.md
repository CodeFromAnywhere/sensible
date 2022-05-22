# Api function

The api function can be used to communicate with the backend from any frontend (but most likely from your ui package). Its greatest strength is that it has complete typescript support, so you will see if you are giving any invalid arguments!

Definition:

```
api(endpointPath, method, arguments): Promise<result>
```

An example:

```jsx
api("requestAccess", "POST", { email }).then((res) => {
  setIsLoading(false);
  alert(res.response);
});
```

The best thing about this function is that it is fully typed using your endpoint definitions from core.
