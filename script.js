var API_ENDPOINT = "YOUR_API_GATEWAY_URL"; // <-- replace

// Keep original behavior
function clearErrors() {
  document
    .querySelectorAll("input")
    .forEach((i) => i.classList.remove("error"));
  document.querySelectorAll(".error-text").forEach((e) => (e.innerText = ""));
  document.getElementById("successMsg").style.display = "none";
}

/* -----------------------------------------------------------
   POST FUNCTION (VALIDATION UNTOUCHED)
----------------------------------------------------------- */
async function saveEmployee() {
  clearErrors();

  let id = document.getElementById("empId").value.trim();
  let name = document.getElementById("empName").value.trim();
  let dept = document.getElementById("empDept").value.trim();
  let salary = document.getElementById("empSalary").value.trim();

  let valid = true;

  // ---- ORIGINAL VALIDATIONS (UNTOUCHED) ----
  // Allow letters + numbers for ID
  if (!/^[A-Za-z0-9]+$/.test(id)) {
    document.getElementById("empId").classList.add("error");
    document.getElementById("errId").innerText =
      "ID must be letters or numbers (no spaces).";
    valid = false;
  }

  if (!/^[A-Za-z ]+$/.test(name)) {
    document.getElementById("empName").classList.add("error");
    document.getElementById("errName").innerText = "Letters only.";
    valid = false;
  }
  if (!/^[A-Za-z ]+$/.test(dept)) {
    document.getElementById("empDept").classList.add("error");
    document.getElementById("errDept").innerText = "Letters only.";
    valid = false;
  }
  if (!/^[0-9]+$/.test(salary)) {
    document.getElementById("empSalary").classList.add("error");
    document.getElementById("errSalary").innerText = "Numbers only.";
    valid = false;
  }

  if (!valid) return;

  // Payload for Lambda
  let payload = {
    employeeid: id,
    name: name,
    department: dept,
    salary: salary,
  };

  try {
    await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    document.getElementById("successMsg").style.display = "block";
    setTimeout(() => {
      document.getElementById("successMsg").style.display = "none";
    }, 3000);
  } catch (err) {
    alert("API Error: " + err);
  }
}

/* -----------------------------------------------------------
   GET FUNCTION – fetch all employees
----------------------------------------------------------- */
async function loadEmployees() {
  try {
    const res = await fetch(API_ENDPOINT);
    const data = await res.json();

    let table = document.querySelector("#empTable tbody");
    let msg = document.getElementById("emptyMsg");

    table.innerHTML = "";

    if (data.length === 0) {
      msg.style.display = "block";
      return;
    }

    msg.style.display = "none";

    data.forEach((emp) => {
      table.innerHTML += `
                <tr>
                    <td>${emp.employeeid}</td>
                    <td>${emp.name}</td>
                    <td>${emp.department}</td>
                    <td>${emp.salary}</td>
                </tr>`;
    });
  } catch (err) {
    alert("Fetch error: " + err);
  }
}
