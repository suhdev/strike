export function functionTest(Function = fn, msg) {
    if (typeof fn !== "function" || !fn.name) {
        throw new Error(msg || (fn.name + ' must be a function'));
    }
}
