/*
   Un hash es el resultado de aplicar una función hash a un elemento de entrada, 
   como lo puede ser una cadena de texto.
   Esta función hash toma la cadena de texto ingresada y la convierte en una 
   serie de carateres alfanumericos de logitud fija, es decir que sin importar
   el tamaño de la cadena de carateres, siempre retorna una hash de con la misma
   logitud de caracteres.

   SHA-256 es una función hash que como su nombre indica, genera una salida de 
   256 bits, que son 32 bytes.
*/

// Importamos el módulo 'crypto' para poder acceder a las funciones de hashing
const crypto = require('crypto');


// Función para obtener el hash SHA-256 de una cadena de caracteres
function obtenerHashSHA256(texto) {
  // Mostramos el texto original
  console.log("Texto original:", texto);

  // Creamos el hash usando SHA-256
  const hash = crypto.createHash('sha256')   // Elegimos el algoritmo
    .update(texto)   // Pasamos la cadena de caracteres al hash
    .digest('hex');  // Lo convertimos a hexadecimal para poder ver el resultado

  // Mostramos el resultado
  console.log("Hash SHA-256:", hash);
}

// Llamamos a la función pasandole un texto de ejemplo
obtenerHashSHA256("Buenas noches");
