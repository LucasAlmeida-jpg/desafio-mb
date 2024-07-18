<template>
    <div>
      <h2>Revise suas informações</h2>
      <form @submit.prevent="validateStep">
        <div>
          <div class="form-group">
            <label class="label-text" for="email">Endereço de email</label>
            <input class="input-group" id="email" type="text" v-model="formData.email">
          </div>
        </div>
        <div v-if="isPfRegistration">
          <div class="form-group">
            <label class="label-text" for="name">Nome</label>
            <input class="input-group" id="name" type="text" v-model="formData.name">
          </div>
          <div class="form-group">
            <label class="label-text" for="cpf">CPF</label>
            <input class="input-group" id="cpf" type="text" v-model="formData.cpf" @input="event => applyCpfMask(event, formData)">
          </div>
          <div class="form-group">
            <label class="label-text" for="birthDate">Data de nascimento</label>
            <input class="input-group" id="birthDate" type="text" v-model="formData.birthDate" @input="event => applyDateMask(event, formData, 'birthDate')">
          </div>
          <div class="form-group">
            <label class="label-text" for="phone">Telefone</label>
            <input class="input-group" id="phone" type="text" v-model="formData.phone"  @input="event => applyPhoneMask(event, formData, 'phone')">
          </div>
          <div class="form-group">
            <label class="label-text" for="password">Senha de acesso:</label>
            <input class="input-group" id="password" type="text" v-model="formData.password">
          </div>
        </div>
        <div v-else-if="isPjRegistration">
          <div class="form-group">
            <label class="label-text" for="companyName">Razão Social</label>
            <input class="input-group" id="companyName" type="text" v-model="formData.companyName">
          </div>
          <div class="form-group">
            <label class="label-text" for="cnpj">CNPJ</label>
            <input class="input-group" id="cnpj" type="text" v-model="formData.cnpj" @input="event => applyCnpjMask(event, formData)">
          </div>
          <div class="form-group">
            <label class="label-text" for="companyOpeningDate">Data de abertura</label>
            <input class="input-group" id="companyOpeningDate" type="text" v-model="formData.companyOpeningDate" @input="event => applyDateMask(event, formData, 'companyOpeningDate')">
          </div>
          <div class="form-group">
            <label class="label-text" for="companyPhone">Telefone</label>
            <input class="input-group" id="companyPhone" type="text" v-model="formData.companyPhone" @input="event => applyPhoneMask(event, formData, 'companyPhone')" >
          </div>
          <div class="form-group">
            <label class="label-text" for="password">Senha de acesso:</label>
            <input class="input-group" id="password" type="text" v-model="formData.passwordCompany">
          </div>
        </div>
        <div class="button-group">
          <button @click.prevent="$emit('back')" class="btn-outline">Voltar</button>
          <button type="submit" class="btn">Cadastrar</button>
        </div>
      </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { applyCpfMask, applyCnpjMask, applyDateMask, applyPhoneMask } from '../helpers/maskHelpers';

export default {
  props: ['formData'],
  setup(props, { emit }) {
    const isPfRegistration = ref(props.formData.registrationType === 'PF');
    const isPjRegistration = ref(props.formData.registrationType === 'PJ');

    const validateStep = () => {
      if (validateFormData()) {
        emit('form-submitted');      
      }
    };

    const validateFormData = () => {
      return true;
    };

    return {
      isPfRegistration,
      isPjRegistration,
      validateStep,
      applyCpfMask,
      applyCnpjMask,
      applyDateMask,
      applyPhoneMask,
    };
  }
};
</script>
