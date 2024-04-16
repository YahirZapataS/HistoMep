import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { db } from './firebaseConfig.js';


// Almacenamiento de Información de Usuarios
const formulario = document.getElementById('informationForm');
formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nombre = formulario.name.value;
    const apellido = formulario.lastname.value;
    const segundoApellido = formulario.secondlastname.value;
    const cedula = formulario.professionalID.value;
    const telefono = formulario.phone.value;
    const cumple = formulario.birthday.value;
    const nombreLugarTrabajo = formulario.nameplacework.value;
    const calle = formulario.street.value;
    const CP = formulario.postalcode.value;
    const colonia = formulario.colonia.value;
    const localidad = formulario.location.value;
    const ciudad = formulario.city.value;
    const estado = formulario.state.value;

    try {
        const docRef = await addDoc(collection(db, 'usuarios'), {
            nombre: nombre,
            apellido: apellido,
            segundoApellido: segundoApellido,
            cedula: cedula,
            telefono: telefono,
            cumple: cumple,
            nombreLugarTrabajo: nombreLugarTrabajo,
            calle: calle,
            CP: CP,
            colonia: colonia,
            localidad: localidad,
            ciudad: ciudad,
            estado: estado
        });
        console.log('Datos Almacenados con éxito', docRef.id);
        alert('Información Guardada con Éxito');
        window.location.replace('pacientes.html');
    } catch (error) {
        console.log('Error al almacenar', error);
    }
})

// Boton Cancelar
const btnCancel = document.getElementById('btn_cancelar');
btnCancel.addEventListener('click', async () => {
    window.location.replace('index.html');
});