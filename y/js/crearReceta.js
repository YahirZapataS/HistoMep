import { db, auth } from './firebaseConfig.js';
import { getDoc, doc, addDoc, collection } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
import { jsPDF } from 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js';
import { autoTable } from 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.24/jspdf.plugin.autotable.min.js';

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
            title: 'Medicamento Eliminado'
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
        const doctorName = `${doctorData.name} ${doctorData.lastName}`;
        const doctorAddress = doctorData.address;

        const pdf = new jsPDF();
        pdf.setFontSize(16);
        pdf.text(`Receta Médica`, 20, 20);
        pdf.setFontSize(12);
        pdf.text(`Doctor: ${doctorName}`, 20, 30);
        pdf.text(`Dirección: ${doctorAddress}`, 20, 40);

        const tableData = medicamentos.map((med, index) => [
            index + 1, med.medicine, med.dosis, med.periodo, med.duracion
        ]);

        pdf.autoTable({
            head: [['#', 'Medicamento', 'Dosis', 'Periodo (Horas)', 'Duración (Días)']],
            body: tableData,
            startY: 50
        });

        pdf.save('receta.pdf');

        await addDoc(collection(db, 'recetas'), { medicamentos, doctorId: user.uid });
        Swal.fire({
            title: 'Éxito!',
            text: 'Receta guardada con éxito.',
            icon: 'success'
        });
        content.innerHTML = ''; // Limpiar la lista de medicamentos después de guardar
    } catch (error) {
        console.error('Error al guardar la receta:', error);
        Swal.fire({
            title: 'Error!',
            text: 'Receta no guardada. Intentelo de nuevo.',
            icon: 'error'
        });
    }
});
