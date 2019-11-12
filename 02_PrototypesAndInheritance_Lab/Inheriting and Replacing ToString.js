function Solve() {
    class Person {
        constructor(name, email) {
            this.name = name;
            this.email = email;
        }
        toString = function () {
            return `Person (name: ${this.name}, email: ${this.email})`
        }
    }

    class Teacher extends Person {
        constructor(name, email, subject) {
            super(name, email);
            super.toString = function () {
                return `Teacher (name: ${this.name}, email: ${this.email}, subject: ${this.subject})`
            }
            this.subject = subject;
        }

    }

    class Student extends Person {
        constructor(name, email, course) {
            super(name, email);
            super.toString = function () {
                return `Student (name: ${this.name}, email: ${this.email}, course: ${this.course})`
            }
            this.course = course;

        }

    }

    return {
        Person,
        Teacher,
        Student
    }
}