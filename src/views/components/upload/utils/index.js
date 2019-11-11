/**
 * 检查文件格式是否符合条件
 *
 * @export
 * @param {*} file 文件
 * @param {string} [suffixs='*'] 格式字符串, 如: 'png|jpg|jpeg'
 * @returns
 */
export function checkFileExt(file, suffixs = '*') {
  if (suffixs !== '*') {
    /* eslint-disable prefer-template */
    return !!file.name.toLowerCase().match('(' + suffixs + ')$');
  }

  return true;
}
