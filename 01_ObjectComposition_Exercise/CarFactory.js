function Solve(object){
    const engineTypes = [{ power: 90, volume: 1800 }, { power: 120, volume: 2400 }, { power: 200, volume: 3500 }];
    
    let result = {};
    result.model = object.model;

    

    result.engine = engineTypes.find(type => object.power <= type.power);
    
    result.carriage = {
        type: object.carriage,
        color: object.color
    };

    let wheelsize;
    if(object.wheelsize % 2 === 0){
        wheelsize = Math.round(object.wheelsize) - 1;
    }
    else {
        wheelsize = Math.round(object.wheelsize);
    }  

    result.wheels = [wheelsize, wheelsize, wheelsize, wheelsize];

    return result;

<<<<<<< HEAD
}
=======
}
>>>>>>> 6feddfa4b245d29e21a208b8d05cc5c2676f39f2
