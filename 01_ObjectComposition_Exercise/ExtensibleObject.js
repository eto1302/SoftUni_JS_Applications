function Solve(template) {
    let obj = {
        extend: (template) => {
            for (let property in template) {
                if (typeof template[property] === 'function') {
                    Object.getPrototypeOf(obj)[property] = template[property];
                }
                else {
                    obj[property] = template[property];
                }
            }
        }
    };
    return obj;
<<<<<<< HEAD
}
=======
}
>>>>>>> 6feddfa4b245d29e21a208b8d05cc5c2676f39f2
