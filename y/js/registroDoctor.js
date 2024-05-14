import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';
import { addDoc, collection } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
import { auth, db } from './firebaseConfig.js';

const form = document.getElementById('registroForm');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const showPasswordCheckbox = document.getElementById('showpassword');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    const lastName = form.lastname.value;
    const secondLastName = form.secondlastname.value;
    const professionalID = form.profesionalID.value;
    const phone = form.phone.value;
    const birthday = form.birthday.value;
    const namePlaceWork = form.nameplacework.value;
    const street = form.street.value;
    const postalCode = form.postalcode.value;
    const colonia = form.colonia.value;
    const location = form.location.value;
    const city = form.city.value;
    const state = form.state.value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userRole = asginedRole();

        await saveFormDataToFirestore(email, name, lastName, secondLastName, professionalID, phone, birthday, namePlaceWork, street, postalCode, colonia, location, city, state, userRole, user.uid);

        form.reset();

        Swal.fire({
            title: 'Listo!',
            text: 'Usuario registrado con éxito'
        });

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        Swal.fire({
            title: 'Error!',
            text: 'El usuario no pudo ser registrado. Intentelo de nuevo.'
        });
    }
});

// Agregar un nuevo documento a la colección 'users' en Firestore
async function saveFormDataToFirestore(email, name, lastName, secondLastName, professionalID, phone, birthday, namePlaceWork, street, postalCode, colonia, location, city, state, userRole, userId) {
    try {
        
        await addDoc(collection(db, 'doctors'), {
            email: email,
            name: name,
            lastName: lastName,
            secondLastName: secondLastName,
            professionalID: professionalID,
            phone: phone,
            birthday: birthday,
            namePlaceWork: namePlaceWork,
            street: street,
            postalCode: postalCode,
            colonia: colonia,
            location: location,
            city: city,
            state: state,
            userRole: userRole,
            userId: userId
        });
        console.log('Datos del usuario guardados en Firestore');
    } catch (error) {
        console.error('Error al guardar datos del usuario en Firestore:', error);
        throw error;
    }
}

function asginedRole() {
    const roleUser = "doctor";
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