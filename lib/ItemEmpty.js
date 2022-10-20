/*
값이 존재하면 true 리턴
값이 존재하지 않으면 false 리턴
*/
const ItemEmpty = {
  check(value) {
    if (
      value === '' ||
      value === null ||
      value === undefined ||
      (value !== null &&
        typeof value === 'object' &&
        !Object.keys(value).length)
    ) {
      return false;
    } else {
      return true;
    }
  },
};

export default ItemEmpty;
