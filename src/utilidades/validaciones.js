const nombreCompuesto = (value) => {
  if (value === undefined || value === null || value === "") {
    return true;
  }

  return /^(?! )(?!.* {3})[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]+$/.test(value);
};

export { nombreCompuesto };
