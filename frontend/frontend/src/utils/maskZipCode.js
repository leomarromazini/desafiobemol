// eslint-disable-next-line no-extend-native
String.prototype.reverse = function () {
  return this.split("").reverse().join("");
};

export function maskZipCode(field) {
  let value = field.value.replace(/[^\d]+/gi, "").reverse();
  let result = "";
  let mask = "#####-###".reverse();
  for (let x = 0, y = 0; x < mask.length && y < value.length; ) {
    if (mask.charAt(x) !== "#") {
      result += mask.charAt(x);
      x++;
    } else {
      result += value.charAt(y);
      y++;
      x++;
    }
  }
  field.value = result.reverse();
}
