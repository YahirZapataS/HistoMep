import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getDocs, query, collection, where } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";


async function viewInfoDoctor(doctorEmail) {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const doctorEmail = urlParams.get('email');
        console.log(doctorEmail);
        const q = query(collection(db, 'doctors'), where('email', "==", doctorEmail));
        const querySnapshot = await getDocs(q);

        const doctorInfoContainer = document.getElementById('doctorInfoContainer');

        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                const doctor = doc.data();
                const doctorInfo = document.createElement('div');
                doctorInfo.classList.add('doctorInfo');

                const doctorName = document.createElement('div');
                doctorName.textContent = `Dr. ${doctor.name} ${doctor.lastName} ${doctor.secondLastName}`;
                const doctorPlaceWork = document.createElement('div');
                doctorPlaceWork.textContent = `Lugar de trabajo: ${doctor.namePlaceWork}`;
                const doctorProfessID = document.createElement('div');
                doctorProfessID.textContent = `Cédula: ${doctor.professionalID}`;

                doctorInfo.appendChild(doctorName);
                doctorInfo.appendChild(doctorPlaceWork);
                doctorInfo.appendChild(doctorProfessID);

                doctorInfoContainer.appendChild(doctorInfo);
            });
        } else {
            doctorInfoContainer.innerHTML = '<p>No se encontró la información del doctor.</p>';
        }
    } catch (error) {
        console.log('Error al obtener la información del doctor:', error);
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        const doctorEmail = user.email;
        viewInfoDoctor(doctorEmail);
    } else {
        window.location.replace('index.html');
    }
});

const btnLogout = document.getElementById('btnLogout');
btnLogout.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.replace('index.html');
    }).catch((error) => {
        console.log('Error al cerrar sesión', error);
    });
});
