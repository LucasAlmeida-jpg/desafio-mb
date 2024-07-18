import { 
  isValidCpf, 
  isValidCnpj, 
  isValidDate, 
  isValidPhone, 
  isValidName, 
  isValidEmail, 
  validatePassword 
} from '@/helpers/maskHelpers';
import { expect, test, describe } from 'vitest';

describe('Validation Functions', () => {

  test('valida CPF corretamente', () => {
    expect(isValidCpf('123.456.789-09')).toBe(true);
    expect(isValidCpf('123.456.78-09')).toBe(false);
    expect(isValidCpf('12345678909')).toBe(false);
  });

  test('valida CNPJ corretamente', () => {
    expect(isValidCnpj('12.345.678/0001-95')).toBe(true);
    expect(isValidCnpj('12.345.678/0001-9')).toBe(false);
    expect(isValidCnpj('12345678000195')).toBe(false);
  });

  test('valida Email corretamente', () => {
    expect(isValidEmail('lucas@gmail.com')).toBe(true);
    expect(isValidEmail('lucas')).toBe(false);
    expect(isValidEmail('lucas123')).toBe(false);
  });

  test('valida data corretamente', () => {
    expect(isValidDate('01/01/2020')).toBe(true);
    expect(isValidDate('01-01-2020')).toBe(false);
    expect(isValidDate('01012020')).toBe(false);
  });

  test('valida telefone corretamente', () => {
    expect(isValidPhone('(11) 98765-4321')).toBe(true);
    expect(isValidPhone('(11) 9876-4321')).toBe(true);
    expect(isValidPhone('11987654321')).toBe(false);
  });

  test('valida nome corretamente', () => {
    expect(isValidName('Lucas Almeida')).toBe(true);
    expect(isValidName('Lucas123')).toBe(false);
    expect(isValidName('Lucas_Almeida')).toBe(false);
  });

  test('valida e retorna erro para senha inválida', () => {
    expect(validatePassword('')).toBe('Por favor, preencha a senha!');
    expect(validatePassword('1234')).toBe('A senha deve conter pelo menos 1 letra maiúscula, 1 caractere especial e ter no mínimo 5 letras.');
    expect(validatePassword('Senha123')).toBe('A senha deve conter pelo menos 1 letra maiúscula, 1 caractere especial e ter no mínimo 5 letras.');
    expect(validatePassword('Senha@123')).toBe(null);
  });

});
