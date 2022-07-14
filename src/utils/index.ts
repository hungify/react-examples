export const capitalize = (str: string) => {
  const strArray = str.split(' ');
  const capitalizedArray = strArray.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedArray.join(' ');
};
