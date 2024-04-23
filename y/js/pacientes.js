import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
import { db } from './firebaseConfig.js';

async function mostrarPacientes() {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const pacientesContainer = document.getElementById('listaPacientes');
        pacientesContainer.innerHTML = '';

        querySnapshot.forEach((doc) => {
            const paciente = doc.data();
            const pacienteCard = document.createElement('div');
            pacienteCard.classList.add('pacienteCard');

            const nombrePaciente = document.createElement('div');
            nombrePaciente.textContent = `${paciente.name} ${paciente.lastName} ${paciente.secondLastName}`;
            nombrePaciente.classList.add('nombre_Paciente');

            const botonAbrirHistorial = document.createElement('button');
            botonAbrirHistorial.textContent = 'Abrir';
            botonAbrirHistorial.classList.add('btnAbrirHist');
            botonAbrirHistorial.addEventListener('click', async () => {
                window.location.href = `historialPaciente.html?userId=${paciente.userId}`;
            });

            pacienteCard.appendChild(nombrePaciente);
            pacienteCard.appendChild(botonAbrirHistorial);
            pacientesContainer.appendChild(pacienteCard);
        });
    } catch (error) {
        console.error('Error al recuperar la lista de pacientes', error);
    }
}

mostrarPacientes();
