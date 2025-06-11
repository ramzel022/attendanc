// --- CORE FUNCTIONS ---
function register() {
  const u = document.getElementById('reg-username').value.trim();
  const p = document.getElementById('reg-password').value;
  if (!u || !p) return alert('Fill in both fields');
  const users = JSON.parse(localStorage.getItem('users')) || {};
  if (users[u]) return alert('Username exists');
  users[u] = p;
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registered! Now log in.');
  document.getElementById('reg-username').value = '';
  document.getElementById('reg-password').value = '';
}

function login() {
  const u = document.getElementById('login-username').value.trim();
  const p = document.getElementById('login-password').value;
  const users = JSON.parse(localStorage.getItem('users')) || {};
  if (users[u] === p) {
    localStorage.setItem('currentUser', u);
    initUI();
    displayAttendance();
  } else {
    alert('Invalid credentials');
  }
}

function logout() {
  localStorage.removeItem('currentUser');
  initUI();
}

function markAttendance() {
  const u = localStorage.getItem('currentUser');
  if (!u) return alert('Log in first');
  const att = JSON.parse(localStorage.getItem('attendance')) || [];
  att.push({ user: u, time: new Date().toLocaleString() });
  localStorage.setItem('attendance', JSON.stringify(att));
  displayAttendance();
}

function eraseTodayAttendance() {
  const today = new Date().toLocaleDateString();
  let att = JSON.parse(localStorage.getItem('attendance')) || [];
  att = att.filter(e => new Date(e.time).toLocaleDateString() !== today);
  localStorage.setItem('attendance', JSON.stringify(att));
  displayAttendance();
}

function displayAttendance() {
  const att = JSON.parse(localStorage.getItem('attendance')) || [];
  const tbody = document.getElementById('attendance-list');
  tbody.innerHTML = '';
  att.forEach(e => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${e.user}</td><td>${e.time}</td>`;
    tbody.appendChild(tr);
  });
}

// --- UI TOGGLING ---
function initUI() {
  const isAuth = !!localStorage.getItem('currentUser');
  document.getElementById('register-form').style.display = isAuth ? 'none' : 'block';
  document.getElementById('login-form').style.display = isAuth ? 'none' : 'block';
  document.getElementById('attendance-section').style.display = isAuth ? 'block' : 'none';
}

// --- BOOTSTRAP ON PAGE LOAD ---
document.addEventListener('DOMContentLoaded', () => {
  // Clear session on every page load
  localStorage.removeItem('currentUser');

  // Hook buttons
  document.getElementById('btnRegister').onclick = register;
  document.getElementById('btnLogin').onclick = login;
  document.getElementById('btnLogout').onclick = logout;
  document.getElementById('btnMark').onclick = markAttendance;
  document.getElementById('btnErase').onclick = eraseTodayAttendance;

  // Initialize UI
  initUI();
});
