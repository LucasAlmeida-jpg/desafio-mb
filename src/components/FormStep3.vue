<template>
  <div class="container">
    <div>
      <h2>Senha de Acesso</h2>
      <form @submit.prevent="validateStep">
        <div class="form-group">
          <label class="label-text" for="password">Senha de acesso:</label>
          <input class="input-group" id="password" type="password" v-model="formData.password">
        </div>

        <div class="button-group">
          <button @click.prevent="$emit('back')" class="btn-outline">Voltar</button>
          <button type="submit" class="btn">Continuar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['formData'],
  setup(props, { emit }) {
    const validateStep = () => {
      const password = props.formData.password;
      const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z]).{5,}$/;

      if (!password) {
        alert('Por favor, preencha a senha!');
        return;
      }

      if (!passwordPattern.test(password)) {
        alert('A senha deve conter pelo menos 1 letra maiúscula, 1 caractere especial e ter no mínimo 5 letras.');
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
