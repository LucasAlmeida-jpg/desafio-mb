import { applyCpfMask, applyCnpjMask, applyDateMask, applyPhoneMask } from '@/helpers/maskHelpers';
import { expect } from 'vitest';

describe('Mask Helpers', () => {
  let event;
  let formData;

  beforeEach(() => {
    formData = {};
    event = {
      target: {
        value: ''
      }
    };
  });

  test('aplica o formado de mascara de cpf corretamnete', () => {
    event.target.value = '12345678909';
    applyCpfMask(event, formData);
    expect(formData.cpf).toBe('123.456.789-09');
  });

  test('aplica o formado de mascara de cnpj corretamnete', () => {
    event.target.value = '12345678000195';
    applyCnpjMask(event, formData);
    expect(formData.cnpj).toBe('12.345.678/0001-95');
  });

  test('aplica o formado de mascara de data corretamnete', () => {
    event.target.value = '01012020';
    applyDateMask(event, formData, 'birthDate');
    expect(formData.birthDate).toBe('01/01/2020');
  });

  test('aplica o formado de mascara de telefone corretamnete', () => {
    event.target.value = '11987654321';
    applyPhoneMask(event, formData, 'phone');
    expect(formData.phone).toBe('(11) 98765-4321');
  });

});
