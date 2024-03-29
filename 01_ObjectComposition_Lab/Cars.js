function Solve(commands) {
    let map = new Map();
    let cmdExecutor = {
        create: function ([objName, inherits, parent]) {
            parent = parent ? map.get(parent) : null;
            let newObj = Object.create(parent);
            map.set(objName, newObj);
        },

        set: function ([objName, key, value]) {
            let obj = map.get(objName);
            obj[key] = value;
        },
        
        print: function ([objName]) {
            let obj = map.get(objName);
            let objects = [];
            for (let key in obj) {
                objects.push(`${key}:${obj[key]}`);
            }
            console.log(objects.join(', '));
        }
    };

    for (let command of commands) {
        let commandParameters = command.split(' ');
        let action = commandParameters.shift();
        cmdExecutor[action](commandParameters);
    }
}