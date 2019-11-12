function Solve(input) {
    const actions = {
        add: (a, x) => [...a, x],
        remove: (a, x) => a.filter(y => y !== x),
        print: (a, ) => {console.log(a.join(",")); return a;}
    }

    let arr = [];
    return input
        .map(x => x.split(' '))
        .forEach(([command, params]) =>
            arr = actions[command](arr, params)
        );
}