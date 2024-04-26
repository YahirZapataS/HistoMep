import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { auth } from './firebaseConfig.js';

const resetForm = document.getElementById('resetForm');

resetForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = resetForm.email.value;

    try {
        await sendPasswordResetEmail(auth, email);

        Swal.fire({
            title: 'Correo Enviado!',
            text: 'Revisa tu bandeja de entrada.'
        });
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: 'Error!',
            text: 'No se pudo restablecer la contraseña.'
        });
    }

    resetForm.reset();
});


// Boton Cancelar
const btnCancel = document.getElementById('btn_cancelar');
btnCancel.addEventListener('click', async () => {
    window.location.replace('index.html');
});