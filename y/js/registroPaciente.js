import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';
import { addDoc, collection } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
import { auth, db, file } from './firebaseConfig.js';
import { getDownloadURL, uploadBytes, ref } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js';


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

        const IMP = impGenerator(lastName, secondLastName, name);
        const idp = createID();
        const userRole = asginedRole();

        const qrImageURL = await generateQRCode(IMP);

        // Guardar datos del formulario en Firestore
        await saveFormDataToFirestore(email, name, lastName, secondLastName, phone, birthday, street, postalCode, colonia, location, city, state, emailExtra, user.uid, opcionD, opcionH, weight, height, IMP, idp, userRole, qrImageURL);

        Swal.fire({
            title: '¡Listo!',
            text: 'Usuario Registrado con Éxito!'
        });
        // Limpiar el formulario después del registro
        form.reset();

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Hubo un error al registrar el usuario. Por favor, inténtelo de nuevo.');
    }
});

async function saveFormDataToFirestore(email, name, lastName, secondLastName, phone, birthday, street, postalCode, colonia, location, city, state, emailExtra, userId, opcionD, opcionH, weight, height, IMP, idp, userRole, qrImageURL) {
    try {
        // Agregar un nuevo documento a la colección 'users' en Firestore
        await addDoc(collection(db, 'patients'), {
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
            IMP: IMP,
            idp: idp,
            userRole: userRole,
            qrImageURL: qrImageURL
        });
        console.log('Datos del usuario guardados en Firestore');
    } catch (error) {
        console.error('Error al guardar datos del usuario en Firestore:', error);
        throw error;
    }
}

function impGenerator(lastName, secondLastName, name) {

    const firstWordLastName = lastName.charAt(0).toUpperCase();

    const firstWordSecondLastName = secondLastName.charAt(0).toUpperCase();

    const twoWordsName = name.substring(0, 2).toUpperCase();

    const randomNumber = Math.floor(Math.random() * 1000);
    const numberWithZero = ('00' + randomNumber).slice(-3);

    // Generar una letra aleatoria
    const randomWords = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomWord = randomWords.charAt(Math.floor(Math.random() * randomWords.length));

    // Concatenar todas las partes para formar el IMP
    const IMP = firstWordLastName + firstWordSecondLastName + twoWordsName + numberWithZero + randomWord;

    return IMP;
}

async function generateQRCode(impValue) {
    const qrAPIURL = `https://quickchart.io/qr?text=${encodeURIComponent(impValue)}&size=300`;
    const response = await fetch(qrAPIURL);
    const blob = await response.blob();

    const storageRef = ref(file, `qrcodes/${impValue}.png`);
    await uploadBytes(storageRef, blob);
    const qrImageURL = await getDownloadURL(storageRef);
    return qrImageURL;
}

function createID() {
    const randomNum = Math.floor(Math.random() * 1000);
    return randomNum;
}

function asginedRole() {
    const roleUser = "patient";
    return roleUser;
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