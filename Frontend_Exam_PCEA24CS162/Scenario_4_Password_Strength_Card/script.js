const passwordInput = document.getElementById("passwordInput");
const showPasswordCheckbox = document.getElementById("showPassword");
const strengthBar = document.getElementById("strengthBar");
const strengthLabel = document.getElementById("strengthLabel");

// 2. Store rules as functions in an array using Regular Expressions
const rules = [
  { id: "rule-length", test: (pw) => pw.length >= 8 },
  { id: "rule-upper", test: (pw) => /[A-Z]/.test(pw) },
  { id: "rule-lower", test: (pw) => /[a-z]/.test(pw) },
  { id: "rule-number", test: (pw) => /[0-9]/.test(pw) },
  { id: "rule-special", test: (pw) => /[^A-Za-z0-9]/.test(pw) }
];

// 3 & 4. Live evaluation on every keystroke (input event)
passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  let passedCount = 0;

  rules.forEach((rule) => {
    const element = document.getElementById(rule.id);
    if (rule.test(password)) {
      element.classList.remove("unmet");
      element.classList.add("met");
      passedCount++;
    } else {
      element.classList.remove("met");
      element.classList.add("unmet");
    }
  });

  // Update strength bar and label
  if (password.length === 0) {
    strengthBar.style.width = "0%";
    strengthLabel.textContent = "";
  } else if (passedCount <= 2) {
    strengthBar.style.width = "33%";
    strengthBar.style.backgroundColor = "red";
    strengthLabel.textContent = "Weak";
    strengthLabel.style.color = "red";
  } else if (passedCount <= 4) {
    strengthBar.style.width = "66%";
    strengthBar.style.backgroundColor = "orange";
    strengthLabel.textContent = "Medium";
    strengthLabel.style.color = "orange";
  } else {
    strengthBar.style.width = "100%";
    strengthBar.style.backgroundColor = "green";
    strengthLabel.textContent = "Strong";
    strengthLabel.style.color = "green";
  }
});

// 5. Toggle password visibility
showPasswordCheckbox.addEventListener("change", () => {
  passwordInput.type = showPasswordCheckbox.checked ? "text" : "password";
});