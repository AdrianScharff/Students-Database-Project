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
const searchAndSortingSection = document.querySelector('.search-and-sorting-section');
const studentsTable = document.querySelector('.students-table');
const addSubjectSection = document.querySelector('.add-subject-section');
const subjectAddedPopUp = document.querySelector('.subject-added-success');
const gradesAddedPopUp = document.querySelector('.grades-added-success');
const seeSubjectsSection = document.querySelector('.see-subjects-section')
const subjectsContainer = document.querySelector('.subjects-container');
const assignGradesSection = document.querySelector('.assign-grades-section');
const gradesInputsContainer = document.querySelector('.grades-inputs-container');
const gradesContainer = document.querySelector('.grades-container');
const seeGradesSection = document.querySelector('.see-grades-section');
const orderButtonsSection = document.querySelector('.order-buttons-section');
const searchSection = document.querySelector('.search-section');

// Forms
const assignGradesForm = document.querySelector('.assign-grades-form');
const nameSearchForm = document.querySelector('.name-search-form');
const lastNameSearchForm = document.querySelector('.last-name-search-form');
const subjectSearchForm = document.querySelector('.subject-search-form');
const searchForms = document.querySelectorAll('.search-form');

// Inputs
const nameSearchInput = document.querySelector('.name-search-input');
const lastNameSearchInput = document.querySelector('.last-name-search-input');
const subjectSearchInput = document.querySelector('.subject-search-input');

// Buttons
const closeSubjectAddedBtn = document.querySelector('.dismiss-subject-added');
const closeSubjectsBtn = document.querySelector('.close-subjects-btn');
const closeAssignGrades = document.querySelector('.close-assign-grades');
const closeGradesAddedBtn = document.querySelector('.dismiss-grades-added');
const closeGradesBtn = document.querySelector('.close-grades-btn');
const seniorityOrderButton = document.querySelector('.seniority-order-button');
const ascendingOrderButton = document.querySelector('.ascending-order-button');
const descendingOrderButton = document.querySelector('.descending-order-button');
const orderButtons = document.querySelectorAll('.order-button');
const subjectToAddButtons = document.querySelectorAll('.subject-to-add-btn');

// Others
const alertNameNotFound = document.querySelector('.name-not-found-alert');
const alertLastNameNotFound = document.querySelector('.last-name-not-found-alert');
const alertSubjectNotFound = document.querySelector('.subject-not-found-alert');

// Functions
const displayAllStudents = () => {
    // const studentsArray = JSON.parse(localStorage.getItem('loggedStudents'));
    if (localStorage.getItem('loggedStudents') === null) {
        const newStudents = new Alumnos('loggedStudents');
        localStorage.setItem('loggedStudents', JSON.stringify(newStudents));
    }
    const loggedStudentsObject = JSON.parse(localStorage.getItem('loggedStudents'));
    const studentsArray = loggedStudentsObject.todos;
    displayStudentsFromArray(studentsArray);
    removeSearchForms();
}

const displayStudentsFromArray = (arrayOfStudents) => {
    studentsTable.innerHTML = '';
    if (arrayOfStudents.length > 0) {
        let counter = 1;
        arrayOfStudents.forEach((student) => {
            const newTableRow = document.createElement('tr');
            newTableRow.innerHTML = `<th>${counter}</th>
        <td>${student.nombre} ${student.apellidos}</td>
        <td>${student.edad}</td>
        <td>
            <button class="see-subjects-button btn btn-primary" data-id=${student.id}>Ver materias</button>
            <button class="add-subject-button btn btn-primary" data-id=${student.id}>Agregar materia</button>
        </td>
        <td>
            <button class="see-grades-button btn btn-primary" data-id=${student.id}>Ver calificaciones</button>
            <button class="assign-grades-button btn btn-primary" data-id=${student.id}>Asignar calificaciones</button>
        </td>
        <td>
            <div>
                <p class='GPAParagraph text-info fw-bold fs-4' data-id=${student.id}>${student.promedio || ''}</p>
            </div>
        </td>`;
            studentsTable.append(newTableRow);
            counter++;
        });
    }
}

