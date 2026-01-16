<template>
  <div class="rounded-2xl p-6
         bg-gradient-to-br from-slate-900 via-slate-800 to-black
         border border-lime-400/30
         shadow-[0_0_30px_rgba(163,230,53,0.1)]">
    <div class="object-contain">
      <img :src="img" :alt="name"  class="w-full"/>
    </div>
    <div class="flex flex-col gap-[0.5rem] pb-2">
      <p class="text-slate-300 leading-relaxed text-xl font-['Shadows_Into_Light']"><strong>Nombre</strong> {{ name }}</p>
      <p class="text-slate-300 leading-relaxed font-['Shadows_Into_Light']"><strong>Estado</strong> {{ state }}</p>
      <p class="text-slate-300 leading-relaxed font-['Shadows_Into_Light']"><strong>Genero</strong> {{ sex }}</p>
    </div>
    <button @click="handleClick" :id="id" class="px-6 py-3 rounded-xl font-semibold text-black
         bg-lime-400
         hover:bg-lime-300
         active:bg-lime-500
         shadow-[0_0_20px_rgba(163,230,53,0.3)]
         hover:shadow-[0_0_30px_rgba(163,230,53,0.5)]
         transition-all duration-300 cursor-pointer w-full font-['Bebas_Neue'] tracking-widest">{{ label }}</button>
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
