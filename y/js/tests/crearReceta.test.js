// recetas.test.js
import { guardarReceta, eliminarMedicamento } from './recetas';
import { db } from './firebaseConfig';

// Mock de la función collection de Firestore
jest.mock('./firebaseConfig.js', () => ({
    db: {
        collection: jest.fn().mockReturnThis(),
        add: jest.fn()
    }
}));

describe('guardarReceta', () => {
    it('debería guardar la receta en Firestore', async () => {
        const medicamentos = [
            { medicine: 'Medicamento 1', dosis: 'Dosis 1', periodo: 'Periodo 1', duracion: 'Duración 1' },
            { medicine: 'Medicamento 2', dosis: 'Dosis 2', periodo: 'Periodo 2', duracion: 'Duración 2' }
        ];

        await guardarReceta(medicamentos);

        expect(db.collection().add).toHaveBeenCalledWith({ medicamentos });
    });
});

describe('eliminarMedicamento', () => {
    it('debería eliminar el div del medicamento y mostrar un mensaje', () => {
        const div = document.createElement('div');
        document.body.appendChild(div);

        eliminarMedicamento(div);

        expect(div.parentNode).toBeNull();
        // Agrega más expectativas según sea necesario
    });
});
