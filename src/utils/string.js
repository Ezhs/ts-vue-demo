/**
 * 字符串分割成数组
 *
 * @export
 * @param {string} str 字符串
 * @param {string} separator 分割的符号
 */
export function splitToArr(str, separator = ',') {
  if (!str) {
    return [];
  }

  let arr = null;
  const hasSemi = str.indexOf(';') !== -1;
  if (hasSemi) {
    arr = str.split(';');
  } else {
    arr = str.split(separator);
  }

  return arr;
}
