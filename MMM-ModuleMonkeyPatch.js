Module.register("MMM-ModuleMonkeyPatch", {
  defaults: {
    patches: [
    ]
  }, 

  notificationReceived: function (notification, payload, sender) {
    if (notification === "ALL_MODULES_STARTED") {
      this.patchModules()
    }
  },

  patchModules: function () {
    const modules = MM.getModules()
    for (let module of modules) {
      for (let patch of this.config.patches) {
        if (
          module
          && module.name === patch.module
          && typeof module[ patch.method ] === "function"
          && typeof patch.patch === "function"
        ) {
          Log.log(`MONKEYPATCH: ${patch.module}.${patch.method}`)
          const original = module[ patch.method ]
          //this.originals.set(original, original)
          module[ patch.method ] = new Proxy(original, {
            apply: function (target, thisArg, args) {
              return patch.patch.bind(module)(original.bind(module), args)
            }
          })
        }
      }
    }
  }
})