import { file } from './firebaseConfig.js';
import { ref, listAll, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js';
import { auth } from "./firebaseConfig.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// Verificar el estado de la autenticación al cargar la página
onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('Usuario autenticado:', user.email);
      // Aquí puedes mostrar la información del usuario en la página, si lo necesitas.
    } else {
      // Si no hay sesión activa, redirige al usuario a la página de inicio de sesión
      window.location.href = 'login.html';
    }
  });

async function mostrarRecetas() {
    try {
        const recetasList = document.querySelector('.recetasList');

        if (!recetasList) {
            throw new Error('No se encontró el elemento recetasList en el DOM.');
        }

        const storageRef = ref(file, 'recetas');

        const listResult = await listAll(storageRef);

        // Ordenar por fecha extraída del nombre del archivo
        const sortedItems = listResult.items.sort((a, b) => {
            // Extraer la fecha del nombre
            const dateA = extractDate(a.name);
            const dateB = extractDate(b.name);

            // Comparar las fechas para ordenar
            return dateB - dateA; // Ordenar de más reciente a más vieja
        });

        await Promise.all(sortedItems.map(async (itemRef, index) => {
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
            <button id="openReceta"><a target="_blank" href="${pdfUrl}">Abrir Receta</a></button>
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

// Función para extraer la fecha del nombre del archivo
function extractDate(fileName) {
    // Suponiendo que el formato del nombre es 'receta-YYYY-MM-DD.pdf'
    const dateString = fileName.match(/(\d{4}-\d{2}-\d{2})/);
    return dateString ? new Date(dateString[0]) : new Date(0); // Retorna una fecha mínima si no se encuentra
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
