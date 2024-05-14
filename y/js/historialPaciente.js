import { db } from './firebaseConfig.js';
import { getDoc, doc  } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';

// Obtener el ID del paciente de la URL
const urlParams = new URLSearchParams(window.location.search);
const pacienteId = urlParams.get('idp');

// Llamar a la función para mostrar los datos del paciente
if (pacienteId) {
    mostrarDetallePaciente(pacienteId);
} else {
    console.log('No se proporcionó un ID de paciente válido en la URL.');
}

async function mostrarDetallePaciente(pacienteId) {
    try {
        const docSnap = await getDoc(doc(db, 'users', pacienteId));
        console.log(pacienteId);
        if (docSnap.exists()) {
            const pacienteData = docSnap.data().get();
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