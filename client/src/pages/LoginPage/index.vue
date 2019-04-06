<template>
<v-container fluid>
  <v-layout>
    <v-flex>
      <login-form></login-form>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import LoginForm from './LoginForm.vue'

export default {
  components: {
    LoginForm
  }
}
</script>

<style>

</style>
