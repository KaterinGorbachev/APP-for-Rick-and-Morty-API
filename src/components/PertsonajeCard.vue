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
    <button @click="handleClick" :id="id">{{ label }}</button>
  </div>

</template>

<script setup>
  const props = defineProps({
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
    id: {
      type: Number
    }
  })

  const emits = defineEmits(['action-onclick'])
  function handleClick() {
    emits('action-onclick', props)
  }

</script>

<style>

</style>
