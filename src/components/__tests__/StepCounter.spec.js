import { shallowMount } from '@vue/test-utils';
import StepCounter from '@/components/StepCounter.vue';


describe('StepCounter.vue', () => {
  it('renders props.currentStep when passed', () => {
    const currentStep = 2;
    const totalSteps = 5;
    const wrapper = shallowMount(StepCounter, {
      propsData: { currentStep, totalSteps }
    });
    expect(wrapper.text()).toContain(`Etapa ${currentStep} de ${totalSteps}`);
  });
});
