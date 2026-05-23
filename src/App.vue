<template>
  <div id="app">
    <RouterView />
    <DynamicDialog />
  </div>
</template>

<script setup>
import DynamicDialog from 'primevue/dynamicdialog'
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #f8fafc;
}
</style>
