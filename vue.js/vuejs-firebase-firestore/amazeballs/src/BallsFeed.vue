<template>
  <div>
    <p v-for="ball in store.ballsInFeed" :key="ball.id">
      <span>{{ball.author_name}}:</span>
      {{ball.message}}
    </p>
  </div>
</template>

<script>
import { store } from "./store";

export default {
  data() {
    return {
      store
    };
  }
};
</script>