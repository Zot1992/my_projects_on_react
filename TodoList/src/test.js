let state = [];
let corentInd = 0;
function useState(initionValue) {
    const ind = corentInd;
    state[ind] = state[ind] ?? initionValue;
    const setState = (newValue) => {
        state[ind] = newValue;
        rerender();
    }
    corentInd++;
    return [
        state[ind],
        setState
    ]
}