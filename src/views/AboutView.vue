<template>
  <div class="about">
    <h1>О нас</h1>
    <div class="about-content">
      <p>
        Мы - команда профессионалов, создающих качественные веб-приложения 
        с использованием современных технологий.
      </p>
      <p>
        Наша цель - предоставить пользователям лучший опыт взаимодействия 
        с нашими продуктами.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.about {
  text-align: center;
  padding: 2rem;
}

.about h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
}

.about-content p {
  color: #34495e;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}
</style>

