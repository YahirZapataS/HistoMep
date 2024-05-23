import { db } from './firebaseConfig.js';
import { getDocs, query, collection, where } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';

// Obtener el ID del paciente de la URL
const urlParams = new URLSearchParams(window.location.search);
const pacienteId = urlParams.get('imp');
console.log(pacienteId);

const q = query(collection(db, 'patients'), where('IMP', '==', pacienteId));
const querySnapshot = await getDocs(q);


// Aquí se Muestran los detalles Personales
async function viewPersonalDetails() {
    try {
        const querySnapshot = await getDocs(q);

        const patientInfoContainer = document.getElementById('patientInfo');
        patientInfoContainer.innerHTML = '';

        querySnapshot.forEach((doc) => {
            const patient = doc.data();
            const patientInfo = document.createElement('div');
            patientInfo.classList.add('patientInformationCard');

            const namePatient = document.createElement('div');
            namePatient.textContent = `Nombre(s): ${patient.name}`;
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
        console.log('Error al obtener la información del paciente');
        Swal.fire({
            title: 'Error!',
            text: 'Error al obtener la información del paciente'
        });
    }
}

async function viewRelevantDetails() {
    try {
        const querySnapshot = await getDocs(q);

        const patientInfoContainer = document.getElementById('patientRelevant');
        patientInfoContainer.innerHTML = '';

        querySnapshot.forEach((doc) => {
            const patient = doc.data();
            const patientInfo = document.createElement('div');
            patientInfo.classList.add('patientInformationCard');

            const weightPatient = document.createElement('div');
            weightPatient.textContent = `Peso (KG): ${patient.weight}`;
            const heightPatient = document.createElement('div');
            heightPatient.textContent = `Estatura (CM): ${patient.height}`;
            const diabPatient = document.createElement('div');
            diabPatient.textContent = `Diabético: ${patient.optionD}`;
            const hiperPatient = document.createElement('div');
            hiperPatient.textContent = `Hipertenso: ${patient.optionH}`;

            patientInfo.appendChild(weightPatient);
            patientInfo.appendChild(heightPatient);
            patientInfo.appendChild(diabPatient);
            patientInfo.appendChild(hiperPatient);
            patientInfoContainer.appendChild(patientInfo);
        })
    } catch (error) {
        console.log("Error al obtener la información del paciente");
    }
}

viewPersonalDetails();
viewRelevantDetails();

// Btn Volver
const btnBack = document.getElementById('btnBack');
btnBack.addEventListener('click', async (e) => {
    e.preventDefault();

    window.location.replace('pacientes.html');
});