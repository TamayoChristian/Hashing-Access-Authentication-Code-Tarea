/*
  HMAC significa Hash-based Message Authentication Code, es decir es un código
  que permite saber si un texto no ha sido modificado, utilizando un hash.

  Consiste en un código que es enviado junto con un mensaje, el receptor del mensaje
  debe calcular el HMAC del mensaje que recibe y comprarlo con el HMAC que recibió
  en caso de que no sean igules, quiere decir que el mensaje ha sido alterado.
*/

const fs = require('fs');
const crypto = require('crypto');

// Clave secreta compartida (debe ser conocida por ambas partes)
const claveSecreta = 'DAVID-OBANDO';

// Simulamos el envío de un mensaje
function enviarMensaje(texto) {
  // Creamos el HMAC usando SHA-256
  const hmac = crypto.createHmac('sha256', claveSecreta)
                     .update(texto) //Le pasamos el mensaje
                     .digest('hex'); //Indicamos que sea hexadecimal para que se pueda leer

  // Creamos el objeto mensaje
  const mensajeCompleto = {
    texto: texto, //Añadimos el texto
    hmac: hmac  //y el hmac para que el receptor pueda comparar
  };

  // Guardamos el mensaje en un archivo JSON
  fs.writeFileSync('mensaje.json', JSON.stringify(mensajeCompleto, null, 2));

  console.log("Mensaje enviado y guardado en 'mensaje.json'");
}

// Simulamos la recepción y verificación del mensaje
function recibirMensaje() {
  // Leemos el archivo
  const datos = fs.readFileSync('mensaje.json', 'utf8');
  const mensajeRecibido = JSON.parse(datos);

  // Recalculamos el HMAC con el texto recibido
  const hmacVerificado = crypto.createHmac('sha256', claveSecreta)
                               .update(mensajeRecibido.texto)
                               .digest('hex');

  // Comparamos HMACs
  if (hmacVerificado === mensajeRecibido.hmac) {
    console.log("✅ Mensaje válido:");
    console.log("Texto:", mensajeRecibido.texto);
  } else {
    console.log("❌ Mensaje modificado o clave incorrecta.");
  }
}

// Ejecutamos ambas funciones para simular el intercambio
enviarMensaje("CHRISTIAN TAMAYO.");
recibirMensaje();
