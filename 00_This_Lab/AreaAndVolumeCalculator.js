function solve(area, vol, input){
    let objects = JSON.parse(input);
    let result = [];
    for(let object of objects){
        let temp = {};
        let areaObj = Math.abs(area.call(object));
        let volObj = Math.abs(vol.call(object));
        temp = {
            area: areaObj,
            volume: volObj
        }
        result.push(temp);
    }
    return result;
}