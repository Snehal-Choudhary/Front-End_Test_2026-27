// 1. Store marks of 5 students in an array of objects (matching expected output values)
const students = [
  { name: "Anita", maths: 85, science: 90, english: 81 },   // Total: 256 (85.33%)
  { name: "Rahul", maths: 62, science: 60, english: 65 },   // Total: 187 (62.33%)
  { name: "Meera", maths: 95, science: 96, english: 92 },   // Total: 283 (94.33%)
  { name: "Karthik", maths: 70, science: 32, english: 68 }, // Total: 170 (56.67%) - Fails (Science < 35)
  { name: "Sneha", maths: 78, science: 75, english: 81 }    // Total: 234 (78.00%)
];

// 2. Function getGrade(percent)
function getGrade(percent) {
  if (percent >= 90) return "A+";
  if (percent >= 75) return "A";
  if (percent >= 60) return "B";
  if (percent >= 50) return "C";
  return "D";
}

document.getElementById("generateBtn").addEventListener("click", () => {
  const resultSection = document.getElementById("resultSection");
  const resultBody = document.getElementById("resultBody");
  const summarySection = document.getElementById("summarySection");

  resultBody.innerHTML = "";
  let topper = { name: "", percent: -1 };
  let totalClassPercentage = 0;
  let passedCount = 0;

  students.forEach((student) => {
    const total = student.maths + student.science + student.english;
    const percentage = (total / 300) * 100;
    const formattedPercent = percentage.toFixed(2);
    const grade = getGrade(percentage);

    // 4. Pass only if every subject mark is 35 or above
    const isPassed = student.maths >= 35 && student.science >= 35 && student.english >= 35;
    const status = isPassed ? "Pass" : "Fail";

    if (isPassed) {
      passedCount++;
    }

    if (percentage > topper.percent) {
      topper = { name: student.name, percent: formattedPercent };
    }

    totalClassPercentage += percentage;

    // Create table row
    const row = document.createElement("tr");
    if (!isPassed) {
      row.classList.add("failed");
    }

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${total}</td>
      <td>${formattedPercent}%</td>
      <td>${grade}</td>
      <td>${status}</td>
    `;

    resultBody.appendChild(row);
  });

  // 5. Display summary below the table
  const classAverage = (totalClassPercentage / students.length).toFixed(2);
  summarySection.innerHTML = `
    <p><strong>Topper:</strong> ${topper.name} (${topper.percent}%)</p>
    <p><strong>Class average:</strong> ${classAverage}%</p>
    <p><strong>Passed:</strong> ${passedCount} of ${students.length} students</p>
  `;

  resultSection.classList.remove("hidden");
});