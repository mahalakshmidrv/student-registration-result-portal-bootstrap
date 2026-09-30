const form = document.getElementById("studentForm");
const resultSection = document.querySelector(".result-card");
const message = document.getElementById("message");

const subjects = [
  { name: "HTML5", id: "htmlMark" },
  { name: "CSS3", id: "cssMark" },
  { name: "JavaScript", id: "jsMark" },
  { name: "Database", id: "dbMark" }
];

function gradeFor(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";
  return "F";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  const marks = subjects.map(subject => ({
    name: subject.name,
    mark: Number(data.get(subject.id))
  }));

  const total = marks.reduce((sum, item) => sum + item.mark, 0);
  const percentage = total / marks.length;
  const passed = marks.every(item => item.mark >= 40);
  const grade = passed ? gradeFor(percentage) : "F";

  document.getElementById("outName").textContent = data.get("name");
  document.getElementById("outRoll").textContent = data.get("roll");
  document.getElementById("outEmail").textContent = data.get("email");
  document.getElementById("outPhone").textContent = data.get("phone");
  document.getElementById("outDob").textContent = data.get("dob");
  document.getElementById("outCourse").textContent = data.get("course");

  document.getElementById("resultBody").innerHTML = marks.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>${item.mark}</td>
      <td class="${item.mark >= 40 ? "status-pass" : "status-fail"}">
        ${item.mark >= 40 ? "Pass" : "Fail"}
      </td>
    </tr>
  `).join("");

  document.getElementById("outTotal").textContent = `${total} / 400`;
  document.getElementById("outPercentage").textContent = `${percentage.toFixed(2)}%`;
  document.getElementById("summaryPercentage").textContent = `${percentage.toFixed(2)}%`;
  document.getElementById("summaryGrade").textContent = grade;
  document.getElementById("summaryResult").textContent = passed ? "PASS" : "FAIL";

  resultSection.classList.remove("hidden");
  message.textContent = "Student registration completed successfully.";
  message.style.display = "block";
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("resetBtn").addEventListener("click", function () {
  resultSection.classList.add("hidden");
  message.style.display = "none";
});
