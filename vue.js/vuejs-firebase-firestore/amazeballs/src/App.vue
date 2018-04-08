<template>
  <div id="app">
    <div class="logo">Amazeballs</div>
    <Login v-if="!store.currentUser" />
    <div v-else>
      <button @click="logout">Log out</button>
      <InputForm />
      <BallsFeed />
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

import { store } from "./store";
import Login from "./Login";
import InputForm from "./InputForm";
import BallsFeed from "./BallsFeed";

export default {
  components: { Login, InputForm, BallsFeed },
  data() {
    return {
      store
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .catch(err => alert(err.message || err));
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.logo {
  font-size: 300%;
  font-weight: bold;
  font-variant: small-caps;
  text-shadow: 2px 2px #ff0000;
}

input,
button {
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px #ddd;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 12px;
  padding-bottom: 12px;
}
</style>
