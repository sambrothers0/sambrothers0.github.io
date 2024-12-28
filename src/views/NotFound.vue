<template>
    <div class="not-found">
      <div class="content">
        <h1 class="error-code">404</h1>
        <p class="message">Oops! The page you're looking for can't be found.</p>
        <router-link to="/" class="home-link">Back to Home</router-link>
      </div>
    </div>
</template>
  
<script>
  export default {
    name: "NotFound",
  };
</script>
  
<style scoped>
 
.not-found {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: var(--dark-color);
    color: var(--light-color);
    text-align: center;
    font-family: 'Arial', sans-serif;
}
  
.content {
    max-width: 600px;
    padding: 20px;
}
  
.error-code {
    font-size: 8rem;
    font-weight: bold;
    color: var(--gold-color);
    margin: 0;
}
  
.message {
    font-size: 1.5rem;
    margin: 20px 0;
    color: var(--light-color);
}
  
.home-link {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1rem;
    text-decoration: none;
    color: var(--dark-color);
    background-color: var(--light-color);
    border-radius: 15px;
    transition: background-color 0.3s ease, color 0.3s ease;
}
  
.home-link:hover {
    background-color: #898989;
    color: var(--dark-color);
}
</style>
  