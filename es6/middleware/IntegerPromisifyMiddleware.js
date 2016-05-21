export const PROMISE_FETCHING = 0x1000000;
export const PROMISE_RESOLVED = 0x2000000;
export const PROMISE_REJECTED = 0x4000000;
export const PROMISE_NOTIFY = 0x8000000;
export function IntegerPromisify(action, store) {
    if (typeof action.promise === "undefined") {
        return action;
    }
    action.promise.then(function (data) {
        store.dispatch({
            type: PROMISE_RESOLVED | action.type,
            data: data
        });
    }, function (data) {
        store.dispatch({
            type: PROMISE_REJECTED | action.type,
            data: data
        });
    }, function (data) {
        store.dispatch({
            type: PROMISE_NOTIFY | action.type,
            data: data
        });
    });
    return {
        type: PROMISE_FETCHING | action.type,
        data: action.data
    };
}
//# sourceMappingURL=IntegerPromisifyMiddleware.js.map