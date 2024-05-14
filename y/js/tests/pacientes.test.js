// Importar las funciones que se van a probar
import { mostrarPacientes } from 'js/pacientes.js';

// Mock de Firebase
jest.mock('./firebaseConfig.js', () => ({
    db: {
        collection: jest.fn().mockReturnValue({
            getDocs: jest.fn().mockResolvedValue({
                forEach: jest.fn()
            })
        })
    }
}));

describe('mostrarPacientes', () => {
    it('debería mostrar la lista de pacientes', async () => {
        // Llamar a la función que se va a probar
        await mostrarPacientes();

        // Verificar que se haya llamado a la función collection de Firebase con los datos correctos
        expect(db.collection).toHaveBeenCalledWith('users');
        // Verificar que se haya llamado a la función getDocs de Firebase
        expect(db.collection().getDocs).toHaveBeenCalled();
    });
});