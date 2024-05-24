import { file } from './firebaseConfig.js';
import { ref, listAll, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js';

async function mostrarRecetas() {
    try {
        const recetasList = document.querySelector('.recetasList');

        if (!recetasList) {
            throw new Error('No se encontró el elemento recetasList en el DOM.');
        }

        const storageRef = ref(file, 'recetas');

        const listResult = await listAll(storageRef);

        await Promise.all(listResult.items.map(async (itemRef, index) => {
            const pdfUrl = await getDownloadURL(itemRef);
            const fileName = itemRef.name;

            const recetaRow = document.createElement('tr');
            recetaRow.innerHTML = `
                <th>Receta N°</th>
                <th>Receta Electrónica</th>
            `;
            const recetaContainerRow = document.createElement('tr');
            recetaContainerRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${fileName}</td>
            <button id="openReceta"><a href="${pdfUrl}">Abrir Receta</a></button>
            `;

            recetasList.appendChild(recetaRow);
            recetasList.appendChild(recetaContainerRow);
        }));

        if (listResult.items.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = '<td colspan="2">No se encontraron recetas.</td>';
            recetasList.appendChild(emptyRow);
        }
    } catch (error) {
        console.error('Error al obtener las recetas desde Firebase Storage:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarRecetas();

    const btnCrearReceta = document.getElementById('btnCrearReceta');
    if (btnCrearReceta) {
        btnCrearReceta.addEventListener('click', () => {
            window.location.replace('crearReceta.html');
        });
    } else {
        console.error('El botón btnCrearReceta no se encontró en el DOM.');
    }
});
