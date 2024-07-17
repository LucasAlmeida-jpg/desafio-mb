<template>
  <div class="container">
    <div>
      <h2>Seja bem vindo(a)</h2>
      <form @submit.prevent="validateStep">
        <div class="form-group">
          <label class="label-text" for="email">Endereço de email:</label>
          <input class="input-group" id="email" type="text" v-model="formData.email" >
        </div>

        <div class="radio-group">
         <div>
          <input type="radio" id="registrationTypePF" value="PF" v-model="formData.registrationType" >
          <label class="label-text" for="registrationTypePF">Pessoa física</label>
         </div>

          <div>
            <input type="radio" id="registrationTypePJ" value="PJ" v-model="formData.registrationType">
          <label class="label-text" for="registrationTypePJ">Pessoa jurídica</label>
          </div>
        </div>
        <button class="btn" type="submit">Continuar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { isValidEmail } from '../helpers/maskHelpers';

export default {
  props: {
    formData: Object
  },
  setup(props, { emit }) {
    const validateStep = () => {
      if (props.formData.email && props.formData.registrationType) {
        if (!isValidEmail(props.formData.email)) {
          alert('Formato de e-mail inválido.');
          return;
        }
        emit('validated', props.formData);
      } else {
        alert('Por favor, preencha todos os campos.');
      }
    };



    return {
      validateStep,
      isValidEmail
    };
  }
};
</script>

<style scoped>
.btn{
  width: 100%;
}
</style>