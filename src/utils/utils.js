/**
 * Generates a new random uuid string.
 * @return {string} A new hex UUID string
 */
function UUID() {
  let buffer = new Uint32Array(8);
  window.crypto.getRandomValues(buffer);
  let hex = [];
  for(let i = 0; i < buffer.length; i++) {
    hex.push(buffer[i].toString(16));
  }
  let s = hex.join('');
  return s.substring(0,8)+"-"+s.substring(8,12)+"-"+s.substring(12,16)+"-"+s.substring(16,20)+"-"+s.substring(20,32);
}