let studentForAddSubjectsSection = null;

const showAddSubjectSection = (buttonId) => {
    studentForAddSubjectsSection = buttonId;
    addSubjectSection.classList.remove('d-none');
}

addSubjectSection.addEventListener('click', e => {
    if (e.target.classList.contains('close-add-subject')) {
        addSubjectSection.classList.add('d-none');
    } else if (e.target.classList.contains('subject-to-add-btn')) {
        const subjectName = e.target.textContent;
        addSubjectClickedToLocalStorage(studentForAddSubjectsSection, subjectName);
    }
    console.log('doWhenClickingAddSubjectSection triggered!!');
});

const addSubjectClickedToLocalStorage = (idOfButton, materiaName) => {
    // const arrayOfStudents = JSON.parse(localStorage.getItem('loggedStudents'));
    const loggedStudentsObject = JSON.parse(localStorage.getItem('loggedStudents'));
    const arrayOfStudents = loggedStudentsObject.todos;
    const student = arrayOfStudents.find(s => s.id === idOfButton);
    if (student) {
        const subjectFound = student.materias.find(m => m.materia === materiaName);
        if (!subjectFound) {
            const newSubject = new Materia(materiaName);
            student.materias.push(newSubject);
            localStorage.setItem('loggedStudents', JSON.stringify(loggedStudentsObject));
            showPopUp(subjectAddedPopUp);
        }
    }
}

const showPopUp = (section) => {
    section.classList.remove('d-none');
}

const toggleInput = (input, inputToClose, inputToClose2) => {
    input.classList.toggle('d-none');
    inputToClose.classList.add('d-none');
    inputToClose2.classList.add('d-none');
}

const toggleSortingButtonColor = (button, buttonNotSelected, buttonNotSelected2) => {
    if (!button.classList.contains('btn-info')) {
        button.classList.add('btn-info');
        button.classList.remove('btn-primary');
    }
    buttonNotSelected.classList.remove('btn-info');
    if (!buttonNotSelected.classList.contains('btn-primary')) {
        buttonNotSelected.classList.add('btn-primary');
    }
    buttonNotSelected2.classList.remove('btn-info');
    if (!buttonNotSelected2.classList.contains('btn-primary')) {
        buttonNotSelected2.classList.add('btn-primary');
    }
}

const closePopUp = (section) => {
    section.classList.add('d-none');
}

const displaySubjects = (idOfButton) => {
    subjectsContainer.innerHTML = '';
    // const arrayOfStudents = JSON.parse(localStorage.getItem('loggedStudents'));
    const loggedStudentsObject = JSON.parse(localStorage.getItem('loggedStudents'));
    const arrayOfStudents = loggedStudentsObject.todos;
    const student = arrayOfStudents.find(s => s.id === idOfButton);
    if (student) {
        const arrayOfSubjects = student.materias.map(m => m.materia);
        arrayOfSubjects.forEach(subject => {
            const newSubjectRow = document.createElement('li');
            newSubjectRow.classList.add('mx-2');
            newSubjectRow.textContent = subject;
            subjectsContainer.append(newSubjectRow);
        });
    }
}

let studentForAddGradesBtn = null;
let arrayOfStudentsForAddGradesBtn = null;

const displayAddGrades = (idOfButton) => {
    gradesInputsContainer.innerHTML = '';
    // arrayOfStudentsForAddGradesBtn = JSON.parse(localStorage.getItem('loggedStudents'));
    const loggedStudentsObject = JSON.parse(localStorage.getItem('loggedStudents'));
    arrayOfStudentsForAddGradesBtn = loggedStudentsObject.todos;
    const student = arrayOfStudentsForAddGradesBtn.find(s => s.id === idOfButton);
    if (student) {
        studentForAddGradesBtn = student;
        studentForAddGradesBtn.materias.forEach(m => {
            const sanitizedId = m.materia.replace(/\s+/g, '_');
            const newGradeInput = document.createElement('li');
            newGradeInput.classList.add('d-flex');
            newGradeInput.classList.add('justify-content-between');
            newGradeInput.innerHTML = `<p class="me-5">${m.materia}</p>
            <input class="ms-5 ps-3 inpCalif" data-id=${sanitizedId} type="number">`;
            gradesInputsContainer.append(newGradeInput);
        });
    }
}

