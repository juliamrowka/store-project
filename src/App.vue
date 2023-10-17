<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 /* margin-top: 60px; */
}

body {
  padding: 0;
  margin: 0;
}

.logo {
    width: 100px;
}

.icon {
  width: 15px;
  cursor: pointer;
  margin-left: 15px;
}

/* .register, .login, .add {

} */

.register input, .login input, .add input, .forgot input, .admin input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 10px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid lightgray;
    border-radius: 10px;
}

.register button, .login button, .add button, .forgot button, .admin button {
    width: 320px;
    height: 40px;
    border: 1px solid lightgray;
    border-radius: 10px;
    background-color: gray;
    color: white;
    cursor: pointer;
}

.nav {
    background-color: #333;
    overflow: hidden;
}

.nav a {
    float: left;
    color: #f2f2f2;
    padding: 14px 16px;
    text-align: center;
    font-size: 17px;
    text-decoration: none;
    margin-right: 5px;
}

.nav a:hover {
    background: #ddd;
    color: #333;
}

td{
  width: 160px;
  height: 40px;
  
}

.error-msg {
  color: darkred;
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 20px;
}

</style>
