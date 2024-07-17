import { shallowMount } from '@vue/test-utils';
import FormStep1 from '@/components/FormStep1.vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('FormStep1.vue', () => {
  it('validates email format and form submission', async () => {
    const formData = {
      email: '',
      registrationType: 'PF'
    };

    const wrapper = shallowMount(FormStep1, {
      props: { formData }
    });

    formData.email = 'invalid-email';
    await wrapper.find('form').trigger('submit.prevent');
    expect(window.alert).toHaveBeenCalledWith('Formato de e-mail inválido.');

    vi.clearAllMocks();

    formData.email = '';
    formData.registrationType = '';
    await wrapper.find('form').trigger('submit.prevent');
    expect(window.alert).toHaveBeenCalledWith('Por favor, preencha todos os campos.');

    vi.clearAllMocks();

    formData.email = 'valid.email@example.com';
    formData.registrationType = 'PF';
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted().validated).toBeTruthy();
    expect(wrapper.emitted().validated[0]).toEqual([formData]);
  });

  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});
