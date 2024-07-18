import { mount } from '@vue/test-utils';
import Register from '@/components/Register.vue';
import FormStep1 from '@/components/FormStep1.vue';
import FormStep2 from '@/components/FormStep2.vue';
import FormStep3 from '@/components/FormStep3.vue';
import FormStep4 from '@/components/FormStep4.vue';

describe('Register.vue', () => {
  it('renderiza corretamente os passos', async () => {
    const wrapper = mount(Register);
    
    expect(wrapper.findComponent(FormStep1).exists()).toBe(true);
    expect(wrapper.findComponent(FormStep2).exists()).toBe(false);
    expect(wrapper.findComponent(FormStep3).exists()).toBe(false);
    expect(wrapper.findComponent(FormStep4).exists()).toBe(false);

    await wrapper.vm.handleStepValidation({ email: 'test@example.com' });
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(FormStep1).exists()).toBe(false);
    expect(wrapper.findComponent(FormStep2).exists()).toBe(true);
    expect(wrapper.findComponent(FormStep3).exists()).toBe(false);
    expect(wrapper.findComponent(FormStep4).exists()).toBe(false);

    await wrapper.vm.handleStepValidation({ registrationType: 'PJ' });
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(FormStep1).exists()).toBe(false);
    expect(wrapper.findComponent(FormStep2).exists()).toBe(false);
    expect(wrapper.findComponent(FormStep3).exists()).toBe(true);
    expect(wrapper.findComponent(FormStep4).exists()).toBe(false);

    await wrapper.vm.handleStepValidation({ companyName: 'Company XYZ' });
    await wrapper.vm.$nextTick(); 

    expect(wrapper.findComponent(FormStep1).exists()).toBe(false);
    expect(wrapper.findComponent(FormStep2).exists()).toBe(false);
    expect(wrapper.findComponent(FormStep3).exists()).toBe(false);
    expect(wrapper.findComponent(FormStep4).exists()).toBe(true);

    await wrapper.vm.sendFormData();
    await new Promise(resolve => setTimeout(resolve, 3000)); 
  });

  it('permite usuário voltar para etapa anterior', async () => {
    const wrapper = mount(Register);

    await wrapper.vm.handleStepValidation({ email: 'test@example.com' });
    await wrapper.vm.handleStepValidation({ registrationType: 'PJ' });

    await wrapper.vm.goToPreviousStep();
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(FormStep2).exists()).toBe(true);

    await wrapper.vm.goToPreviousStep();
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(FormStep1).exists()).toBe(true);
  });
});
