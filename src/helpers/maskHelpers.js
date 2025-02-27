export const applyCpfMask = (event, formData) => {
  const input = event.target;
  let cpf = input.value.replace(/\D/g, '');
  cpf = cpf.slice(0, 11);
  cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  formData.cpf = cpf;
};

export const applyCnpjMask = (event, formData) => {
  const input = event.target;
  let cnpj = input.value.replace(/\D/g, '');
  cnpj = cnpj.slice(0, 14);
  if (cnpj.length === 14) {
    cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  }
  formData.cnpj = cnpj;
};

export const applyDateMask = (event, formData, dateField) => {
  const input = event.target;
  let date = input.value.replace(/\D/g, '');
  date = date.slice(0, 8);
  date = date.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3');
  formData[dateField] = date;
};

export const applyPhoneMask = (event, formData, phoneField) => {
  const input = event.target;
  let phone = input.value.replace(/\D/g, '');
  if (phone.length > 11) {
    phone = phone.slice(0, 11);
  }
  if (phone.length > 6) {
    phone = phone.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  } else if (phone.length > 2) {
    phone = phone.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
  } else {
    phone = phone.replace(/^(\d*)/, '($1');
  }
  formData[phoneField] = phone;
};


export const isValidCpf = (cpf) => {
  return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
};

export const isValidCnpj = (cnpj) => {
  return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj);
};

export const isValidDate = (date) => {
  return /^\d{2}\/\d{2}\/\d{4}$/.test(date);
};

export const isValidPhone = (phone) => {
  return /^\(\d{2}\) \d{4,5}-\d{4}$/.test(phone);
};

export const isValidName = (name) => {
  return /^[A-Za-z\s]+$/.test(name);
}

export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};


export const validatePassword = (password) => {
  const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z]).{5,}$/;

  if (!password) {
    return 'Por favor, preencha a senha!';
  }

  if (!passwordPattern.test(password)) {
    return 'A senha deve conter pelo menos 1 letra maiúscula, 1 caractere especial e ter no mínimo 5 letras.';
  }

  return null;
};