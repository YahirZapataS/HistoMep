export function generarIMP(){
    const firsWordLastName = apPaterno.charAt(0);
    const firstWordSecondLastName = apMaterno.charAt(0);
    const twoWordsName = nombre.substring(0, 2);

    const numRegister = obtenerNumeroRegistro();
    const randomWord = generarLetraAleatoria();

    const IMP = `${firsWordLastName}${firstWordSecondLastName}${twoWordsName}${numRegister}${randomWord}`;
    return IMP;

    console.log(IMP);
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