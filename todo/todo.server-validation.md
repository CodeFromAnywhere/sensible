Sensible has a feature where it should automatically validate the input parameters of any api call according to the typescript type that has been defined. If the input parameters are not valid according to type definition, the api should return some json like { success:false, response:”XYZ input is invalid, it should be a string” }

Todo:

- [ ] Try to cast body to the correct type (they're all string/string[] in get queries)
- [ ] Make validation work, test it.
- [ ] Make sure response can't contain more than the response type definition.
