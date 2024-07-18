<template>
  <div>
    <h2>{{ formData.registrationType === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica' }}</h2>
    <form @submit.prevent="validateStep">
      <template v-if="formData.registrationType === 'PF'">
        <div class="form-group">
          <label class="label-text" for="name">Nome:</label>
          <input class="input-group" id="name" type="text" v-model="formData.name">
        </div>

        <div class="form-group">
          <label class="label-text" for="cpf">CPF:</label>
          <input class="input-group" id="cpf" type="text" v-model="formData.cpf"
            @input="event => applyCpfMask(event, formData)">
        </div>

        <div class="form-group">
          <label class="label-text" for="birthDate">Data de nascimento:</label>
          <input class="input-group" id="birthDate" type="text" v-model="formData.birthDate"
            @input="event => applyDateMask(event, formData, 'birthDate')">
        </div>

        <div class="form-group">
          <label class="label-text" for="phone">Telefone:</label>
          <input class="input-group" id="phone" type="text" v-model="formData.phone"
            @input="event => applyPhoneMask(event, formData, 'phone')">
        </div>
      </template>

      <template v-else-if="formData.registrationType === 'PJ'">
        <div class="form-group">
          <label class="label-text" for="companyName">Razão Social:</label>
          <input class="input-group" id="companyName" type="text" v-model="formData.companyName">
        </div>

        <div class="form-group">
          <label class="label-text" for="cnpj">CNPJ:</label>
          <input class="input-group" id="cnpj" type="text" v-model="formData.cnpj"
            @input="event => applyCnpjMask(event, formData)">
        </div>

        <div class="form-group">
          <label class="label-text" for="companyOpeningDate">Data de abertura:</label>
          <input class="input-group" id="companyOpeningDate" type="text" v-model="formData.companyOpeningDate"
            @input="event => applyDateMask(event, formData, 'companyOpeningDate')">
        </div>

        <div class="form-group">
          <label class="label-text" for="companyPhone">Telefone:</label>
          <input class="input-group" id="companyPhone" type="text" v-model="formData.companyPhone"
            @input="event => applyPhoneMask(event, formData, 'companyPhone')">
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
import { applyCpfMask, applyCnpjMask, applyDateMask, applyPhoneMask, isValidName, isValidCpf, isValidDate, isValidCnpj, isValidPhone } from '../helpers/maskHelpers';

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
        else if (!isValidPhone(formData.phone)) {
          alert('Telefone inválido.');
          return;
        }
      } else if (formData.registrationType === 'PJ') {
        if (!isValidName(formData.companyName)) {
          alert('Formato de Razão Social inválido.');
          return;
        } else if (!isValidCnpj(formData.cnpj)) {
          alert('Formato de CNPJ inválido.');
          return;
        } else if (!isValidDate(formData.companyOpeningDate)) {
          alert('Formato de Data de abertura inválido.');
          return;
        }
        else if (!isValidPhone(formData.companyPhone)) {
          alert('Telefone inválido.');
          return;
        }
      }

      emit('validated', formData);
    };

    return {
      validateStep,
      applyCpfMask,
      applyCnpjMask,
      applyDateMask,
      applyPhoneMask,
      isValidName,
      isValidCpf,
      isValidDate,
      isValidCnpj,
      isValidPhone

    };
  }
};
</script>
