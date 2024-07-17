<template>
    <div>
      <span>
        {{ errorMessage }}
      </span>
    </div>
  </template>
  <script>
  export default {
    props: ['errorMessage'],
  };
  
  </script>
  <style scoped>
  span {
    margin-top: 20px;
    text-align: center;
    position: absolute;
    top: 0;
    background: red;
    color: white;
    padding: 10px;
    border-radius: 12px;
    opacity: 0.8;
  }
  @media (max-width: 600px) {
  span {
    margin-top: 20px;
    text-align: center;
    position: relative !important;
    top: 0;
    background: red;
    color: white;
    padding: 10px;
    border-radius: 12px;
    opacity: 0.8;
    display: flex;
    align-items: center;
    justify-content: center;
}
}
  </style>