<template>
  <div id="app">
    <div id="nav">
      <router-link to="/agenda#month">Agenda</router-link> |
      <router-link to="/tarefas">Tarefas</router-link> |
      <router-link to="/projetos">Projetos</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
body{
  background: #1ac4aa;
}
#app {
  font-family: 'Montserrat', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: white;
    }
  }
}
</style>
