
import { shallowMount } from '@vue/test-utils';
import AlertSuccess from  '@/components/AlertSuccess.vue'; 

describe('AlertSuccess.vue', () => {
  it('renderiza a mensagem de sucesso corretamente', () => {
    const successMessage = 'Mensagem de sucesso de teste';
    const wrapper = shallowMount(AlertSuccess, {
      propsData: { successMessage }
    });

    expect(wrapper.exists()).toBe(true);

    const span = wrapper.find('span');
    expect(span.text()).toContain(successMessage);
  });
});
