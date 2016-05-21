"use strict";
exports.PROMISE_FETCHING = 0x1000000;
exports.PROMISE_RESOLVED = 0x2000000;
exports.PROMISE_REJECTED = 0x4000000;
exports.PROMISE_NOTIFY = 0x8000000;
function IntegerPromisify(action, store) {
    if (typeof action.promise === "undefined") {
        return action;
    }
    action.promise.then(function (data) {
        store.dispatch({
            type: exports.PROMISE_RESOLVED | action.type,
            data: data
        });
    }, function (data) {
        store.dispatch({
            type: exports.PROMISE_REJECTED | action.type,
            data: data
        });
    }, function (data) {
        store.dispatch({
            type: exports.PROMISE_NOTIFY | action.type,
            data: data
        });
    });
    return {
        type: exports.PROMISE_FETCHING | action.type,
        data: action.data
    };
}
exports.IntegerPromisify = IntegerPromisify;
//# sourceMappingURL=IntegerPromisifyMiddleware.js.map