export function ShowLoader() {
  debugger;
    return function(Class: Function) {
      Object.defineProperty(Class.prototype, "showLoader", {
        value: true
      });
    };
  }
  