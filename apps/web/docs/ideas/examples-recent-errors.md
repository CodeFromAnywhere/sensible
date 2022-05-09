# Examples, Recents and Errors

**sensible-server**

- makeEndpoint calls saveRecent which saves all info (body, response, etc) into a file. This file is trimmed every day using a cron.
- makeEndpoint calls saveError which saves all info (body, response, error, etc.) into a file.
- Expose clearErrors endpoint to clean up all errors for an endpoint or a specific error
- Create "sensible/recent" endpoint for all recent api calls (by default, turned off in prod). Have from parameter (timestamp) and default limit of 10 per endpoint.
- Create "sensible/errors" endpoint for all errored api calls (by default, turned off in prod). Have from parameter (timestamp)
- Expose examples in schema automatically, if available (or separate endpoint because of reloading?)

**Frontend (docs):**

Recent/errors/examples:
If available, fetch recent + error apis, render in react page:

- on the top the global recent calls
- for every endpoint the recent/errors calls there individually with run-again button
- refresh every second (with from parameter for efficiency)
- render examples per endpoint
- option to test endpoint with custom parameters
- option to create example for other type interfaces
