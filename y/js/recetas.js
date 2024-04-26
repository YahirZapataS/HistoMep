import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'
import { db } from './firebaseConfig.js';

async function mostrarInfoUsuario() {
    try {

        const docSnap = await getDoc(doc(db, 'users', userId));

        if(docSnap.exists()) {
            const userData = docSnap.data();

            const nombreUsuario = document.querySelector('.name');
            nombreUsuario.textContent = `Nombre: ${userData.name} ${userData.lastName} ${userData.secondLastName}`;
            
            const impUsuario = document.querySelector('.IMP');
            impUsuario.textContent = `IMP: ${userData.IMP}`;
        } else {
            console.log('No se encontró información para el usuario con el ID proporcionado');
        }
    } catch (error) {
        console.error('Error al obtener la información del usuario');
    }
}

document.addEventListener('DOMContentLoaded', mostrarInfoUsuario);

const btnCrearReceta = document.getElementById('btnCrearReceta');
btnCrearReceta.addEventListener('click', async () => {
    window.location.replace('crearReceta.html');
});