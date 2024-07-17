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

  test('applyCpfMask formats CPF correctly', () => {
    event.target.value = '12345678909';
    applyCpfMask(event, formData);
    expect(formData.cpf).toBe('123.456.789-09');
  });

  test('applyCnpjMask formats CNPJ correctly', () => {
    event.target.value = '12345678000195';
    applyCnpjMask(event, formData);
    expect(formData.cnpj).toBe('12.345.678/0001-95');
  });

  test('applyDateMask formats date correctly', () => {
    event.target.value = '01012020';
    applyDateMask(event, formData, 'birthDate');
    expect(formData.birthDate).toBe('01/01/2020');
  });

  test('applyPhoneMask formats phone correctly', () => {
    event.target.value = '11987654321';
    applyPhoneMask(event, formData, 'phone');
    expect(formData.phone).toBe('(11) 98765-4321');
  });

  test('applyPhoneMask formats very short phone number correctly', () => {
    event.target.value = '11';
    applyPhoneMask(event, formData, 'phone');
    expect(formData.phone).toBe('(11');
  });
});
