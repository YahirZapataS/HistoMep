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