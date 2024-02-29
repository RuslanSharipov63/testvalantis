const addZero = (num) => {
  if (num >= 0 && num <= 9) {
    return "0" + num;
  } else {
    return num;
  }
};

export const formatDate = () => {
  let formattedDate = "";
  let newDate = new Date();
  formattedDate =
    addZero(newDate.getFullYear()) +
    addZero(newDate.getMonth() + 1) +
    addZero(newDate.getDate());
  return formattedDate;
};
