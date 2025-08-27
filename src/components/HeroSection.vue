<template>
  <section class="hero-section">
    <div class="hero-content">
      <h1>Welcome to Peter's Fullstack Corner</h1>
      <h2>ALSO KNOWN AS... BLIGGITY-BLOG...🔥🧑‍💻</h2>
      <p>Discover a collection of my fullstack and other projects in one place.</p>
    </div>
    <div class="hero-image">
      <img src="/src/assets/rocket.png" alt="Rocket" class="rocket-image" />
    </div>
  </section>
</template>

<script setup>
// No script needed for this simple hero section
</script>

<style scoped>
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;
}

.dark .hero-section {
  background-color: #1a202c;
}

.hero-content {
  z-index: 1;
}

h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

h2 {
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 1.5rem;
}

.dark h2 {
  color: #bbb;
}

p {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.dark p {
  color: #ccc;
}

.hero-image {
  position: absolute;
  bottom: -20px; /* Adjust as needed */
  right: -20px; /* Adjust as needed */
  opacity: 0.1;
  z-index: 0;
}

.rocket-image {
  width: 300px; /* Adjust size as needed */
  height: auto;
}

@media (min-width: 768px) {
  .hero-section {
    flex-direction: row;
    text-align: left;
    justify-content: center;
  }

  .hero-content {
    margin-right: 2rem;
  }

  .hero-image {
    position: static;
    opacity: 1;
  }
}
</style>


