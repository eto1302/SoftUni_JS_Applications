function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    Object.defineProperty(this, "fullName", {
        get: function () {
            return `${this.firstName} ${this.lastName}`
        },
        set: function (value) {
            const regex = /[a-zA-Z]+ [a-zA-Z]+/gm;
            if (regex.exec(value) !== null) {
                this.firstName = value.split(' ')[0];
                this.lastName = value.split(' ')[1];
            }
        }
    })
}
