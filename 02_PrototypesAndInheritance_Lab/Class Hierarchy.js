function Solve() {
    class Figure {

        constructor(unit = 'cm') {
            this.unit = unit;
            this.units = {
                m: 0.01,
                cm: 1,
                mm: 10
            };
        }

        changeUnits = function (x) {
            this.unit = x;
        }

    }

    class Circle extends Figure {
        constructor(radius, unit = 'cm') {
            super(unit);
            this.radius = radius;
            Object.defineProperty(this, "area", {
                get: function () {
                    return Math.PI * (this.radius * this.units[this.unit]) * (this.radius * this.units[this.unit]);
                }
            })
        }

    toString = () => `Figures units: ${this.unit} Area: ${this.area} - radius: ${this.radius*this.units[this.unit]}`;

    }

    class Rectangle extends Figure {
        constructor(width, height, unit = 'cm') {
            super(unit);
            this.height = height;
            this.width = width;
            Object.defineProperty(this, "area", {
                get: function () {
                    return (this.height * this.units[this.unit]) * (this.width * this.units[this.unit]);
                }
            })

        }
        toString = () => `Figures units: ${this.unit} Area: ${this.area} - width: ${this.width*this.units[this.unit]}, height: ${this.height*this.units[this.unit]}`;
    }

    return {
        Figure,
        Circle,
        Rectangle
    }
}