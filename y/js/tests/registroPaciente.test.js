// Importar la función que se va a probar
import { saveFormDataToFirestore, generarIMP, createID, asginedRole } from 'js/registroPaciente.js';

// Mock de Firebase
jest.mock('./firebaseConfig.js', () => ({
    db: {
        collection: jest.fn().mockReturnValue({
            add: jest.fn().mockResolvedValue()
        })
    }
}));

describe('saveFormDataToFirestore', () => {
    it('debería guardar los datos del usuario en Firestore', async () => {
        // Definir los datos del usuario
        const userData = {
            email: 'usuario@example.com',
            name: 'John',
            lastName: 'Doe',
            secondLastName: 'Smith',
            phone: '123456789',
            birthday: '01/01/1990',
            street: 'Street 123',
            postalCode: '12345',
            colonia: 'Colonia',
            location: 'Location',
            city: 'City',
            state: 'State',
            emailExtra: 'extra@example.com',
            userId: '123456789',
            opcionD: 'Opción D',
            opcionH: 'Opción H',
            weight: 70,
            height: 180,
            IMP: 'JD01R123X',
            idp: 123,
            userRole: 'patient'
        };

        // Llamar a la función que se va a probar
        await saveFormDataToFirestore(
            userData.email, userData.name, userData.lastName, userData.secondLastName, userData.phone,
            userData.birthday, userData.street, userData.postalCode, userData.colonia, userData.location,
            userData.city, userData.state, userData.emailExtra, userData.userId, userData.opcionD,
            userData.opcionH, userData.weight, userData.height, userData.IMP, userData.idp, userData.userRole
        );

        // Verificar que se haya llamado a la función add de Firestore con los datos correctos
        expect(db.collection).toHaveBeenCalledWith('patients');
        expect(db.collection().add).toHaveBeenCalledWith(userData);
    });
});

describe('generarIMP', () => {
    it('debería generar un IMP válido', () => {
        // Llamar a la función que se va a probar
        const IMP = generarIMP('Doe', 'Smith', 'John');

        // Verificar que el IMP generado tenga el formato correcto
        expect(IMP).toMatch(/^[A-Z]{2}\d{2}\d{3}[A-Z]$/);
    });
});

describe('createID', () => {
    it('debería generar un ID aleatorio', () => {
        // Llamar a la función que se va a probar
        const id = createID();

        // Verificar que el ID generado sea un número
        expect(typeof id).toBe('number');
    });
});

describe('asginedRole', () => {
    it('debería asignar el rol de "patient"', () => {
        // Llamar a la función que se va a probar
        const role = asginedRole();

        // Verificar que se haya asignado el rol correcto
        expect(role).toBe('patient');
    });
});
