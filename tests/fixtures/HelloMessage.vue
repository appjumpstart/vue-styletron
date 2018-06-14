<template>
  <div :class="`${styles.hello} mr-5`">
    Hello!
  </div>
</template>

<script>
export default {
  name: 'HelloMessage',
  styles: { hello: { fontSize: '48px', textAlign: 'center' } }
}
</script>
