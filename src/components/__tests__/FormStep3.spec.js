import { shallowMount } from '@vue/test-utils';
import FormStep3 from '@/components/FormStep3.vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('FormStep3.vue', () => {
  let wrapper;
  let formData;

  beforeEach(() => {
    formData = {
      registrationType: 'PF',
      password: ''
    };

    wrapper = shallowMount(FormStep3, {
      props: { formData }
    });

    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renderiza o componente', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('atualiza o campo de senha corretamente (PF)', async () => {
    const input = wrapper.find('#password');
    await input.setValue('Test@123');
    expect(wrapper.vm.formData.password).toBe('Test@123');
  });

  it('faz validação do envio com senha válida (PF)', async () => {
    await wrapper.find('#password').setValue('Test@123');
    await wrapper.find('form').trigger('submit.prevent');
    expect(window.alert).not.toHaveBeenCalled();
    expect(wrapper.emitted().validated).toBeTruthy();
    expect(wrapper.emitted().validated[0]).toEqual([{ password: 'Test@123', registrationType: 'PF' }]);
  });

  it('valida se o campo de senha está vazio (PF)', async () => {
    await wrapper.find('#password').setValue('');
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted().validated).toBeFalsy();
  });

  it('alerta se a senha não tiver os critérios definidos (PF)', async () => {
    await wrapper.find('#password').setValue('test');
    await wrapper.find('form').trigger('submit.prevent');
    expect(window.alert).toHaveBeenCalledWith('A senha deve conter pelo menos 1 letra maiúscula, 1 caractere especial e ter no mínimo 5 letras.');
    expect(wrapper.emitted().validated).toBeFalsy();
  });

  it('atualiza o campo de senha da empresa corretamente (PJ)', async () => {
    formData.registrationType = 'PJ';
    wrapper.setProps({ formData });
    await wrapper.find('#password').setValue('Company@123');

  });

  it('faz validação do envio com senha válida (PJ)', async () => {
    formData.registrationType = 'PJ';
    wrapper.setProps({ formData });
    await wrapper.find('#password').setValue('Company@123');
    await wrapper.find('form').trigger('submit.prevent');
    expect(window.alert).not.toHaveBeenCalled();
    expect(wrapper.emitted().validated).toBeTruthy();
    expect(wrapper.emitted().validated[0]).toEqual([{ password: 'Company@123', registrationType: 'PJ' }]);
  });

  it('valida se o campo de senha da empresa está vazio (PJ)', async () => {
    formData.registrationType = 'PJ';
    wrapper.setProps({ formData });
    await wrapper.find('#password').setValue('');
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted().validated).toBeFalsy();
  });

  it('alerta se a senha da empresa não tiver os critérios definidos (PJ)', async () => {
    formData.registrationType = 'PJ';
    wrapper.setProps({ formData });
    await wrapper.find('#password').setValue('company');
    await wrapper.find('form').trigger('submit.prevent');
    expect(window.alert).toHaveBeenCalledWith('A senha deve conter pelo menos 1 letra maiúscula, 1 caractere especial e ter no mínimo 5 letras.');
    expect(wrapper.emitted().validated).toBeFalsy();
  });
});
