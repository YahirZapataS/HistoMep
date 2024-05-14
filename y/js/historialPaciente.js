import { db } from './firebaseConfig.js';
import { getDocs, query, collection, where } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';

// Obtener el ID del paciente de la URL
const urlParams = new URLSearchParams(window.location.search);
const pacienteId = urlParams.get('imp');
console.log(pacienteId);

async function mostrarDetallePaciente() {
    try {
        const q = query(collection(db, 'users'), where('IMP', '==', pacienteId));
        const querySnapshot = await getDocs(q);

        const patientInfoContainer = document.getElementById('pacienteInfo');
        patientInfoContainer.innerHTML = '';

        querySnapshot.forEach((doc) => {
            const patient = doc.data();
            const patientInfo = document.createElement('div');
            patientInfo.classList.add('patienteInformationCard');

            const namePatient = document.createElement('div');
            namePatient.textContent =  `Nombre(s): ${patient.name}`;
            const lastNamePatient = document.createElement('div');
            lastNamePatient.textContent = `Apellido Paterno: ${patient.lastName}`;
            const secondLastNamePatient = document.createElement('div');
            secondLastNamePatient.textContent = `Apellido Materno: ${patient.secondLastName}`;

            const impPatient = document.createElement('div');
            impPatient.textContent = `IMP: ${patient.IMP}`;
            impPatient.classList.add('impPatient');

            const moreInfoPatient = document.createElement('div');
            moreInfoPatient.textContent = `Fecha de Nacimiento: ${patient.birthday}`;

            patientInfo.appendChild(namePatient);
            patientInfo.appendChild(lastNamePatient);
            patientInfo.appendChild(secondLastNamePatient);
            patientInfo.appendChild(impPatient);
            patientInfo.appendChild(moreInfoPatient);
            patientInfoContainer.appendChild(patientInfo);
        })
    } catch (error) {
        console.log('Error al obtener la información del paciente')
    }
}

mostrarDetallePaciente();

// Btn Volver
const btnBack = document.getElementById('btnBack');
btnBack.addEventListener('click', async (e) => {
    e.preventDefault();

    window.location.replace('pacientes.html');
})