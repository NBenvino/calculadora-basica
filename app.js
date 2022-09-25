const id = (id) => document.getElementById(id);

const output = id("output");
const clear = id("clear");
const clearAll = id("clearAll");

const equal = id("equal");

let num = 0;
let action = () => {};

const validOutput = () => (output.value === "." ? 0 : output.value);

const setNum = (number = output.value) => {
  num = number ? parseFloat(number) : parseFloat(output.placeholder);
};

const loadClearListeners = () => {
  clear.addEventListener("click", () => {
    setNum();
    output.value = "";
  });
  clearAll.addEventListener("click", () => {
    clear.click();
    output.placeholder = 0;
    setNum();
  });
};

const loadNumberListeners = () => {
  let numbers = document.querySelectorAll(".number");
  numbers.forEach((num) => {
    num.addEventListener("click", () => parseInt((output.value += num.value)));
  });
};

const postAction = () => {
  setNum();
  clear.click();
  output.placeholder = action();
};

const loadActionListeners = () => {
  id("negative").addEventListener("click", () => (output.value *= -1));

  id("percentage").addEventListener("click", () => {
    action = () =>
      output.value ? (num * parseFloat(output.value)) / 100 : num;
    postAction();
  });

  id("division").addEventListener("click", () => {
    action = () => (output.value ? num / parseFloat(validOutput()) : num);
    postAction();
  });

  id("multiplication").addEventListener("click", () => {
    action = () => (output.value ? num * parseFloat(validOutput()) : num);
    postAction();
  });

  id("subtraction").addEventListener("click", () => {
    action = () => (output.value ? num - parseFloat(validOutput()) : num);
    postAction();
  });

  id("addition").addEventListener("click", () => {
    action = () => (output.value ? num + parseFloat(validOutput()) : num);
    postAction();
  });
};

const loadEqualListener = () => {
  id("equal").addEventListener("click", () => {
    if (output.value) {
      output.placeholder = action();
      clear.click();
      setNum(parseFloat(output.placeholder));
    }
    action = () => output.placeholder;
  });
};

loadClearListeners();
loadNumberListeners();
loadActionListeners();
loadEqualListener();
