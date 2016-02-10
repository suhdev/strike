export function InjectPropsAndFreeze(props, state) {
    for (let key in state) {
        props[key] = state[key] || props[key];
    }
    return Object.freeze(props);
}
//# sourceMappingURL=InjectProps.js.map