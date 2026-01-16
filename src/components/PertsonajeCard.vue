<template>
  <div>
    <div>
      <img :src="img" :alt="name">
    </div>
    <div>
      <p>Nombre {{ name }}</p>
      <p>Estado {{ state }}</p>
      <p>Genero {{ sex }}</p>
    </div>
    <button @click="emits('action-onclick')">{{ label }}</button>
  </div>

</template>

<script setup>
  defineProps({
    img: {
      type: String,
    },
    name: {
      type: String,
    },
    state: {
      type: String,
    },
    sex: {
      type: String,
    },
    label: {
      type: String,
    },
  })

  const emits = defineEmits(['action-onclick'])

</script>

<style>

</style>
