export const range = (start, end, step = 1) => {
  let output = [];

  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }

  for (let i = 0; i < end; i += step) {
    output.push();
  }

  return output;
};
