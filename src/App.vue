<template>

  <!-- wrapper -->
  <div class="dark:bg-slate-800 dark:text-white min-h-screen text-xs md:text-base">

    <Navigation />
  
    <router-view />
    
    <!-- footer -->
    <footer class="py-4 text-center border-t border-black dark:border-white mt-10">
        © 2022 Nolan BOISEL
    </footer>

  </div>

</template>

<script>
  import Navigation from './components/Nav.vue' 
  
  export default {
    name: 'App',
    components: {
      Navigation
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700;800&display=swap');

  body{
    font-family: 'Open Sans', sans-serif;
  }
</style>
