<template>
      <p>Etapa <span>{{ currentStep }}</span> de {{ totalSteps }}</p>
  </template>
  
  <script>
  export default {
    props: {
      currentStep: {
        type: Number,
        required: true
      },
      totalSteps: {
        type: Number,
        required: true
      }
    }
  };
  </script>
   
  