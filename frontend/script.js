const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value,
        semester: document.getElementById("semester").value
    };

    await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
    });

    form.reset();
    loadStudents();
});

async function loadStudents() {
    const res = await fetch("http://localhost:5000/students");
    const students = await res.json();

    table.innerHTML = "";
    students.forEach(s => {
        table.innerHTML += `
            <tr>
                <td>${s.name}</td>
                <td>${s.email}</td>
                <td>${s.course}</td>
                <td>${s.semester}</td>
            </tr>
        `;
    });
}

loadStudents();
