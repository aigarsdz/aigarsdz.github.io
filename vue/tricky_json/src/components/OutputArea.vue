<script setup>
	import state from '@/state'
</script>

<template>
	<textarea id="output_area" readonly :value="state.output"></textarea>
</template>