import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { auth } from './firebaseConfig.js';



// Registro por Correo y Contraseña
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const showPasswordCheckbox = document.getElementById('showpassword');
const btnSiguiente = document.getElementById('btn_siguiente');

showPasswordCheckbox.addEventListener('change', function() {
    if(this.checked) {
        passwordInput.type = 'text';
        confirmPasswordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
        confirmPasswordInput.type = 'password';
    }
});

btnSiguiente.addEventListener('click', async (e) => {
    e.preventDefault()

    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if(password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('Usuario Registrado: ', user.uid);
        window.location.replace("formulario.html");
    } catch (error) {
        console.log('Error al registrar usuario: ');
        alert("Error al registrar, intentelo de nuevo");
    }
})

const btnCancel = document.getElementById('btn_cancelar');

btnCancel.addEventListener('click', async () => {
    window.location.replace('index.html')
});