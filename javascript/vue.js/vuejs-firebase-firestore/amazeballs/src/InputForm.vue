<template>
  <form @submit.prevent="formPost">
    <input type="text" autofocus ref="inputMessage" v-model="message" />
    <input type="submit" value="DUNK!" />
  </form>
</template>

<script>
import { store } from "./store";

export default {
  data() {
    return {
      message: null
    };
  },
  methods: {
    formPost() {
      store.writeBall(this.message);
      this.message = null;
      this.$refs.inputMessage.focus();
    }
  }
};
</script>