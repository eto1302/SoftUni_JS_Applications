function Solve(params) {
    let rectangles = [];
    for (let element of params) {
        let rect = {
            width: element[0],
            height: element[1],            
            area: function () {
                return this.width * this.height;
            },
            compareTo: function (rectToCompare) {
                return rect.area() - rectToCompare.area();
            }
        };

        rectangles.push(rect);
    }
    return rectangles.sort((a,b) => a.compareTo(b) || a.width - b.width).reverse();

}