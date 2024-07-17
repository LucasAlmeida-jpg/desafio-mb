<template>
  <div class="container">
    <h2>{{formData.registrationType === 'PF' ? 'Pessoa Fisica' : formData.registrationType === 'PJ'  ? 'Pessoa Juridica' : 'Pessoa Fisica'}}</h2>
    <form @submit.prevent="validateStep">
      <template v-if="formData.registrationType === 'PF'">
        <div class="form-group">
          <label class="label-text" for="name">Nome:</label>
          <input class="input-group" id="name" type="text" v-model="formData.name">
        </div>

        <div class="form-group">
          <label class="label-text" for="cpf">CPF:</label>
          <input class="input-group" id="cpf" type="text" v-model="formData.cpf" @input="applyCpfMask">
        </div>
        
        <div class="form-group">
          <label class="label-text" for="birthDate">Data de nascimento:</label>
          <input class="input-group" id="birthDate" type="text" v-model="formData.birthDate" @input="applyDateMask">
        </div>

        <div class="form-group">
          <label class="label-text" for="phone">Telefone:</label>
          <input class="input-group" id="phone" type="text" v-model="formData.phone" @input="applyPhoneMask">
        </div>
      </template>

      <template v-else-if="formData.registrationType === 'PJ'">
        <div class="form-group">
          <label class="label-text" for="companyName">Razão social:</label>
          <input class="input-group" id="companyName" type="text" v-model="formData.companyName">
        </div>

        <div class="form-group">
          <label class="label-text" for="cnpj">CNPJ:</label>
          <input class="input-group" id="cnpj" type="text" v-model="formData.cnpj" @input="applyCnpjMask">
        </div>

        <div class="form-group">
          <label class="label-text" for="companyOpeningDate">Data de abertura:</label>
          <input class="input-group" id="companyOpeningDate" type="text" v-model="formData.companyOpeningDate" @input="applyDateMask">
        </div>

        <div class="form-group">
          <label class="label-text" for="companyPhone">Telefone:</label>
          <input class="input-group" id="companyPhone" type="text" v-model="formData.companyPhone" @input="applyPhoneMask">
        </div>
      </template>

      <div class="button-group">
        <button @click.prevent="$emit('back')" class="btn-outline">Voltar</button>
        <button type="submit" class="btn">Continuar</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ['formData'],
  setup(props, { emit }) {
    const validateStep = () => {
      const formData = props.formData;
      if (formData.registrationType === 'PF') {
        if (!isValidName(formData.name)) {
          alert('Formato de nome inválido.');
          return;
        } else if (!isValidCpf(formData.cpf)) {
          alert('Formato de CPF inválido.');
          return;
        } else if (!isValidDate(formData.birthDate)) {
          alert('Formato de Data de nascimento inválido.');
          return;
        }
      } else if (formData.registrationType === 'PJ') {
        if (!isValidName(formData.companyName)) {
          alert('Formato de Razão social inválido.');
          return;
        } else if (!isValidCnpj(formData.cnpj)) {
          alert('Formato de CNPJ inválido.');
          return;
        } else if (!isValidDate(formData.companyOpeningDate)) {
          alert('Formato de Data de abertura da empresa inválido.');
          return;
        }
      }

      emit('validated', formData);
    };

    const isValidName = (name) => {
      return /^[A-Za-z\s]+$/.test(name);
    };

    const isValidCpf = (cpf) => {
      return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
    };

    const isValidCnpj = (cnpj) => {
      return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj);
    };

    const isValidDate = (date) => {
      return /^\d{2}\/\d{2}\/\d{4}$/.test(date);
    };

    const applyCpfMask = (event) => {
      const input = event.target;
      let cpf = input.value.replace(/\D/g, ''); 
      cpf = cpf.slice(0, 11);
      cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
      props.formData.cpf = cpf; 
    };

    const applyCnpjMask = (event) => {
      const input = event.target;
      let cnpj = input.value.replace(/\D/g, '');
      cnpj = cnpj.slice(0, 14);      
      if (cnpj.length === 14) {
        cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
      }
      props.formData.cnpj = cnpj; 
    };

    const applyDateMask = (event) => {
      const input = event.target;
      let date = input.value.replace(/\D/g, '');
      date = date.slice(0, 8);
      date = date.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3');
      props.formData.birthDate = date; 
      props.formData.companyOpeningDate = date;
    };
    
    const applyPhoneMask = (event) => {
      const input = event.target;
      let phone = input.value.replace(/\D/g, '');
      if (phone.length > 11) {
        phone = phone.slice(0, 11);
      }
      if (phone.length > 6) {
        phone = phone.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      } else if (phone.length > 2) {
        phone = phone.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
      } else {
        phone = phone.replace(/^(\d*)/, '($1');
      }
      props.formData.phone = phone;
      props.formData.companyPhone = phone;

    };

    return {
      validateStep,
      applyCpfMask,
      applyCnpjMask,
      applyDateMask,
      applyPhoneMask,
      isValidName,
      isValidCpf,
      isValidCnpj,
      isValidDate,
    };
  }
};
</script>
