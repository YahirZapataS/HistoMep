import { db } from './firebaseConfig.js';

const content = document.querySelector('.content');
const btnAgregar = document.querySelector('.btnAgregar');
const btnGuardar = document.querySelector('.btnGuardar');

function crearCampoMedicamento(event) {
    event.preventDefault();
    
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="medication">
            <input type="text" name="medicine" placeholder="Nombre Medicamento">
            <input type="text" name="dosis" placeholder="Dosis">
            <input type="number" name="period" placeholder="Periodo (Horas)">
            <input type="number" name="duration" placeholder="Duración (Días)">
            <button type="button" class="btnDelete">Eliminar Medicamento</button>
        </div>
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
        const inputs = medication.querySelectorAll('input');
        const medicine = inputs[0].value;
        const dosis = inputs[1].value;
        const periodo = parseInt(inputs[2].value);
        const duracion = parseInt(inputs[3].value);

        medicamentos.push({ medicine, dosis, periodo, duracion });
    });

    try {
        await db.collection('recetas').add({ medicamentos });
        console.log('Receta guardada con éxito');
    } catch (error) {
        console.log('Error al guardar la receta');
        Swal.fire({
            title: 'Error!',
            text: 'Receta no guardada. Intentelo de nuevo.'
        });
    }
});
