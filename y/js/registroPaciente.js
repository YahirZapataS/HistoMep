import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';
import { addDoc, collection } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
import { auth, db } from './firebaseConfig.js';


const form = document.getElementById('registroForm');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const showPasswordCheckbox = document.getElementById('showpassword');

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
    const opcionD = form.opcionD.value;
    const opcionH = form.opcionH.value;
    const weight = parseInt(form.weight.value);
    const height = parseInt(form.height.value);

    try {
        // Registrar un nuevo usuario con correo y contraseña
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const IMP = generarIMP(lastName, secondLastName, name);

        // Guardar datos del formulario en Firestore
        await saveFormDataToFirestore(email, name, lastName, secondLastName, phone, birthday, street, postalCode, colonia, location, city, state, emailExtra, user.uid, opcionD, opcionH, weight, height, IMP);

        alert('Usuario Guardado con Éxito');
        // Limpiar el formulario después del registro
        form.reset();

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Hubo un error al registrar el usuario. Por favor, inténtelo de nuevo.');
    }
});

async function saveFormDataToFirestore(email, name, lastName, secondLastName, phone, birthday, street, postalCode, colonia, location, city, state, emailExtra, userId, opcionD, opcionH, weight, height, IMP) {
    try {
        // Agregar un nuevo documento a la colección 'users' en Firestore
        await addDoc(collection(db, 'users'), {
            email: email,
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
            emailExtra: emailExtra,
            userId: userId,
            opcionD: opcionD,
            opcionH: opcionH,
            weight: weight,
            height: height,
            IMP: IMP
        });
        console.log('Datos del usuario guardados en Firestore');
    } catch (error) {
        console.error('Error al guardar datos del usuario en Firestore:', error);
        throw error;
    }
}

function generarIMP(apellidoPaterno, apellidoMaterno, nombre) {

    const primeraLetraApellidoPaterno = apellidoPaterno.charAt(0).toUpperCase();

    const primeraLetraApellidoMaterno = apellidoMaterno.charAt(0).toUpperCase();

    const dosPrimerasLetrasNombre = nombre.substring(0, 2).toUpperCase();

    const numeroAleatorio = Math.floor(Math.random() * 1000);
    const numeroConCeros = ('00' + numeroAleatorio).slice(-3);

    // Generar una letra aleatoria
    const letrasAleatorias = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letraAleatoria = letrasAleatorias.charAt(Math.floor(Math.random() * letrasAleatorias.length));

    // Concatenar todas las partes para formar el IMP
    const IMP = primeraLetraApellidoPaterno + primeraLetraApellidoMaterno + dosPrimerasLetrasNombre + numeroConCeros + letraAleatoria;

    return IMP;
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

// Boton Cancelar
const btnCancel = document.getElementById('btn_cancelar');
btnCancel.addEventListener('click', async () => {
    window.location.replace('index.html');
});