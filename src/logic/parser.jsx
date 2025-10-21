
export const defaultRules = [
  {
    id: 'L',
    label: 'Debe contener al menos una letra',
    test: (pass) => /[a-zA-Z]/.test(pass),
  },
  {
    id: 'N',
    label: 'Debe contener al menos un número',
    test: (pass) => /\d/.test(pass),
  },
  {
    id: 'S',
    label: 'Contiene símbolos',
    test: (pass) => /[^a-zA-Z0-9]/.test(pass),
  },
  {
    id: 'C',
    label: 'Debe tener más de 8 caracteres',
    test: (pass) => pass.length > 8,
  },
];
