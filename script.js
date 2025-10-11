document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.querySelector('.login-container');
    const loginForm = document.getElementById('login-form');
    const taskContainer = document.querySelector('.container');
    const taskTableBody = document.getElementById('taskTable').querySelector('tbody');
    const addRowBtn = document.querySelector('.add-row-btn');

    // Lógica para la pantalla de inicio de sesión
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que el formulario se envíe

        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;

        // Aquí puedes definir tu usuario y contraseña, o una lógica más compleja
        if (usernameInput === 'admin' && passwordInput === '123') {
            loginContainer.classList.add('hidden');
            taskContainer.classList.remove('hidden');
            checkDates();
        } else {
            alert('Usuario o contraseña incorrectos.');
        }
    });

    // Lógica para la gestión de tareas (el mismo código de antes)
    function addRow() {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" class="input-text"></td>
            <td><input type="text" class="input-text"></td>
            <td><input type="date" class="input-text"></td>
            <td><input type="date" class="input-text date-input"></td>
            <td class="actions">
                <button class="change-date-btn">Cambiar fecha</button>
                <button class="delete-row-btn">Eliminar</button>
            </td>
        `;
        taskTableBody.appendChild(newRow);
        checkDates();
    }

    function checkDates() {
        const today = new Date().toISOString().slice(0, 10);
        const dateInputs = document.querySelectorAll('.date-input');

        dateInputs.forEach(input => {
            const row = input.closest('tr');
            if (input.value && input.value < today) {
                row.classList.add('expired');
            } else {
                row.classList.remove('expired');
            }
        });
    }
    
    taskTableBody.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        
        if (e.target.classList.contains('change-date-btn')) {
            const dateInput = row.querySelector('.date-input');
            const newDate = prompt("Introduce la nueva fecha de vencimiento (YYYY-MM-DD):", dateInput.value);
            if (newDate) {
                dateInput.value = newDate;
                checkDates();
            }
        }
        
        if (e.target.classList.contains('delete-row-btn')) {
            if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
                row.remove();
            }
        }
    });
    
    addRowBtn.addEventListener('click', addRow);
    
    taskTableBody.addEventListener('change', (e) => {
        if (e.target.classList.contains('date-input')) {
            checkDates();
        }
    });
});
