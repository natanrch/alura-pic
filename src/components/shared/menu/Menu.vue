<template>
    <nav>
      <ul v-for="route in routes">       
        <li><router-link :to="route.path ? route.path : '/'">{{route.titulo}}</router-link></li>

      </ul>
    </nav>
</template>

<script>

  export default {
    props : {
      routes : {
        type : Array,
        required : true,
      }

    }
  }

</script>

<style>


</style>
