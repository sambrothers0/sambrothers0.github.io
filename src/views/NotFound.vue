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
    background-color: var(--bg);
    color: var(--text);
    text-align: center;
    font-family: 'Niramit', sans-serif;
}

.content {
    max-width: 600px;
    padding: 20px;
}

/* this page's one gold element */
.error-code {
    font-size: clamp(5rem, 18vw, 9rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.04em;
    color: var(--highlight);
    margin: 0;
}

.message {
    font-family: 'Outfit', sans-serif;
    font-size: 1.35rem;
    font-weight: 300;
    line-height: 1.5;
    margin: 24px 0 0;
    color: var(--text);
}

.home-link {
    display: inline-block;
    margin-top: 32px;
    padding: 12px 28px;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-decoration: none;
    color: var(--on-accent);
    background-color: var(--accent-fill);
    border: 2px solid transparent;
    border-radius: var(--radius-pill);
    box-shadow: var(--shadow-sm);
    transition: box-shadow var(--dur-med) var(--ease-out),
                background-color var(--dur-med) var(--ease-out),
                border-color var(--dur-med) var(--ease-out),
                transform var(--dur-med) var(--ease-out);
}

.home-link:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    background-color: var(--accent-fill-hover);
    border-color: var(--accent-strong);
}
</style>
  