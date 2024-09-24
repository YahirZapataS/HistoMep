import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { auth } from './firebaseConfig.js';

const btnLogin = document.getElementById('btn_login');

const password = document.getElementById('passwordLogin');
const showPasswordCheckbox = document.getElementById('showpassword');

btnLogin.addEventListener('click', async () => {

    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Usuario autenticado', userCredential.user);
        window.location.href = `dashboard.html?email=${email}`;
    } catch (error) {
        console.log("Error al iniciar sesión", error.messsage);
        showAlert('Error!', 'Usuario o contraseña incorrectos.',  'error');
    }
});

const registerMed = document.getElementById('btn_RegisterDoc');
const registerPac = document.getElementById('btn_RegisterPac');
const resetPassword = document.getElementById('forgotpass');

registerMed.addEventListener('click', async () => {
    window.location.replace('registroDoctor.html');
});

registerPac.addEventListener('click', async () => {
    window.location.replace('registroPaciente.html');
});

resetPassword.addEventListener('click', async () => {
    window.location.replace('recuperarContraseña.html')
});

showPasswordCheckbox.addEventListener('change', function () {
    if (this.checked) {
        password.type = 'text';
    } else {
        password.type = 'password';
    }
});

function showAlert(title, text, icon) {
    Swal.fire({
        title: title,
        text: text,
        icon:  icon
    });
}