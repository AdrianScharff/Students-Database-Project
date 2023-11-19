class Materia {
    constructor(materia, calificacion = null) {
        this.materia = materia;
        this.calificacion = calificacion;
    }
}

class Alumno {
    constructor(nombre, apellidos, edad) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.materias = [];
        this.promedio = null;
        this.id = new Date().getTime().toString();
    }
}

class Alumnos {
    constructor(nameOfTodos, todos = [], grupos = []) {
        this.nameOfTodos = nameOfTodos;
        this.todos = todos;
        this.grupos = grupos;
    }

    addStudent(name, lastName, age) {
        const newStudent = new Alumno(name, lastName, age);
        this.todos.push(newStudent);
    }

    addGroup(nombre) {
        const newGroup = new Grupo(nombre);
        this.grupos.push(newGroup);
    }
}

class Grupo {
    constructor(nombre, alumnos = []) {
        this.nombre = nombre;
        this.alumnos = alumnos;
        this.promedio = null;
        this.groupId = new Date().getTime().toString();
    }
}

// class Grupo {
//     constructor(nombre) {
//         this.nombre = nombre;
//         this.alumnos = [];
//     }
// }

// Sections
const groupHomeSection = document.querySelector('.group-home-section');
const seeStudentsSection = document.querySelector('.see-student-section');
const addGroupSection = document.querySelector('.add-group-section');
const groupAddedSection = document.querySelector('.group-added-success');
const groupsContainer = document.querySelector('.groups-container');
const addStudentsSection = document.querySelector('.add-students-section');
const studentsToAddContainer = document.querySelector('.add-students-container');
const studentAddedSection = document.querySelector('.student-added-success');
const studentIncludedAlert = document.querySelector('.student-included-alert');
const studentOtherGroupAlert = document.querySelector('.student-other-group-alert');
const studentsOfGroupContainer = document.querySelector('.display-students-container');

// Forms
const addGroupForm = document.querySelector('.add-group-form');

// Inputs
const addGroupInput = document.querySelector('.add-group-input');

// Buttons
const addGroupButton = document.querySelector('.add-group-button');
const closeAddGroupButton = document.querySelector('.close-add-group');
const closeGroupAddedBtn = document.querySelector('.close-group-added-success');
const closeAddStudents = document.querySelector('.close-add-students');
const closeDisplayStudents = document.querySelector('.close-display-students');

// Funciones
const displayGroups = () => {
    const loggedStudentsObject = JSON.parse(localStorage.getItem('loggedStudents'));
    const arrayOfGroups = loggedStudentsObject.grupos;
    groupsContainer.innerHTML = '';
    arrayOfGroups.forEach(group => {
        const newGroupRow = document.createElement('tr');
        newGroupRow.innerHTML = `<td class="col-4 text-center">${group.nombre}</td>
        <td class="col-4 text-center">
            ${getGroupGPA(group.groupId) || 'Por calcular'}
        </td>
        <td class="students-btns-container d-flex flex-column align-items-center gap-1" data-groupId=${group.groupId}>
            <button class="see-group-students-btn btn btn-primary fs-4 col-11">Ver alumnos</button>
            <button class="add-group-students-btn btn btn-primary fs-4 col-11">Agregar alumnos</button>
        </td>`;
        groupsContainer.append(newGroupRow);
    });
}

const displaySection = (section) => {
    section.classList.remove('d-none');
}

const closeSection = (section) => {
    section.classList.add('d-none');
}

const addNewGroupToLocalStorage = (input) => {
    const loggedStudentsObject = JSON.parse(localStorage.getItem('loggedStudents'));
    const loggedStudentsWithMethods = new Alumnos(loggedStudentsObject.nameOfTodos, loggedStudentsObject.todos, loggedStudentsObject.grupos);
    loggedStudentsWithMethods.addGroup(input.value);
    localStorage.setItem('loggedStudents', JSON.stringify(loggedStudentsWithMethods));
    input.value = '';
    displayGroups();
    displaySection(groupAddedSection);
    closeSection(addGroupSection);
}

const displayStudentsOfGroup = (idOfTheGroup) => {
    const loggedStudentsObject = JSON.parse(localStorage.getItem('loggedStudents'));
    const arrayOfGroups = loggedStudentsObject.grupos;
    const groupToDisplay = arrayOfGroups.find(g => g.groupId === idOfTheGroup);
    const studentsOfGroup = groupToDisplay.alumnos;
    studentsOfGroupContainer.innerHTML= `<div class="d-flex">
    <p class="col-8 fs-3 fw-bold">Nombre</p>
    <p class="col-4 fs-3 fw-bold">Promedio</p>
</div>`;
    let counter = 1;
    studentsOfGroup.forEach(s => {
        const newStudentRow = document.createElement('li');
        newStudentRow.classList.add('d-flex');
        newStudentRow.innerHTML = `<p class="col-8">${counter}. <span>${s.nombre} ${s.apellidos}</span></p>
        <span class="col-4">${s.promedio || 'por calcular'}</span>`;
        studentsOfGroupContainer.append(newStudentRow);
    });
    counter++;
}

