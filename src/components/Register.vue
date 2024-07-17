<template>
    <div>
      <AlertSuccess v-if="showAlert"  :successMessage="successMessage"/>
      <AlertError v-if="showErrorAlert" :errorMessage="errorMessage" />
      <StepCounter :currentStep="currentStepNumber" :totalSteps="4" />
      <component
        :is="currentStepComponent"
        :formData="formData"
        @validated="handleStepValidation"
        @back="goToPreviousStep"
        v-if="currentStep !== 'completed'"
      />
      <div v-else>
        <FormStep4
          :formData="formData"
          @back="goToPreviousStep"
          @submit="submitForm"
        />
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import FormStep1 from './FormStep1.vue';
  import FormStep2 from './FormStep2.vue';
  import FormStep3 from './FormStep3.vue';
  import FormStep4 from './FormStep4.vue';
  import AlertSuccess from './AlertSuccess.vue';
  import AlertError from './AlertError.vue';
  import StepCounter from './StepCounter.vue';
  
  export default {
    components: {
      StepCounter,
      FormStep1,
      FormStep2,
      FormStep3,
      FormStep4,
      AlertSuccess,
      AlertError
    },
    setup() {
      const currentStep = ref('step1');
      const currentStepNumber = ref(1);
      const showAlert = ref(false);
      const showErrorAlert = ref(false);
      const successMessage = ref('');
      const errorMessage = ref('');
      const formData = ref({
        email: '',
        registrationType: 'PF',
        name: '',
        cpf: '',
        birthDate: null,
        phone: '',
        companyName: '',
        cnpj: '',
        companyOpeningDate: null,
        companyPhone: '',
        password: ''
      });
  
      const currentStepComponent = computed(() => {
        return {
          step1: 'FormStep1',
          step2: 'FormStep2',
          step3: 'FormStep3'
        }[currentStep.value] || '';
      });
  
      const handleStepValidation = (data) => {
        formData.value = { ...formData.value, ...data };
        const nextStepMap = {
          step1: 'step2',
          step2: 'step3',
          step3: 'completed'
        };
        currentStep.value = nextStepMap[currentStep.value] || currentStep.value;
        currentStepNumber.value++;
      };
  
      const goToPreviousStep = () => {
        const previousStepMap = {
          step2: 'step1',
          step3: 'step2',
          completed: 'step3'
        };
        currentStep.value = previousStepMap[currentStep.value] || currentStep.value;
        currentStepNumber.value--;
      };
  
      const submitForm = () => {
        sendFormData();
      };
  
      const sendFormData = async () => {
        try {
          const response = await fetch('/registration', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData.value)
          });
  
          if (!response.ok) {
            throw new Error(`Erro ao enviar os dados. Status: ${response.status}`);
          }
  
          const data = await response.json();
          console.log(data);
  
          showAlert.value = true;
          successMessage.value = 'Cadastro realizado com sucesso';
          setTimeout(() => {
            showAlert.value = false;
            location.reload();
          }, 3000);
        } catch (error) {
          showErrorAlert.value = true;
          errorMessage.value = 'Erro ao cadastrar, tente novamente!';
        }
      };
      
      return {
        currentStep,
        formData,
        currentStepComponent,
        handleStepValidation,
        goToPreviousStep,
        submitForm,
        showAlert,
        showErrorAlert,
        successMessage,
        errorMessage,
        currentStepNumber
      };
    }
  };
  </script>
  
  <style>
@media (max-width: 600px) {
  #app {
    width: 100vw;
    padding: 20px;
  }
}
</style>