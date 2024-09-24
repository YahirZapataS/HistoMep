import { db, auth, file } from './firebaseConfig.js';
import { getDoc, doc, addDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
import { ref, uploadBytes } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js';

const content = document.querySelector('.content');
const btnAgregar = document.querySelector('.btnAgregar');
const btnGuardar = document.querySelector('.btnGuardar');

function crearCampoMedicamento(event) {
    event.preventDefault();

    const div = document.createElement('div');
    div.classList.add('medication');
    div.innerHTML = `
        <input type="text" name="medicine" placeholder="Nombre Medicamento">
        <input type="text" name="dosis" placeholder="Dosis">
        <input type="text" name="period" placeholder="Periodo (Horas)">
        <input type="text" name="duration" placeholder="Duración (Días)">
        <button type="button" class="btnDelete">Eliminar Medicamento</button>
    `;
    content.appendChild(div);

    const deleteButton = div.querySelector('.btnDelete');
    deleteButton.addEventListener('click', () => {
        div.remove();
        Swal.fire({
            title: 'Medicamento Eliminado',
            icon: 'error'
        });
    });
}

btnAgregar.addEventListener('click', crearCampoMedicamento);

btnGuardar.addEventListener('click', async () => {
    const medicamentosInputs = content.querySelectorAll('.medication');
    const medicamentos = [];

    medicamentosInputs.forEach(medication => {
        const medicineInput = medication.querySelector('input[name="medicine"]');
        const dosisInput = medication.querySelector('input[name="dosis"]');
        const periodoInput = medication.querySelector('input[name="period"]');
        const duracionInput = medication.querySelector('input[name="duration"]');

        const medicine = medicineInput.value.trim();
        const dosis = dosisInput.value.trim();
        const periodo = periodoInput.value.trim();
        const duracion = duracionInput.value.trim();

        if (medicine && dosis && periodo && duracion) {
            medicamentos.push({ medicine, dosis, periodo, duracion });
        }
    });

    if (medicamentos.length === 0) {
        Swal.fire({
            title: 'Error!',
            text: 'No se han agregado medicamentos.',
            icon: 'error'
        });
        return;
    }

    try {
        const user = auth.currentUser;
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const doctorData = userDoc.data();
        const currentDate = new Date().toISOString().split('T')[0];

        // Obtener el ID más alto existente
        const recetasSnapshot = await getDocs(collection(db, 'recetas'));
        const ids = recetasSnapshot.docs.map(doc => parseInt(doc.id.split('_')[0])).filter(id => !isNaN(id));
        const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

        console.log(`Nuevo ID generado: ${newId}`); // Mensaje de depuración

        const docDefinition = {
            content: [
                { text: 'Receta Médica', style: 'header' },
                { text: `Doctor: Doctor`, style: 'subheader' },
                { text: `Dirección: Direccion`, style: 'subheader' },
                {
                    style: 'tableExample',
                    table: {
                        body: [
                            ['#', 'Medicamento', 'Dosis', 'Periodo (Horas)', 'Duración (Días)'],
                            ...medicamentos.map((med, index) => [
                                index + 1, med.medicine, med.dosis, med.periodo, med.duracion
                            ])
                        ]
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10]
                },
                subheader: {
                    fontSize: 14,
                    bold: true,
                    margin: [0, 10, 0, 5]
                },
                tableExample: {
                    margin: [0, 5, 0, 15]
                }
            }
        };

        pdfMake.createPdf(docDefinition).getBlob(async (blob) => {
            const storageRef = ref(file, `recetas/${newId}_${currentDate}.pdf`);
            await uploadBytes(storageRef, blob);
            console.log('PDF subido a Firebase Storage con éxito');

            await addDoc(collection(db, 'recetas'), {
                medicamentos,
                doctorId: user.uid,
                pdfUrl: `recetas/${newId}_${currentDate}.pdf`
            });

            showAlertWithRedirection('Listo!', 'Receta creada con éxito', 'success');
            content.innerHTML = '';
        });
    } catch (error) {
        console.error('Error al guardar la receta:', error);
        Swal.fire({
            title: 'Error!',
            text: 'Receta no guardada. Inténtelo de nuevo.',
            icon: 'error'
        });
    }
});



function showAlertWithRedirection(title, text, icon) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'recetas.html';
        }
    });
}