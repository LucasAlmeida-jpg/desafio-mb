import { shallowMount } from '@vue/test-utils';
import FormStep4 from '@/components/FormStep4.vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('FormStep4.vue', () => {
  let wrapper;
  let formData;

  beforeEach(() => {
    formData = {
      registrationType: 'PF',
      name: '',
      cpf: '',
      birthDate: '',
      phone: '',
      companyName: '',
      cnpj: '',
      companyOpeningDate: '',
      companyPhone: '',
      email: ''
    };

    wrapper = shallowMount(FormStep4, {
      props: { formData }
    });

    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('valida os campos de acordo com o tipo de registro PF', async () => {
    formData.registrationType = 'PF';
    await wrapper.setProps({ formData });

    await wrapper.find('#name').setValue('Lucas Almeida');
    await wrapper.find('#cpf').setValue('123.456.789-00');
    await wrapper.find('#birthDate').setValue('01/01/2000');
    await wrapper.find('#phone').setValue('(12) 34567-8901');

    expect(wrapper.vm.formData.name).toBe('Lucas Almeida');
    expect(wrapper.vm.formData.cpf).toBe('123.456.789-00');
    expect(wrapper.vm.formData.birthDate).toBe('01/01/2000');
    expect(wrapper.vm.formData.phone).toBe('(12) 34567-8901');

    formData.registrationType = 'PJ';
    await wrapper.setProps({ formData });

    // Para testar o campo de CNPJ, faça mudança no escopo do formData para PJ;
    // await wrapper.find('#companyName').setValue('Empresa XYZ');
    // await wrapper.find('#cnpj').setValue('12.345.678/0001-00');
    // await wrapper.find('#companyOpeningDate').setValue('01/01/2000');
    // await wrapper.find('#companyPhone').setValue('(12) 34567-8901');

    // expect(wrapper.vm.formData.companyName).toBe('Empresa XYZ');
    // expect(wrapper.vm.formData.cnpj).toBe('12.345.678/0001-00');
    // expect(wrapper.vm.formData.companyOpeningDate).toBe('01/01/2000');
    // expect(wrapper.vm.formData.companyPhone).toBe('(12) 34567-8901');
  });

  it('Valida o envio do formulario', async () => {
    await wrapper.find('#email').setValue('test@example.com');

    await wrapper.find('form').trigger('submit.prevent');

    expect(window.alert).not.toHaveBeenCalled();

    expect(wrapper.emitted('form-submitted')).toBeTruthy();
  });

});
