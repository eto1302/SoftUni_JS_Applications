function sorted() {
    let array = [];

    let obj = {
        add: function add(element) {
            array.push(element);
            array.sort((a, b) => a - b);
            this.size++;
        },
        remove: function remove(index) {
            if (index >= 0 && index < array.length) {
                array.splice(index, 1);
                this.size--;
            }
        },
        get: function get(index) {
            if (index >= 0 && index < array.length) {
                return array[index]
            }
        },
        size: 0
    };
    return obj
<<<<<<< HEAD
}
=======
}
>>>>>>> 6feddfa4b245d29e21a208b8d05cc5c2676f39f2
