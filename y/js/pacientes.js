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

            const nombrePacienteyIMP = document.createElement('div');
            nombrePacienteyIMP.textContent = `${paciente.name} ${paciente.lastName} ${paciente.secondLastName} ${paciente.IMP}`;
            nombrePacienteyIMP.classList.add('nombre_Paciente');

            const botonAbrirHistorial = document.createElement('button');
            botonAbrirHistorial.textContent = 'Abrir';
            botonAbrirHistorial.classList.add('btnAbrirHist');
            botonAbrirHistorial.addEventListener('click', async () => {
                console.log('ID del paciente', paciente.IMP);
                window.location.href = `historialPaciente.html?imp=${paciente.IMP}`;
            });

            const botonAbrirReceta = document.createElement('button');
            botonAbrirReceta.textContent = 'Ver Recetas';
            botonAbrirReceta.classList.add('btnAbrirRec');
            botonAbrirReceta.addEventListener('click', async () => {
                window.location.href = 'crearReceta.html';
            });

            pacienteCard.appendChild(nombrePacienteyIMP);
            pacienteCard.appendChild(botonAbrirHistorial);
            pacienteCard.appendChild(botonAbrirReceta);
            pacientesContainer.appendChild(pacienteCard);
        });
    } catch (error) {
        console.error('Error al recuperar la lista de pacientes', error);
    }
}

mostrarPacientes();