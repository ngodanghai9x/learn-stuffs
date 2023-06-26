export const isValidDate = (date: string): boolean => {
  if (!date || !date.includes("-")) return false;
  try {
    const temp = date.split("-");
    const d = new Date(+temp[0], +temp[1] - 1, +temp[2]);
    console.log("🚀 ~ file: test.ts ~ line 5 ~ isValidDate ~ temp", {
      temp,
      d,
      date,
    });
    return d && d.getMonth() + 1 == +temp[1];
  } catch (error) {
    console.log("error isValidDate", { date, error });
    return false;
  }
};

export const hasInvalidDate = (array: any[], field?: string): boolean => {
  console.log(1);
  if (!array || !array.length) return false;
  console.log(2);

  if (!!field) {
    return array.some(
      (item) => !item || !item[field] || !isValidDate(item[field])
    );
  }
  console.log(3);
  return array.some((item) => !item || !isValidDate(item));
};

// console.log("is: ", hasInvalidDate([{date: "2011-11-11"}, {date: "2011-13-11"}], 'date'));