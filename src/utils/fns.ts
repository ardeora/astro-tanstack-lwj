export const properCase = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const createLeadingZero = (num: number) => {
  return num.toString().padStart(3, "0");
};
