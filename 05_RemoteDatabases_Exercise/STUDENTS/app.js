import { get, post } from './requester.js'

const html = {
    'getTable': () => document.getElementById('results'),
}

const actions = {
    'load-students': async function () {
        try {
            let students = await get('appdata', 'Students');
            students = Array.from(students).sort((a, b) => (a.ID > b.ID) ? 1 : -1)
            const studentsContainer = html.getTable();    
            const fragment = document.createDocumentFragment()      
            console.log(students)  

            students.forEach(s => {
                const tr = document.createElement('tr');
                const IDTd = document.createElement('td');
                const FirstNameTd = document.createElement('td');
                const LastNameTd = document.createElement('td');
                const FacultyNumberTd = document.createElement('td');
                const GradeTd = document.createElement('td');

                IDTd.textContent = s.ID;
                FirstNameTd.textContent = s.FirstName;
                LastNameTd.textContent = s.LastName;
                FacultyNumberTd.textContent = s.FacultyNumber;
                GradeTd.textContent = s.Grade;

                tr.append(IDTd, FirstNameTd, LastNameTd, FacultyNumberTd, GradeTd);
                fragment.appendChild(tr);
            })
            studentsContainer.innerHTML = '';
            studentsContainer.appendChild(fragment);
        } catch (err) {
            alert(err);
        }

    },

    'create-student': async function (ID, FirstName, LastName, FacultyNumber, Grade) {
        let data = {};
        if (ID && FirstName && LastName && FacultyNumber && Grade) {
            data = {
                ID: ID,
                FirstName: FirstName,
                LastName: LastName,
                FacultyNumber: FacultyNumber,
                Grade: Grade
            };
        }
        try {
            const response = await post('appdata', 'Students', data);
           actions['load-students']();

        } catch (err) {
            alert(err);
        }
    }
}

actions['load-students']();
actions['create-student'](3, 'TestCreate', 'TestCreate1', 3, 3);