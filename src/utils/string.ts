const actionKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
const vietnameseCharactersLowerCase = [
  'á',
  'à',
  'ả',
  'ã',
  'ạ',
  'ă',
  'ắ',
  'ằ',
  'ẳ',
  'ẵ',
  'ặ',
  'â',
  'ấ',
  'ầ',
  'ẩ',
  'ẫ',
  'ậ',
  'đ',
  'é',
  'è',
  'ẻ',
  'ẽ',
  'ẹ',
  'ê',
  'ế',
  'ề',
  'ể',
  'ễ',
  'ệ',
  'í',
  'ì',
  'ỉ',
  'ĩ',
  'ị',
  'ó',
  'ò',
  'ỏ',
  'õ',
  'ọ',
  'ô',
  'ố',
  'ồ',
  'ổ',
  'ỗ',
  'ộ',
  'ơ',
  'ớ',
  'ờ',
  'ở',
  'ỡ',
  'ợ',
  'ú',
  'ù',
  'ủ',
  'ũ',
  'ụ',
  'ư',
  'ứ',
  'ừ',
  'ử',
  'ữ',
  'ự',
  'ý',
  'ỳ',
  'ỷ',
  'ỹ',
  'ỵ',
];

const vietnameseCharacters = vietnameseCharactersLowerCase.concat(
  vietnameseCharactersLowerCase.map((char) => char.toUpperCase())
);

export const keyDownShouldBe = (keydown: string, type: React.HTMLInputTypeAttribute): boolean => {
  const isActionKey = actionKeys.includes(keydown);
  const isNumberKey = /^[0-9]$/.test(keydown);
  const isLatinKey = /^[a-zA-Z]$/.test(keydown);
  const isVietnameseKey = vietnameseCharacters.includes(keydown);

  if (type === 'number') {
    return isNumberKey || isActionKey;
  } else if (type === 'text') {
    return isNumberKey || isLatinKey || isActionKey || isVietnameseKey;
  }
  return false;
};

export const capitalize = (str: string) => {
  const strArray = str.split(' ');
  const capitalizedArray = strArray.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedArray.join(' ');
};
