// login.js
import { loginUser } from './firebaseAuth.js';

const btnLogin = document.getElementById('btn_login');
const password = document.getElementById('passwordLogin');
const showPasswordCheckbox = document.getElementById('showpassword');

showPasswordCheckbox.addEventListener('change', function () {
    if (this.checked) {
        password.type = 'text';
    } else {
        password.type = 'password';
    }
});

btnLogin.addEventListener('click', async () => {
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;

    try {
        const user = await loginUser(email, password);
        console.log('Usuario autenticado', user);
        window.location.replace("pacientes.html");
    } catch (error) {
        console.log("Error al iniciar sesión", error.message);
        Swal.fire({
            title: 'Error!',
            text: 'Correo o contraseña incorrectos. Intentelo de nuevo.'
        });
    }
});

const registerMed = document.getElementById('btn_RegisterDoc');
const registerPac = document.getElementById('btn_RegisterPac');
const resetPassword = document.getElementById('forgotpass');

registerMed.addEventListener('click', () => {
    window.location.replace('registroDoctor.html');
});

registerPac.addEventListener('click', () => {
    window.location.replace('registroPaciente.html');
});

resetPassword.addEventListener('click', () => {
    window.location.replace('recuperarContraseña.html');
});
