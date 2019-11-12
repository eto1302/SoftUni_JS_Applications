function Solve(string) {
    const objs = JSON.parse(string);
    const concatenate = (a, o) => ({ ...a, ...o });
    const c = objs.reduce(concatenate, {});
    return c;

}

console.log(Solve(`[{"canMove": true},{"canMove":true, "doors": 4},{"capacity": 5}]`));