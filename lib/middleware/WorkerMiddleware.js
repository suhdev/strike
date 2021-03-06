"use strict";
function WorkerMiddleware(worker, store) {
    worker.onmessage = function (e) {
        var action = e.data;
        store.dispatch(action);
    };
    return function (action, store) {
        if (!action.isWorker) {
            return action;
        }
        worker.postMessage(action);
        return null;
    };
}
exports.WorkerMiddleware = WorkerMiddleware;
//# sourceMappingURL=WorkerMiddleware.js.map