<script setup>
import InputArea from './components/InputArea.vue'
import OutputArea from './components/OutputArea.vue'
import Toolbar from './components/Toolbar.vue'
</script>

<template>
  <main id="page">
    <header>
      <h1>Tricky JSON formatter</h1>

      <Toolbar />
    </header>

    <InputArea />

    <OutputArea />

    <footer>
      <p>Illustrations from <a href="https://absurd.design/">absurd.design</a></p>
    </footer>
  </main>
</template>