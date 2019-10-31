class HEX {
    constructor(value) {
        this.value = value;
    }

    valueOf() {
        return this.value;
    }

    toString() {
        return `0x${this.value.toString(16).toUpperCase()}`;
    }

    plus(hexObject) {
        if (hexObject instanceof HEX) {
            return new HEX(this.value + hexObject.valueOf());
        }
    }

    minus(hexObject) {
        if (hexObject instanceof HEX) {
            return new HEX(this.value - hexObject.valueOf());
        }
    }

    parse(string) {
        return (parseInt(string, 16));
    }
}
