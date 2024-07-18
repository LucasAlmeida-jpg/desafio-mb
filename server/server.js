import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const isValidCpf = (cpf) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
const isValidCnpj = (cnpj) => /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj);
const isValidDate = (date) => /^\d{2}\/\d{2}\/\d{4}$/.test(date);
const isValidPhone = (phone) => /^\(\d{2}\) \d{4,5}-\d{4}$/.test(phone);
const isValidName = (name) => /^[A-Za-z\s]+$/.test(name);
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = (password) => {
  const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z]).{5,}$/;

  if (!password) {
    return 'Por favor, preencha a senha!';
  }

  if (!passwordPattern.test(password)) {
    return 'A senha deve conter pelo menos 1 letra maiúscula, 1 caractere especial e ter no mínimo 5 letras.';
  }

  return null;
};

const validateForm = (req, res, next) => {
  const { registrationType, cpf, name, birthDate, phone, email, cnpj, companyName, companyOpeningDate, companyPhone, password, passwordCompany } = req.body;
  const errors = [];

  if (registrationType === 'PF') {
    if (!isValidCpf(cpf)) errors.push('CPF inválido');
    if (!isValidName(name)) errors.push('Nome inválido');
    if (!isValidDate(birthDate)) errors.push('Data de nascimento inválida');
    if (!isValidPhone(phone)) errors.push('Telefone inválido');
    if (!isValidEmail(email)) errors.push('Email inválido');

    const passwordError = validatePassword(password);
    if (passwordError) errors.push(passwordError);
  } else if (registrationType === 'PJ') {
    if (!isValidCnpj(cnpj)) errors.push('CNPJ inválido');
    if (!isValidName(companyName)) errors.push('Nome da empresa inválido');
    if (!isValidDate(companyOpeningDate)) errors.push('Data de abertura da empresa inválida');
    if (!isValidPhone(companyPhone)) errors.push('Telefone da empresa inválido');
    if (!isValidEmail(email)) errors.push('Email inválido');

    const passwordError = validatePassword(passwordCompany);
    if (passwordError) errors.push(passwordError);
  } else {
    errors.push('Tipo de registro inválido');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  next();
};

app.post('/registration', validateForm, (req, res) => {
  res.status(200).json({
    message: 'Cadastro realizado com sucesso',
    data: req.body,
  });
});

app.listen(port, () => {
  console.log(`Rodando na porta: ${port}`);
});
