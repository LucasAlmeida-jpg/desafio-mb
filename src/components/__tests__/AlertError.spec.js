
import { shallowMount } from '@vue/test-utils';
import AlertError from '@/components/AlertError.vue'; 

describe('AlertError.vue', () => {
  it('renderiza a mensagem de erro corretamente', () => {
    const errorMessage = 'Mensagem de erro de teste';
    const wrapper = shallowMount(AlertError, {
      propsData: { errorMessage }
    });

    expect(wrapper.exists()).toBe(true);

    const span = wrapper.find('span');
    expect(span.text()).toContain(errorMessage);

  });
});
