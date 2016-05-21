export function WorkerMiddleware(worker, store) {
    worker.onmessage = function (e) {
        let action = e.data;
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
//# sourceMappingURL=WorkerMiddleware.js.map