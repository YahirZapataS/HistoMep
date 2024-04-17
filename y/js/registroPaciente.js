import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';
import { addDoc, collection } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
import { auth, db } from './firebaseConfig.js'; // Asegúrate de importar correctamente tu configuración de Firebase


const form = document.getElementById('registroForm');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const showPasswordCheckbox = document.getElementById('showpassword');
const apPaterno = document.getElementById('lastname');
const apMaterno = document.getElementById('secondlastname');
const nombre = document.getElementById('name');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener los valores del formulario
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    const lastName = form.lastname.value;
    const secondLastName = form.secondlastname.value;
    const phone = form.phone.value;
    const birthday = form.birthday.value;
    const street = form.street.value;
    const postalCode = form.postalcode.value;
    const colonia = form.colonia.value;
    const location = form.location.value;
    const city = form.city.value;
    const state = form.state.value;
    const emailExtra = form.emailExtra.value;

    try {
        // Registrar un nuevo usuario con correo y contraseña
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const IMP = generarIMP(lastName, secondLastName, name);

        // Guardar datos del formulario en Firestore
        await saveFormDataToFirestore(name, lastName, secondLastName, phone, birthday, street, postalCode, colonia, location, city, state, emailExtra, user.uid);

        // Limpiar el formulario después del registro
        form.reset();

        // Redirigir al usuario a una página de éxito
        window.location.href = 'viewIMP.html';
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Hubo un error al registrar el usuario. Por favor, inténtelo de nuevo.');
    }
});

async function saveFormDataToFirestore(name, lastName, secondLastName, phone, birthday, street, postalCode, colonia, location, city, state, emailExtra, userId) {
    try {
        // Agregar un nuevo documento a la colección 'users' en Firestore
        await addDoc(collection(db, 'users'), {
            name: name,
            lastName: lastName,
            secondLastName: secondLastName,
            phone: phone,
            birthday: birthday,
            street: street,
            postalCode: postalCode,
            colonia: colonia,
            location: location,
            city: city,
            state: state,
            userId: userId,
            IMP: IMP
        });
        console.log('Datos del usuario guardados en Firestore');
    } catch (error) {
        console.error('Error al guardar datos del usuario en Firestore:', error);
        throw error;
    }
}


showPasswordCheckbox.addEventListener('change', function () {
    if (this.checked) {
        passwordInput.type = 'text';
        confirmPasswordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
        confirmPasswordInput.type = 'password';
    }
});

function generarIMP(apPaterno, apMaterno, nombre){
    const firsWordLastName = apPaterno.charAt(0);
    const firstWordSecondLastName = apMaterno.charAt(0);
    const twoWordsName = nombre.substring(0, 2);

    const numRegister = obtenerNumeroRegistro();
    const randomWord = generarLetraAleatoria();

    const IMP = `${firsWordLastName}${firstWordSecondLastName}${twoWordsName}${numRegister}${randomWord}`;
    return IMP;
}

// Contador
let contadorRegistro = 0;
function obtenerNumeroRegistro() {
    contadorRegistro++;
    return contadorRegistro.toString().padStart(3, '0');
}

// Generar letra aleatoria
function generarLetraAleatoria() {
    const words = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const ind = Math.floor(Math.random() * words.length);
    return words.charAt(ind);
}

// Boton Cancelar
const btnCancel = document.getElementById('btn_cancelar');
btnCancel.addEventListener('click', async () => {
    window.location.replace('index.html');
});