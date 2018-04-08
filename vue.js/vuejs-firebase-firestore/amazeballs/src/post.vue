<template>
  <form @submit.prevent="formPost">
    <textarea v-model="message" />
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
    }
  }
};
</script>