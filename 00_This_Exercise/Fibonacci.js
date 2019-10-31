function getFibonator() {
    var a = 0;
    var b = 1;
    
    return function(){
        let temp = a + b;
        a = b;
        b = temp;
        return a;
    }
}