assignGradesForm.addEventListener('submit', e => {
    e.preventDefault();
    doWhenSubmittingAssignGradesForm(studentForAddGradesBtn, arrayOfStudentsForAddGradesBtn);
});

const doWhenSubmittingAssignGradesForm = (student, arrayOfStudents) => {
    const gradeInputs = document.querySelectorAll('.inpCalif');
    if (gradeInputs.length > 0 && [...gradeInputs].some(inp => inp.value)) {
        let subjectObjectFound = true;
        gradeInputs.forEach(input => {
            if (input.value) {
                const inputSubject = input.dataset.id.replace(/_/g, ' ');
                const subjectToChangeGrade = student.materias.find(m => m.materia === inputSubject);
                if (subjectToChangeGrade) {
                    subjectToChangeGrade.calificacion = input.value;
                } else {
                    console.log('The object in the array materias with the materia property value === dataset id of the input submitted was not found, the array materias is this:');
                    console.log(student.materias);
                    console.log('and the dataset id of the input submitted is this:');
                    console.log(inputSubject);
                    subjectObjectFound = false;
                }
            }
        });
        const loggedStudentsObject = JSON.parse(localStorage.getItem('loggedStudents'));
        loggedStudentsObject.todos = arrayOfStudents;
        localStorage.setItem('loggedStudents', JSON.stringify(loggedStudentsObject));
        if (subjectObjectFound) {
            closePopUp(assignGradesSection);
            showPopUp(gradesAddedPopUp);
            updateGPA(student, arrayOfStudents, getGPA(student));
        }
    }
    console.log('doWhenSubmittingAssignGradesForm triggered!!');
}

const displayGrades = (btnId) => {
    gradesContainer.innerHTML = '';
    // const arrayOfStudents = JSON.parse(localStorage.getItem('loggedStudents'));
    const loggedStudentsObject = JSON.parse(localStorage.getItem('loggedStudents'));
    const arrayOfStudents = loggedStudentsObject.todos;
    const student = arrayOfStudents.find(s => s.id === btnId);
    if (student) {
        const arrayOfSubjectObjects = student.materias;
        arrayOfSubjectObjects.forEach(subj => {
            const newGradeRow = document.createElement('li');
            newGradeRow.classList.add('d-flex');
            newGradeRow.classList.add('justify-content-between');
            newGradeRow.innerHTML = `${subj.materia}: <span class="ms-5 pe-4 text-primary">${subj.calificacion || ''}</span>`;
            gradesContainer.append(newGradeRow);
        });
    }
}

const getGPA = (studentObject) => {
    let counter = 0;
    let sum = 0;
    studentObject.materias.forEach(mat => {
        if (mat.calificacion) {
            sum += parseInt(mat.calificacion);
            counter++;
        }
    });
    const GPA = sum / counter;
    return GPA;
}

const updateGPA = (studentObject, studentsArray, GPA) => {
    studentObject.promedio = GPA;
    const loggedStudentsObject = JSON.parse(localStorage.getItem('loggedStudents'));
    loggedStudentsObject.todos = studentsArray;
    localStorage.setItem('loggedStudents', JSON.stringify(loggedStudentsObject));
    if (seniorityOrderButton.classList.contains('btn-info')) {
        displayAllStudents();
    } else if (ascendingOrderButton.classList.contains('btn-info')) {
        displaySortedStudents('ascending');
    } else if (descendingOrderButton.classList.contains('btn-info')) {
        displaySortedStudents('descending');
    } else if (!seniorityOrderButton.classList.contains('btn-info') && !ascendingOrderButton.classList.contains('btn-info') && !descendingOrderButton.classList.contains('btn-info')) {
        displayAllStudents();
    }
}