const displayStudentsToAdd = (idOfGroup) => {
    const loggedStudentsObject = JSON.parse(localStorage.getItem('loggedStudents'));
    const arrayOfStudents = loggedStudentsObject.todos;
    studentsToAddContainer.innerHTML = '';
    let counter = 1;
    arrayOfStudents.forEach(student => {
        const newStudentBtn = document.createElement('li');
        newStudentBtn.innerHTML = `<button class="a-student-button col-12 text-start btn btn-outline-primary fs-4" data-studentId=${student.id} data-groupId=${idOfGroup}><span>${counter}. </span>${student.nombre} ${student.apellidos}</button>`;
        studentsToAddContainer.append(newStudentBtn);
        counter++;
    });
}

const addStudentToGroup = (studentId, groupId) => {
    const loggedStudentsObject = JSON.parse(localStorage.getItem('loggedStudents'));
    const arrayOfStudents = loggedStudentsObject.todos;
    const arrayOfGroups = loggedStudentsObject.grupos;
    const studentToAdd = arrayOfStudents.find(s => s.id === studentId);
    const groupToAddStudent = arrayOfGroups.find(g => g.groupId === groupId);
    if (groupToAddStudent.alumnos.some(a => a.id === studentId)) {
        displaySectionFast(studentIncludedAlert);
    } else if (arrayOfGroups.some(g => g.alumnos.some(s => s.id === studentId))) {
        displaySectionFast(studentOtherGroupAlert);
    } else {
        groupToAddStudent.alumnos.push(studentToAdd);
        localStorage.setItem('loggedStudents', JSON.stringify(loggedStudentsObject));
        displaySectionFast(studentAddedSection);
        updateGroupGPA(groupId, getGroupGPA(groupId));
    } 
}

const getGroupGPA = (theGroupId) => {
    const loggedStudentsObject = JSON.parse(localStorage.getItem('loggedStudents'));
    const arrayOfGroups = loggedStudentsObject.grupos;
    const groupToUpdate = arrayOfGroups.find(g => g.groupId === theGroupId);
    const studentsOfGroup = groupToUpdate.alumnos;
    let counter = 0;
    let sum = 0;
    studentsOfGroup.forEach(student => {
        if(student.promedio) {
            sum += student.promedio;
            counter ++;
        }
    });
    const groupGPA = sum / counter;
    return groupGPA;
}

updateGroupGPA = (idOfGroup, GPA) => {
    const loggedStudentsObject = JSON.parse(localStorage.getItem('loggedStudents'));
    const arrayOfGroups = loggedStudentsObject.grupos;
    const groupToUpdate = arrayOfGroups.find(g => g.groupId === idOfGroup);
    groupToUpdate.promedio = GPA;
    localStorage.setItem('loggedStudents', JSON.stringify(loggedStudentsObject));
    displayGroups();
}

const displaySectionFast = (section) => {
    section.classList.remove('d-none');
    setTimeout(() => {
        section.classList.add('d-none');
    }, 700);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('loggedStudents') === null) {
        const newStudents = new Alumnos('loggedStudents');
        localStorage.setItem('loggedStudents', JSON.stringify(newStudents));
    }
    displayGroups();
});

groupHomeSection.addEventListener('click', e => {
    if (e.target.classList.contains('add-group-button')) {
        displaySection(addGroupSection);
    } else if (e.target.classList.contains('add-group-students-btn')) {
        const groupId = e.target.parentNode.dataset.groupid;
        displayStudentsToAdd(groupId);
        displaySection(addStudentsSection);
    } else if (e.target.classList.contains('see-group-students-btn')) {
        const groupId = e.target.parentNode.dataset.groupid;
        displayStudentsOfGroup(groupId);
        displaySection(seeStudentsSection);
    }
});

addStudentsSection.addEventListener('click', e => {
    if (e.target.classList.contains('a-student-button')) {
        idOfStudent = e.target.dataset.studentid;
        idOfGroup = e.target.dataset.groupid;
        addStudentToGroup(idOfStudent, idOfGroup);
    }
});

addGroupForm.addEventListener('submit', e => {
    e.preventDefault();
    addNewGroupToLocalStorage(addGroupInput);
});

closeAddGroupButton.addEventListener('click', () => {
    closeSection(addGroupSection);
});

closeGroupAddedBtn.addEventListener('click', () => {
    closeSection(groupAddedSection);
});

closeAddStudents.addEventListener('click', () => {
    closeSection(addStudentsSection);
})

closeDisplayStudents.addEventListener('click', () => {
    closeSection(seeStudentsSection);
});


