# Metascripting

Find good ways to create meta scripting templates to generate code that is readable and flexible

https://www.npmjs.com/package/metascript
https://github.com/dsherret/ts-morph

Do more research
When we have a good tool, use it to create some templates

Ideally, you should be able to still use all IntelliSense for the packages used in the templates.

Maybe it can be done with a typescript config (which will be ignored in the template itself) https://www.typescriptlang.org/docs/handbook/module-resolution.html so the modules used in the template are resolved to a global module place

preferred CLI command example: `sensible model note with text:string title:string date:number author:User`
