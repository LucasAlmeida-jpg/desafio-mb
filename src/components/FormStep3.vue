<template>
  <div>
      <h2>Senha de Acesso</h2>
      <form @submit.prevent="validateStep">
        <div class="form-group" v-if="formData.registrationType === 'PF'">
          <label class="label-text" for="password">Senha de acesso:</label>
          <input class="input-group" id="password" type="password" v-model="formData.password">
        </div>
        <div class="form-group" v-if="formData.registrationType === 'PJ'">
          <label class="label-text" for="password">Senha de acesso:</label>
          <input class="input-group" id="password" type="password" v-model="formData.passwordCompany">
        </div>

        <div class="button-group">
          <button @click.prevent="$emit('back')" class="btn-outline">Voltar</button>
          <button type="submit" class="btn">Continuar</button>
        </div>
      </form>
    </div>
</template>

<script>
import { validatePassword } from '@/helpers/maskHelpers';

export default {
  props: ['formData'],
  setup(props, { emit }) {
    const validateStep = () => {
      const password = props.formData.password || props.formData.passwordCompany;
      const validationError = validatePassword(password);

      if (validationError) {
        alert(validationError);
        return;
      }

      emit('validated', props.formData);
    };

    return {
      validateStep
    };
  }
};
</script>
