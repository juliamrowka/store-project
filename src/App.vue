<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>

div.card:hover {
  border-color: #acacac;
  width: 250px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.nav-link:hover {
  background-color: #333a41;
}

.nav-link.active {
  background-color: #487df8;
}

</style>
