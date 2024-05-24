import { db } from './firebaseConfig.js';

const buscarIMP = document.getElementById('btnBuscarIMP');
const inputIMP = document.getElementById('IMP');

buscarIMP.addEventListener('click', async () => {
    const imp = inputIMP.value;

    try {
        const querySnapshot = await db.collection('patients').where('IMP', '==', imp).get();
        if (querySnapshot.empty) {
            console.log('No se encontró ningún paciente con el IMP proporcionado');
            return;
        }

        querySnapshot.forEach((doc) => {
            const paciente = doc.data();
            console.log('Información del paciente: ', paciente);

            const pacienteInfoContainer = document.getElementById('pacienteInfo');
            pacienteInfoContainer.innerHTML = '';

            const nombreCompleto = document.createElement('p');
            nombreCompleto.textContent = `Nombre: ${paciente.name} ${paciente.lastName} ${paciente.secondLastName}`;

            const fechaNacimiento = document.createElement('p');
            fechaNacimiento.textContent = `Fecha de nacimiento: ${paciente.birthday}`;

            pacienteInfoContainer.appendChild(nombreCompleto);
            pacienteInfoContainer.appendChild(fechaNacimiento);
        });
    } catch (error) {
        console.log('Error al buscar al paciente por IMP');
    }
});