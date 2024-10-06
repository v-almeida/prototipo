// Função para obter inscrições do Local Storage
function getEnrolledCourses() {
    const courses = localStorage.getItem("enrolledCourses");
    return courses ? JSON.parse(courses) : [];
}

// Função para atualizar o Local Storage
function updateLocalStorage() {
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
}

// Variável para armazenar cursos inscritos
let enrolledCourses = getEnrolledCourses();

// Função para atualizar a lista de inscrições na página de inscrições
function updateSubscriptions() {
    const subscriptionsList = document.getElementById("subscriptions-list");
    subscriptionsList.innerHTML = ""; // Limpa a lista

    enrolledCourses.forEach(course => {
        const listItem = document.createElement("li");
        listItem.textContent = course;
        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancelar Inscrição";
        cancelButton.onclick = () => cancelEnrollment(course);
        listItem.appendChild(cancelButton);
        subscriptionsList.appendChild(listItem);
    });
}

// Função para inscrever-se em um curso
function enrollCourse(course) {
    if (!enrolledCourses.includes(course)) {
        enrolledCourses.push(course);
        updateLocalStorage(); // Atualiza o Local Storage
        alert(`Inscrito no ${course}!`);
        updateSubscriptions(); // Atualiza a lista de inscrições
    } else {
        alert(`Você já está inscrito no ${course}.`);
    }
}

// Função para cancelar a inscrição em um curso
function cancelEnrollment(course) {
    enrolledCourses = enrolledCourses.filter(c => c !== course);
    updateLocalStorage(); // Atualiza o Local Storage
    alert(`Inscrição cancelada no ${course}.`);
    updateSubscriptions(); // Atualiza a lista de inscrições
}

// Adiciona event listeners para os botões de inscrição
document.addEventListener("DOMContentLoaded", () => {
    const enrollButtons = document.querySelectorAll(".enroll-button");
    const cancelButtons = document.querySelectorAll(".cancel-button");

    enrollButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const course = e.target.closest(".course-item").dataset.course;
            enrollCourse(course);
            button.style.display = "none";
            e.target.nextElementSibling.style.display = "inline"; // Mostra o botão de cancelar
        });
    });

    cancelButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const course = e.target.closest(".course-item").dataset.course;
            cancelEnrollment(course);
            e.target.style.display = "none"; // Esconde o botão de cancelar
            e.target.previousElementSibling.style.display = "inline"; // Mostra o botão de inscrever
        });
    });

    // Atualiza as inscrições na página de inscrições
    if (document.getElementById("subscriptions-list")) {
        updateSubscriptions();
    }
});
