const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    if (typeof message === 'undefined' || typeof key === 'undefined') {
      throw new Error('Incorrect arguments!');
    }

    message = message.toUpperCase();
    key = key.toUpperCase();
    let encryptedMessage = '';

    for (let i = 0, j = 0; i < message.length; i++) {
      const char = message[i];
      if (char.match(/[A-Z]/)) {
        const charCode = ((char.charCodeAt(0) - 65) + (key[j % key.length].charCodeAt(0) - 65)) % 26;
        encryptedMessage += String.fromCharCode(charCode + 65);
        j++;
      } else {
        encryptedMessage += char;
      }
    }

    return this.isDirect ? encryptedMessage : encryptedMessage.split('').reverse().join('');
  }

  decrypt(message, key) {
    if (typeof message === 'undefined' || typeof key === 'undefined') {
      throw new Error('Incorrect arguments!');
    }

    message = message.toUpperCase();
    key = key.toUpperCase();
    let decryptedMessage = '';

    for (let i = 0, j = 0; i < message.length; i++) {
      const char = message[i];
      if (char.match(/[A-Z]/)) {
        const charCode = ((char.charCodeAt(0) - 65) - (key[j % key.length].charCodeAt(0) - 65) + 26) % 26;
        decryptedMessage += String.fromCharCode(charCode + 65);
        j++;
      } else {
        decryptedMessage += char;
      }
    }

    return this.isDirect ? decryptedMessage : decryptedMessage.split('').reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
