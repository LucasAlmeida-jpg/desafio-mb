import { shallowMount } from '@vue/test-utils';
import FormStep3 from '@/components/FormStep3.vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('FormStep3.vue', () => {
  let wrapper;
  let formData;

  beforeEach(() => {
    formData = {
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

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('updates password field correctly', async () => {
    const input = wrapper.find('#password');

    await input.setValue('testPassword');
    expect(wrapper.vm.formData.password).toBe('testPassword');
  });

  it('validates form submission with password', async () => {
    await wrapper.find('#password').setValue('testPassword');

    await wrapper.find('form').trigger('submit.prevent');

    expect(window.alert).not.toHaveBeenCalled();

    expect(wrapper.emitted().validated).toBeTruthy();
    expect(wrapper.emitted().validated[0]).toEqual([formData]);
  });

  it('alerts when password field is empty', async () => {
    await wrapper.find('#password').setValue('');

    await wrapper.find('form').trigger('submit.prevent');

    expect(window.alert).toHaveBeenCalledWith('Por favor, preencha todos os campos.');

    expect(wrapper.emitted().validated).toBeFalsy();
  });
});
