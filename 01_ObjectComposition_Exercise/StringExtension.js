(function () {
    String.prototype.ensureStart = function (str) {
        if (!this.toString().startsWith(str)) {
            let result  = str + this.toString();
            return result;
        }
        return this.toString();
    };

    String.prototype.ensureEnd = function (str) {
        if (!this.toString().endsWith(str)) {
            return this.toString() + str;
        }
        return this.toString();
    };

    String.prototype.isEmpty = function (n) {
        return this.toString().length === 0;
    };

    String.prototype.truncate = function (n) {
        let temp = this.toString();

        if (n > temp.length - 1) {
            return temp
        }

        if (n < 4) {
            return '.'.repeat(n)
        }

        while (temp.lastIndexOf(' ') !== -1) {
            if (temp.lastIndexOf(' ') <= n-2) {
                return temp.substring(0, temp.lastIndexOf(' ')) + '.'.repeat(3)
            }
            temp = temp.substring(0, temp.lastIndexOf(' '))
        }

        return temp.substring(0, n-3) + '.'.repeat(3)
    };

    String.format = function (str, ...params) {
        for (let i = 1; i < arguments.length; i++) {
            str = str.replace('{' + (i - 1) + '}', arguments[i]);
        }
        return str
    };
}())
