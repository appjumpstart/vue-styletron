<template>
  <div :class="`${styles.hello} my-5`">
    <container />
  </div>
</template>

<script>
import Container from './Container'

export default {
  name: 'HelloMessage',
  styles: { hello: { fontSize: '48px', textAlign: 'center' } },
  components: { Container }
}
</script>
