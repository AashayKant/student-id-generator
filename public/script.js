const form = document.getElementById("studentForm");
const preview = document.getElementById("cardPreview");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const response = await fetch("http://localhost:5000/addStudent", {
    method: "POST",
    body: formData
  });

  const data = await response.json();

  const imageFile = form.photo.files[0];
  const imageURL = URL.createObjectURL(imageFile);

  preview.innerHTML = `
    <div class="id-card">
      <img src="${imageURL}" />
      <h2>${form.name.value}</h2>
      <p><strong>ID:</strong> ${data.studentId}</p>
      <p><strong>Dept:</strong> ${form.department.value}</p>
      <p><strong>Year:</strong> ${form.year.value}</p>
      <p>${form.email.value}</p>
    </div>
  `;
});   // ✅ properly closed


// 🔍 Search Student
async function searchStudent() {
  const id = document.getElementById("searchId").value;

  const res = await fetch(`http://localhost:5000/student/${id}`);
  const data = await res.json();

  if (data.message) {
    alert("Student not found");
    return;
  }

  document.getElementById("searchResult").innerHTML = `
    <div class="id-card">
      <img src="http://localhost:5000/uploads/${data.photo}" />
      <h2>${data.name}</h2>
      <p><strong>ID:</strong> ${data.studentId}</p>
      <p><strong>Dept:</strong> ${data.department}</p>
      <p><strong>Year:</strong> ${data.year}</p>
      <p>${data.email}</p>

      <button onclick="deleteStudent('${data.studentId}')">Delete</button>
    </div>
  `;
}


// 🗑 Delete Student
async function deleteStudent(id) {
  await fetch(`http://localhost:5000/delete/${id}`, {
    method: "DELETE"
  });

  alert("Student Deleted");
  document.getElementById("searchResult").innerHTML = "";
}