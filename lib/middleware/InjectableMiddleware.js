"use strict";
function Injectable(injector) {
    return function (action, store) {
        if (typeof action.service === "undefined") {
            return action;
        }
        return injector.injectFunction(action.service);
    };
}
exports.Injectable = Injectable;
//# sourceMappingURL=InjectableMiddleware.js.map