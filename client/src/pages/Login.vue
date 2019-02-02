<template>
<v-container fluid>
  <div class="spacer hidden-sm-and-down"></div>
  <div
    id="LoginCard"
    style="max-width: 400px; margin: auto;"
    class="grey lighten-3"
  >
    <!-- <v-toolbar dark>
      <v-toolbar-title>{{ $t('login_title') }}</v-toolbar-title>
    </v-toolbar> -->

    <v-card>
      <v-container
        fluid
        grid-list-lg
      >
        <LoginForm />
      </v-container>
    </v-card>
  </div>
</v-container>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'

export default {
  components: {
    LoginForm
  }
}
</script>

<style>
.spacer {
  padding-top: 64px;
}
</style>
