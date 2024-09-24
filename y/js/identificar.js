import { db } from './firebaseConfig.js';
import { getDocs, query, collection, where } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const buscarIMP = document.getElementById('btnBuscarIMP');
const inputIMP = document.getElementById('IMP');

buscarIMP.addEventListener('click', async () => {
    const imp = inputIMP.value;

    try {
        const querySnapshot = await getDocs(query(collection(db, 'patients'), where('IMP', '==', imp)));
        const pacienteInfoContainer = document.getElementById('pacienteInfo');
        pacienteInfoContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nueva información

        if (querySnapshot.empty) {
            console.log('No se encontró ningún paciente con el IMP proporcionado');
            pacienteInfoContainer.innerHTML = '<p>No se encontró ningún paciente.</p>';
            return;
        }

        querySnapshot.forEach((doc) => {
            const paciente = doc.data();
            console.log('Información del paciente: ', paciente);

            // Crear tarjeta del paciente
            const tarjetaPaciente = document.createElement('div');
            tarjetaPaciente.classList.add('tarjeta-paciente');

            const nombreCompleto = document.createElement('p');
            nombreCompleto.textContent = `Nombre: ${paciente.name} ${paciente.lastName} ${paciente.secondLastName}`;

            const fechaNacimiento = document.createElement('p');
            fechaNacimiento.textContent = `Fecha de nacimiento: ${paciente.birthday}`;

            tarjetaPaciente.appendChild(nombreCompleto);
            tarjetaPaciente.appendChild(fechaNacimiento);
            pacienteInfoContainer.appendChild(tarjetaPaciente);
        });
    } catch (error) {
        console.log('Error al buscar al paciente por IMP:', error);
    }
});