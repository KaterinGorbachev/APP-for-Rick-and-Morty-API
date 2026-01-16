<template>
  <div class="bg-[#fff] p-1  gap-[2rem] flex flex-col">
    <div class="object-contain">
      <img :src="img" :alt="name"  class="w-full"/>
    </div>
    <div class="flex flex-col gap-[1rem]">
      <p><strong>Nombre</strong> {{ name }}</p>
      <p><strong>Estado</strong> {{ state }}</p>
      <p><strong>Genero</strong> {{ sex }}</p>
    </div>
    <button @click="handleClick" :id="id" class="rounded-[5px] bg-amber-500 p-3 cursor-pointer">{{ label }}</button>
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
    type: Number,
  },
})

const emits = defineEmits(['action-onclick'])
function handleClick() {
  emits('action-onclick', props)
}
</script>

<style></style>
