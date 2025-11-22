<template>
  <div class="contacts">
    <h1>Контакты</h1>
    <div class="contact-info">
      <p><strong>Email:</strong> info@example.com</p>
      <p><strong>Телефон:</strong> +7 (999) 123-45-67</p>
      <p><strong>Адрес:</strong> г. Москва, ул. Примерная, д. 1</p>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.contacts {
  text-align: center;
  padding: 2rem;
}

.contacts h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.contact-info {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  margin: 0 auto;
  text-align: left;
}

.contact-info p {
  color: #34495e;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.contact-info strong {
  color: #2c3e50;
}
</style>