const displaySortedStudents = (order) => {
    // const sortedStudentsArray = JSON.parse(localStorage.getItem('loggedStudents'));
    const loggedStudentsObject = JSON.parse(localStorage.getItem('loggedStudents'));
    const sortedStudentsArray = loggedStudentsObject.todos;
    if (order === 'ascending') {
        sortedStudentsArray.sort((a, b) => {
            if (a.promedio === null && b.promedio === null) return 0; // Both are equal
            if (a.promedio === null) return 1; // Null values come first
            if (b.promedio === null) return -1;  // Null values come second
            return a.promedio - b.promedio; // Compare numeric values
        });
    } else {
        sortedStudentsArray.sort((a, b) => {
            if (a.promedio === null && b.promedio === null) return 0; // Both are equal
            if (a.promedio === null) return 1; // Null values come last
            if (b.promedio === null) return -1;  // Null values come last
            return b.promedio - a.promedio; // Compare in descending order
        });
    }
    displayStudentsFromArray(sortedStudentsArray);
    removeSearchForms();
}

const displayStudentBySearch = (inputName, input) => {
    removeActiveButtonColors();
    let studentMatches = [];
    // const arrayOfStudents = JSON.parse(localStorage.getItem('loggedStudents'));
    const loggedStudentsObject = JSON.parse(localStorage.getItem('loggedStudents'));
    const arrayOfStudents = loggedStudentsObject.todos;
    const normalizedWords = input.value.normalize('NFD').toLowerCase();
    if (inputName === 'name') {
        if (input.value) {
            studentMatches = arrayOfStudents.filter(s => {
                const normalizedName = s.nombre.normalize('NFD').toLowerCase();
                return normalizedName.startsWith(normalizedWords);
            });
            if (studentMatches.length <= 0) {
                showInputAlert(alertNameNotFound);
            }
        } else {
            showInputAlert(alertNameNotFound);
        }
    } else if (inputName === 'last name') {
        if (input.value) {
            studentMatches = arrayOfStudents.filter(s => {
                const normalizedLastNames = s.apellidos.normalize('NFD').toLowerCase().split(' ');
                return normalizedLastNames.some(ln => ln.startsWith(normalizedWords)) || normalizedLastNames.join(' ').startsWith(normalizedWords);
            });
            if (studentMatches.length <= 0) {
                showInputAlert(alertLastNameNotFound);
            }
        } else {
            showInputAlert(alertLastNameNotFound);
        }
    } else {
        if (input.value) {
            const subjectButtonsArray = Array.from(subjectToAddButtons);
            if (subjectButtonsArray.some(b => b.textContent.normalize('NFD').toLowerCase().startsWith(input.value.normalize('NFD').toLowerCase()))) {
                studentMatches = arrayOfStudents.filter(s => {
                    return s.materias.some(m => {
                        const normalizedSubject = m.materia.normalize('NFD').toLowerCase();
                        return normalizedSubject.startsWith(normalizedWords);
                    });
                });
                if (studentMatches.length <= 0) {
                    const subjectMatchesButtonsArray = subjectButtonsArray.filter(b => b.textContent.normalize('NFD').toLowerCase().startsWith(input.value.normalize('NFD').toLowerCase()));
                    const subjectMatchesNamesArray = subjectMatchesButtonsArray.map(b => b.textContent);
                    showEmptySubjectAlert(...subjectMatchesNamesArray);
                }
            } else {
                showInputAlert(alertSubjectNotFound);
            }
        } else {
            showInputAlert(alertSubjectNotFound);
        }
    }
    input.value = '';
    displayStudentsFromArray(studentMatches);
}

const removeActiveButtonColors = () => {
    orderButtons.forEach(button => {
        if (button.classList.contains('btn-info')) {
            button.classList.remove('btn-info');
            button.classList.add('btn-primary');
        }
    });
}

