// Importar las funciones que se van a probar
import { saveFormDataToFirestore, asginedRole } from 'js/registroDoctor.js';

// Mock de Firebase
jest.mock('./firebaseConfig.js', () => ({
    db: {
        collection: jest.fn().mockReturnValue({
            add: jest.fn().mockResolvedValue()
        })
    }
}));

describe('saveFormDataToFirestore', () => {
    it('debería guardar los datos del doctor en Firestore', async () => {
        // Definir los datos del doctor
        const doctorData = {
            email: 'doctor@example.com',
            name: 'John',
            lastName: 'Doe',
            secondLastName: 'Smith',
            professionalID: '123456',
            phone: '123456789',
            birthday: '01/01/1990',
            namePlaceWork: 'Hospital X',
            street: 'Street 123',
            postalCode: '12345',
            colonia: 'Colonia',
            location: 'Location',
            city: 'City',
            state: 'State'
        };

        // Llamar a la función que se va a probar
        await saveFormDataToFirestore(
            doctorData.email, doctorData.name, doctorData.lastName, doctorData.secondLastName,
            doctorData.professionalID, doctorData.phone, doctorData.birthday, doctorData.namePlaceWork,
            doctorData.street, doctorData.postalCode, doctorData.colonia, doctorData.location,
            doctorData.city, doctorData.state
        );

        // Verificar que se haya llamado a la función add de Firestore con los datos correctos
        expect(db.collection).toHaveBeenCalledWith('doctors');
        expect(db.collection().add).toHaveBeenCalledWith(doctorData);
    });
});

describe('asginedRole', () => {
    it('debería asignar el rol de "doctor"', () => {
        // Llamar a la función que se va a probar
        const role = asginedRole();

        // Verificar que se haya asignado el rol correcto
        expect(role).toBe('doctor');
    });
});
