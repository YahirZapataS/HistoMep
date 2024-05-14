import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { auth } from './firebaseConfig.js';

export async function enviarCorreoRestablecimiento(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true, message: 'Correo Enviado! Revisa tu bandeja de entrada.' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'No se pudo restablecer la contraseña.' };
    }
}


import { enviarCorreoRestablecimiento } from 'js/resetPassword.js';

const resetForm = document.getElementById('resetForm');

resetForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = resetForm.email.value;
    const result = await enviarCorreoRestablecimiento(email);
    if (result.success) {
        Swal.fire({
            title: 'Éxito!',
            text: result.message
        });
    } else {
        Swal.fire({
            title: 'Error!',
            text: result.message
        });
    }
    resetForm.reset();
});

// Boton Cancelar
const btnCancel = document.getElementById('btn_cancelar');
btnCancel.addEventListener('click', async () => {
    window.location.replace('index.html');
});