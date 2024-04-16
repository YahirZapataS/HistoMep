import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { auth } from './firebaseConfig.js';

const resetForm = document.getElementById('resetForm');
const messageText = document.getElementById('message');

resetForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = resetForm.email.value;

    try {
        await sendPasswordResetEmail(auth, email);

        messageText.textContent = 'Se ha enviado un correo de restablecimiento de contraseña. Revise su bandeja de entrada';
        messageText.style.color = 'green';

        window.location.replace('login.html')
    } catch (error) {
        console.error(error);
        messageText.textContent = 'Ha ocurrido un error al intentar restablecer la contraseña. Por favor, intenta de nuevo más tarde.';
        messageText.style.color = 'red';
    }

    resetForm.reset();
});


// Boton Cancelar
const btnCancel = document.getElementById('btn_cancelar');
btnCancel.addEventListener('click', async () => {
    window.location.replace('index.html');
});