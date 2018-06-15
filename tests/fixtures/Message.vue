<template>
  <div :class="styles.message">
    Hello!
  </div>
</template>

<script>
export default {
  name: 'Message',
  styles: { message: { fontWeight: 'bold' } }
}
</script>
