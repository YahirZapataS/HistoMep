// Obtener el IMP de la URL
const urlParams = new URLSearchParams(window.location.search);
const imp = urlParams.get('imp');

// Generar el código QR con el IMP obtenido
const qr = QRCode(0, 'L');
qr.addData(imp);
qr.make();
const qrImage = qr.createImgTag();

// Mostrar el código QR en la página
document.getElementById('qrcode').innerHTML = qrImage;
