<template>
      <p>Etapa <span>{{ currentStep }}</span> de {{ totalSteps }}</p>
  </template>
  
  <script>
  export default {
    props: ['currentStep', 'totalSteps']
  };
  </script>
   
  