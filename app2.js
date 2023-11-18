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

// Sections
const studentPopUp = document.querySelector('.student-added-popUp');

// forms
const addStudentForm = document.querySelector('.add-student-form');

// Inputs
const nombreAlumnoInput = document.getElementById('nombre-nuevo-alumno');
const apellidosAlumnoInput = document.getElementById('apellidos-nuevo-alumno');
const edadAlumnoInput = document.getElementById('edad-nuevo-alumno');

// Buttons
const entendidoButton = document.querySelector('.dismiss');

// Functions
const showPopUp = () => {
    studentPopUp.classList.remove('d-none');
}
const closePopUp = () => {
    studentPopUp.classList.add('d-none');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('loggedStudents') === null) {
        const newStudents = new Alumnos('loggedStudents');
        localStorage.setItem('loggedStudents', JSON.stringify(newStudents));
        console.log('yes im doing this');
    };
});

addStudentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nombreAlumnoInput.value;
    const lastName = apellidosAlumnoInput.value;
    const age = edadAlumnoInput.value;
    // Antes de aqui vamos bien
    const loggedStudentsObject = JSON.parse(localStorage.getItem('loggedStudents'));
    const loggedStudentsWithMethods = new Alumnos(loggedStudentsObject.nameOfTodos, loggedStudentsObject.todos, loggedStudentsObject.grupos);
    loggedStudentsWithMethods.addStudent(name, lastName, age);
    localStorage.setItem('loggedStudents', JSON.stringify(loggedStudentsWithMethods));
    // Despues de aqui vamos bien
    nombreAlumnoInput.value = null;
    apellidosAlumnoInput.value = null;
    edadAlumnoInput.value = null;
    showPopUp();
});

entendidoButton.addEventListener('click', closePopUp);


