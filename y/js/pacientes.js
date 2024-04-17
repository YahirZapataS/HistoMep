import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
import { auth, db } from './firebaseConfig.js';

const listaPacientes = document.getElementById('listaPacientes');

async function mostrarPacientes() {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        listaPacientes.innerHTML = '';

        querySnapshot.forEach((doc) => {
            const paciente = doc.data();
            const listItem = document.createElement('li');
            listItem.textContent = `${paciente.name} ${paciente.lastName} ${paciente.secondLastName} ${paciente.IMP}`;
            listaPacientes.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error al recuperar la lista de pacientes', error);
    }
}

mostrarPacientes();