const removeSearchForms = () => {
    searchForms.forEach(form => {
        if (!form.classList.contains('d-none')) {
            form.classList.add('d-none');
        }
    });
}

const showInputAlert = (alert) => {
    alert.classList.remove('d-none');
    setTimeout(() => {
        alert.classList.add('d-none');
    }, 2000);
}

const showEmptySubjectAlert = (...args) => {
    let htmlToAppend = '';
    if (args.length === 1) {
        htmlToAppend = `<div class='show-alert alert alert-danger'>Alumnos no encontrados para materia ${args[0]}</div>`;
    } else {
        htmlToAppend = `<div class='show-alert alert alert-danger'>Alumnos no encontrados para materias `;
        for (let i = 0; i < args.length; i++) {
            if (args[i] === args[args.length -2]) {
                htmlToAppend += `${args[i]} o `;
            } else if (args[i] === args[args.length -1]) {
                htmlToAppend += `${args[i]}</div>`;
            } else {
                htmlToAppend += `${args[i]}, `;
            }
        }
    }
    const alertContainer = document.createElement('div');
    alertContainer.innerHTML = htmlToAppend;
    searchSection.append(alertContainer);
    setTimeout(() => {
        alertContainer.parentNode.removeChild(alertContainer);
    }, 2000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', displayAllStudents);

studentsTable.addEventListener('click', e => {
    let studentId = null;
    if (e.target.dataset.id) {
        studentId = e.target.dataset.id;
    }
    if (e.target.classList.contains('add-subject-button')) {
        showAddSubjectSection(studentId);
    } else if (e.target.classList.contains('see-subjects-button')) {
        displaySubjects(studentId);
        showPopUp(seeSubjectsSection);
    } else if (e.target.classList.contains('assign-grades-button')) {
        displayAddGrades(studentId);
        showPopUp(assignGradesSection);
    } else if (e.target.classList.contains('see-grades-button')) {
        displayGrades(studentId);
        showPopUp(seeGradesSection);
    }
});

searchAndSortingSection.addEventListener('click', e => {
    if (e.target.classList.contains('nombre-button')) {
        toggleInput(nameSearchForm, lastNameSearchForm, subjectSearchForm);
    } else if (e.target.classList.contains('apellidos-button')) {
        toggleInput(lastNameSearchForm, nameSearchForm, subjectSearchForm);
    } else if (e.target.classList.contains('materia-button')) {
        toggleInput(subjectSearchForm, nameSearchForm, lastNameSearchForm);
    } else if (e.target.classList.contains('seniority-order-button')) {
        displayAllStudents();
        toggleSortingButtonColor(seniorityOrderButton, ascendingOrderButton, descendingOrderButton);
    } else if (e.target.classList.contains('ascending-order-button')) {
        displaySortedStudents('ascending');
        toggleSortingButtonColor(ascendingOrderButton, seniorityOrderButton, descendingOrderButton);
    } else if (e.target.classList.contains('descending-order-button')) {
        displaySortedStudents('descending');
        toggleSortingButtonColor(descendingOrderButton, seniorityOrderButton, ascendingOrderButton);
    }
});

nameSearchForm.addEventListener('submit', e => {
    e.preventDefault();
    displayStudentBySearch('name', nameSearchInput);
});

lastNameSearchForm.addEventListener('submit', e => {
    e.preventDefault();
    displayStudentBySearch('last name', lastNameSearchInput);
});

subjectSearchForm.addEventListener('submit', e => {
    e.preventDefault();
    displayStudentBySearch('subject', subjectSearchInput);
});


closeSubjectAddedBtn.addEventListener('click', () => {
    closePopUp(subjectAddedPopUp);
});

closeGradesAddedBtn.addEventListener('click', () => {
    closePopUp(gradesAddedPopUp);
});

closeSubjectsBtn.addEventListener('click', () => {
    closePopUp(seeSubjectsSection);
});

closeAssignGrades.addEventListener('click', () => {
    closePopUp(assignGradesSection);
});

closeGradesBtn.addEventListener('click', () => {
    closePopUp(seeGradesSection);
});