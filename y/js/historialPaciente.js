import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
import { db } from './firebaseConfig.js';

async function mostrarDetallePaciente() {
    // Obtener el IMP del paciente de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const pacienteID = urlParams.get('userId');

    try {
        const docSnap = await getDoc(doc(db, 'users', pacienteID));
        if (docSnap.exists()) {
            const pacienteData = docSnap.data();
            const pacienteInfoContainer = document.getElementById('pacienteInfo');

            const nombrePaciente = document.createElement('p');
            nombrePaciente.textContent = `Nombre: ${pacienteData.name} ${pacienteData.lastName} ${pacienteData.secondLastName}`;

            const nacimientoPaciente = document.createElement('p');
            nacimientoPaciente.textContent = `Fecha de nacimiento: ${pacienteData.birthday}`;

            const telefonoPaciente = document.createElement('p');
            telefonoPaciente.textContent = `Teléfono: ${pacienteData.phone}`;

            pacienteInfoContainer.appendChild(nombrePaciente);
            pacienteInfoContainer.appendChild(nacimientoPaciente);
            pacienteInfoContainer.appendChild(telefonoPaciente);
        } else {
            console.log('No se encontró información para el paciente con el ID proporcionado.');
        }
    } catch (error) {
        console.error('Error al obtener la información del paciente:', error);
    }
}

mostrarDetallePaciente();