# MMM-ModuleMonkeyPatch
MagicMirror module to make monkeypatching other module.

## Installation
```sh
cd <MAGICMIRROR DIRECTORY>/modules
git clone https://github.com/MMRIZE/MMM-ModuleMonkeyPatch
```

## Configuration
```js
{
  module: "MMM-ModuleMonkeyPatch",
  config: {
    patches: [
      {
        module: "MMM-Something",
        method: "getDom", // Or Whatever method that module has.
        patch: function (original, args) {
          console.log('patch-start')
          let ret = original(args) // Or do something by yourself
          console.log('patch-end')
          return ret // return expected return of origianl method.
        }
      }, // You can add more patches.
    ]
  }
```
This will replace `original` method of the module with `patch` function.

`patch` function would be bind to the original module, so you can use `this` context in the function.


## Why?
When you need some modification of existing modules, but do not want to edit the original source code to prevent conflicts on upgrade/update.

But.. I think rare people will use this module. :D. This was my half-day weekend killing-time project.
