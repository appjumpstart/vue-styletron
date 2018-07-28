<template>
  <div :class="`${style({ fontSize: '48px', textAlign: 'center' })} my-5`">
    <container />
  </div>
</template>

<script>
import Container from './Container'

export default {
  name: 'HelloMessage',
  components: { Container }
}
</script>
