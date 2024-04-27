import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
import { db } from './firebaseConfig.js';

/*async function mostrarDetallePaciente() {
    // Obtener el IMP del paciente de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const pacienteID = urlParams.get('userid');
    console.log('ID del paciente', pacienteID);

    try {
        const docSnap = await getDoc(doc(db, 'users', pacienteID));
        if (docSnap.exists()) {
            const pacienteData = docSnap.data();
            const pacienteInfoContainer = document.getElementById('pacienteInfo');


            const nombrePaciente = document.createElement('p');
            nombrePaciente.textContent = `Nombre: ${pacienteData.name} ${pacienteData.lastName} ${pacienteData.secondLastName}`;
            nombrePaciente.classList.add('nombre_Paciente');

            const nacimientoPaciente = document.createElement('p');
            nacimientoPaciente.textContent = `Fecha de nacimiento: ${pacienteData.birthday}`;
            nacimientoPaciente.classList.add('nacimiento_Paciente');

            const telefonoPaciente = document.createElement('p');
            telefonoPaciente.textContent = `Teléfono: ${pacienteData.phone}`;
            telefonoPaciente.classList.add('telefono_Paciente');

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

mostrarDetallePaciente();*/

function obtenerID() {
    const parametrosURL = new URLSearchParams(window.location.search);
    return parametrosURL.get('imp');
}

async function obtenerInfoPaciente(pacienteID) {
    try {
        const docRef = doc(db, 'users', pacienteID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const pacienteData = docSnap.data();
            console.log('Datos del paciente: ', pacienteData);

            const nombre_Paciente = document.createElement('p');
            nombre_Paciente.textContent = `${pacienteData.name} ${pacienteData.lastName} ${pacienteData.secondLastName}`;
            nombre_Paciente.classList.add('nombre_Paciente');
        } else {
            console.log('No se encontró el paciente con el ID proporcionado');
        }
    } catch (error) {
        console.log('Error al obtener la informacion del paciente');
    }
}

const pacienteID = obtenerID();

if(pacienteID) {
    obtenerInfoPaciente(pacienteID);
} else {
    console.log('No se proporciono un ID de paciente');
}