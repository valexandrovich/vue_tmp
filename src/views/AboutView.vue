<template>
  <div class="about">
    <h1>Информация о вашем устройстве</h1>
    <div v-if="loading" class="loading">Загрузка данных...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="deviceInfo" class="info-container">
      
      <!-- Браузер -->
      <section class="info-section">
        <h2>🌐 Браузер</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">User Agent:</span>
            <span class="value">{{ deviceInfo.userAgent }}</span>
          </div>
          <div class="info-item">
            <span class="label">Браузер:</span>
            <span class="value">{{ deviceInfo.browserName }} {{ deviceInfo.browserVersion }}</span>
          </div>
          <div class="info-item">
            <span class="label">Движок:</span>
            <span class="value">{{ deviceInfo.engine }}</span>
          </div>
          <div class="info-item">
            <span class="label">Производитель:</span>
            <span class="value">{{ deviceInfo.vendor }}</span>
          </div>
          <div class="info-item">
            <span class="label">App Name:</span>
            <span class="value">{{ deviceInfo.appName }}</span>
          </div>
          <div class="info-item">
            <span class="label">App Version:</span>
            <span class="value">{{ deviceInfo.appVersion }}</span>
          </div>
        </div>
      </section>

      <!-- Операционная система -->
      <section class="info-section">
        <h2>💻 Операционная система</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">ОС:</span>
            <span class="value">{{ deviceInfo.os }} {{ deviceInfo.osVersion }}</span>
          </div>
          <div class="info-item">
            <span class="label">Платформа:</span>
            <span class="value">{{ deviceInfo.platform }}</span>
          </div>
        </div>
      </section>

      <!-- Устройство -->
      <section class="info-section">
        <h2>📱 Устройство</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Тип:</span>
            <span class="value">{{ deviceInfo.deviceType }}</span>
          </div>
          <div class="info-item">
            <span class="label">Производитель:</span>
            <span class="value">{{ deviceInfo.deviceVendor }}</span>
          </div>
          <div class="info-item">
            <span class="label">Модель:</span>
            <span class="value">{{ deviceInfo.deviceModel }}</span>
          </div>
          <div class="info-item">
            <span class="label">Ядер CPU:</span>
            <span class="value">{{ deviceInfo.hardwareConcurrency || 'N/A' }}</span>
          </div>
          <div class="info-item">
            <span class="label">Память устройства:</span>
            <span class="value">{{ deviceInfo.deviceMemory ? deviceInfo.deviceMemory + ' GB' : 'N/A' }}</span>
          </div>
          <div class="info-item">
            <span class="label">Точек касания:</span>
            <span class="value">{{ deviceInfo.maxTouchPoints }}</span>
          </div>
        </div>
      </section>

      <!-- Экран -->
      <section class="info-section">
        <h2>🖥️ Экран</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Разрешение экрана:</span>
            <span class="value">{{ deviceInfo.screenWidth }} × {{ deviceInfo.screenHeight }}</span>
          </div>
          <div class="info-item">
            <span class="label">Доступное разрешение:</span>
            <span class="value">{{ deviceInfo.screenAvailWidth }} × {{ deviceInfo.screenAvailHeight }}</span>
          </div>
          <div class="info-item">
            <span class="label">Viewport:</span>
            <span class="value">{{ deviceInfo.viewportWidth }} × {{ deviceInfo.viewportHeight }}</span>
          </div>
          <div class="info-item">
            <span class="label">Глубина цвета:</span>
            <span class="value">{{ deviceInfo.screenColorDepth }} бит</span>
          </div>
          <div class="info-item">
            <span class="label">Pixel Ratio:</span>
            <span class="value">{{ deviceInfo.screenPixelRatio }}</span>
          </div>
          <div class="info-item">
            <span class="label">Ориентация:</span>
            <span class="value">{{ deviceInfo.screenOrientation }}</span>
          </div>
        </div>
      </section>

      <!-- Локализация -->
      <section class="info-section">
        <h2>🌍 Локализация</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Язык:</span>
            <span class="value">{{ deviceInfo.language }}</span>
          </div>
          <div class="info-item">
            <span class="label">Поддерживаемые языки:</span>
            <span class="value">{{ deviceInfo.languages.join(', ') }}</span>
          </div>
          <div class="info-item">
            <span class="label">Часовой пояс:</span>
            <span class="value">{{ deviceInfo.timezone }}</span>
          </div>
          <div class="info-item">
            <span class="label">Смещение:</span>
            <span class="value">{{ deviceInfo.timezoneOffset }} минут</span>
          </div>
        </div>
      </section>

      <!-- Сеть -->
      <section class="info-section">
        <h2>📡 Сеть</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Тип соединения:</span>
            <span class="value">{{ deviceInfo.connectionType || 'N/A' }}</span>
          </div>
          <div class="info-item">
            <span class="label">Эффективный тип:</span>
            <span class="value">{{ deviceInfo.connectionEffectiveType || 'N/A' }}</span>
          </div>
          <div class="info-item">
            <span class="label">Скорость (Mbps):</span>
            <span class="value">{{ deviceInfo.downlink || 'N/A' }}</span>
          </div>
          <div class="info-item">
            <span class="label">RTT (мс):</span>
            <span class="value">{{ deviceInfo.rtt || 'N/A' }}</span>
          </div>
          <div class="info-item">
            <span class="label">Экономия трафика:</span>
            <span class="value">{{ deviceInfo.saveData ? 'Да' : 'Нет' }}</span>
          </div>
          <div class="info-item">
            <span class="label">Онлайн:</span>
            <span class="value">{{ deviceInfo.onlineStatus ? 'Да' : 'Нет' }}</span>
          </div>
        </div>
      </section>

      <!-- URL информация -->
      <section class="info-section">
        <h2>🔗 URL информация</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Полный URL:</span>
            <span class="value">{{ deviceInfo.url }}</span>
          </div>
          <div class="info-item">
            <span class="label">Протокол:</span>
            <span class="value">{{ deviceInfo.protocol }}</span>
          </div>
          <div class="info-item">
            <span class="label">Хост:</span>
            <span class="value">{{ deviceInfo.host }}</span>
          </div>
          <div class="info-item">
            <span class="label">Hostname:</span>
            <span class="value">{{ deviceInfo.hostname }}</span>
          </div>
          <div class="info-item">
            <span class="label">Порт:</span>
            <span class="value">{{ deviceInfo.port || 'по умолчанию' }}</span>
          </div>
          <div class="info-item">
            <span class="label">Путь:</span>
            <span class="value">{{ deviceInfo.pathname }}</span>
          </div>
          <div class="info-item">
            <span class="label">Query:</span>
            <span class="value">{{ deviceInfo.search || 'нет' }}</span>
          </div>
          <div class="info-item">
            <span class="label">Hash:</span>
            <span class="value">{{ deviceInfo.hash || 'нет' }}</span>
          </div>
          <div class="info-item">
            <span class="label">Referrer:</span>
            <span class="value">{{ deviceInfo.referrer || 'нет' }}</span>
          </div>
        </div>
      </section>

      <!-- Куки -->
      <section class="info-section">
        <h2>🍪 Куки</h2>
        <div class="info-item">
          <span class="label">Куки включены:</span>
          <span class="value">{{ deviceInfo.cookieEnabled ? 'Да' : 'Нет' }}</span>
        </div>
        <div v-if="Object.keys(deviceInfo.cookies).length > 0" class="json-viewer-container">
          <JsonViewer :value="parsedCookies" :expand-depth="2" theme="jv-light" copyable />
        </div>
        <div v-else class="empty">Куки не найдены</div>
      </section>

      <!-- LocalStorage -->
      <section class="info-section">
        <h2>💾 LocalStorage</h2>
        <div class="info-item">
          <span class="label">Размер:</span>
          <span class="value">{{ deviceInfo.localStorageSize }} байт</span>
        </div>
        <div v-if="Object.keys(deviceInfo.localStorage).length > 0" class="json-viewer-container">
          <JsonViewer :value="parsedLocalStorage" :expand-depth="2" theme="jv-light" copyable />
        </div>
        <div v-else class="empty">LocalStorage пуст</div>
      </section>

      <!-- SessionStorage -->
      <section class="info-section">
        <h2>📦 SessionStorage</h2>
        <div class="info-item">
          <span class="label">Размер:</span>
          <span class="value">{{ deviceInfo.sessionStorageSize }} байт</span>
        </div>
        <div v-if="Object.keys(deviceInfo.sessionStorage).length > 0" class="json-viewer-container">
          <JsonViewer :value="parsedSessionStorage" :expand-depth="2" theme="jv-light" copyable />
        </div>
        <div v-else class="empty">SessionStorage пуст</div>
      </section>

      <!-- Плагины -->
      <section class="info-section">
        <h2>🔌 Плагины браузера</h2>
        <div v-if="deviceInfo.plugins.length > 0" class="plugins-list">
          <div v-for="(plugin, index) in deviceInfo.plugins" :key="index" class="plugin-item">
            <div><strong>Название:</strong> {{ plugin.name }}</div>
            <div><strong>Описание:</strong> {{ plugin.description }}</div>
            <div><strong>Файл:</strong> {{ plugin.filename || 'N/A' }}</div>
          </div>
        </div>
        <div v-else class="empty">Плагины не найдены</div>
      </section>

      <!-- MIME типы -->
      <section class="info-section">
        <h2>📄 MIME типы</h2>
        <div v-if="deviceInfo.mimeTypes.length > 0" class="mime-list">
          <div v-for="(mime, index) in deviceInfo.mimeTypes" :key="index" class="mime-item">
            <strong>{{ mime.type }}</strong> - {{ mime.description }} ({{ mime.suffixes }})
          </div>
        </div>
        <div v-else class="empty">MIME типы не найдены</div>
      </section>

      <!-- WebGL -->
      <section class="info-section" v-if="deviceInfo.webgl">
        <h2>🎮 WebGL</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Производитель:</span>
            <span class="value">{{ deviceInfo.webgl.vendor }}</span>
          </div>
          <div class="info-item">
            <span class="label">Рендерер:</span>
            <span class="value">{{ deviceInfo.webgl.renderer }}</span>
          </div>
          <div class="info-item">
            <span class="label">Версия:</span>
            <span class="value">{{ deviceInfo.webgl.version }}</span>
          </div>
        </div>
      </section>

      <!-- Разрешения -->
      <section class="info-section">
        <h2>🔐 Разрешения</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Geolocation:</span>
            <span class="value">{{ deviceInfo.geolocation ? 'Поддерживается' : 'Не поддерживается' }}</span>
          </div>
          <div class="info-item">
            <span class="label">Notifications:</span>
            <span class="value">{{ deviceInfo.notifications ? 'Поддерживается' : 'Не поддерживается' }}</span>
          </div>
          <div v-for="(status, permission) in deviceInfo.permissions" :key="permission" class="info-item">
            <span class="label">{{ permission }}:</span>
            <span class="value">{{ status }}</span>
          </div>
        </div>
      </section>

      <!-- Безопасность -->
      <section class="info-section">
        <h2>🔒 Безопасность</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Secure Context:</span>
            <span class="value">{{ deviceInfo.isSecureContext ? 'Да' : 'Нет' }}</span>
          </div>
          <div class="info-item">
            <span class="label">Do Not Track:</span>
            <span class="value">{{ deviceInfo.doNotTrack || 'Не установлено' }}</span>
          </div>
        </div>
      </section>

      <!-- Идентификаторы -->
      <section class="info-section">
        <h2>🆔 Идентификаторы</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Visitor ID:</span>
            <span class="value">{{ deviceInfo.visitorId }}</span>
          </div>
          <div class="info-item">
            <span class="label">Session ID:</span>
            <span class="value">{{ deviceInfo.sessionId }}</span>
          </div>
          <div class="info-item">
            <span class="label">Временная метка:</span>
            <span class="value">{{ deviceInfo.timestamp }}</span>
          </div>
        </div>
      </section>

      <!-- Canvas Fingerprint -->
      <section class="info-section">
        <h2>🎨 Canvas Fingerprint</h2>
        <div class="info-item">
          <span class="label">Fingerprint (первые 100 символов):</span>
          <span class="value small">{{ deviceInfo.canvasFingerprint.substring(0, 100) }}...</span>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { collectUserDeviceInfo } from '../services/analytics'
import type { UserDeviceInfo } from '../services/analytics'
import { JsonViewer } from 'vue3-json-viewer'
import 'vue3-json-viewer/dist/vue3-json-viewer.css'

const deviceInfo = ref<UserDeviceInfo | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

/**
 * Парсит значения хранилища, пытаясь распознать JSON
 */
function parseStorageValues(storage: Record<string, string>): Record<string, any> {
  const parsed: Record<string, any> = {}
  
  for (const [key, value] of Object.entries(storage)) {
    // Пытаемся распарсить как JSON
    if (value.trim().startsWith('{') || value.trim().startsWith('[')) {
      try {
        parsed[key] = JSON.parse(value)
      } catch {
        // Если не JSON, оставляем как строку
        parsed[key] = value
      }
    } else {
      parsed[key] = value
    }
  }
  
  return parsed
}

// Вычисляемые свойства для парсинга хранилищ
const parsedCookies = computed(() => {
  if (!deviceInfo.value) return {}
  return parseStorageValues(deviceInfo.value.cookies)
})

const parsedLocalStorage = computed(() => {
  if (!deviceInfo.value) return {}
  return parseStorageValues(deviceInfo.value.localStorage)
})

const parsedSessionStorage = computed(() => {
  if (!deviceInfo.value) return {}
  return parseStorageValues(deviceInfo.value.sessionStorage)
})

onMounted(async () => {
  try {
    loading.value = true
    deviceInfo.value = await collectUserDeviceInfo()
  } catch (e) {
    error.value = 'Ошибка при сборе данных: ' + (e instanceof Error ? e.message : String(e))
    console.error('Error collecting device info:', e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.about {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.about h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #e74c3c;
}

.info-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-section {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-section h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-item .label {
  font-weight: 600;
  color: #34495e;
  font-size: 0.9rem;
}

.info-item .value {
  color: #2c3e50;
  word-break: break-all;
  font-size: 0.95rem;
}

.info-item .value.small {
  font-size: 0.8rem;
  font-family: monospace;
}

.storage-list, .plugins-list, .mime-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

.storage-item, .plugin-item, .mime-item {
  background-color: white;
  padding: 0.75rem;
  border-radius: 4px;
  border-left: 3px solid #3498db;
  font-size: 0.9rem;
}

.plugin-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.plugin-item div {
  color: #34495e;
}

.mime-item {
  color: #34495e;
}

.empty {
  color: #7f8c8d;
  font-style: italic;
  margin-top: 0.5rem;
}

.json-viewer-container {
  margin-top: 1rem;
  background-color: white;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  overflow-x: auto;
  max-height: 600px;
  overflow-y: auto;
}

/* Стилизация vue3-json-viewer */
.json-viewer-container :deep(.jv-container) {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  background-color: transparent;
}

.json-viewer-container :deep(.jv-container.jv-light) {
  background-color: transparent;
}

.json-viewer-container :deep(.jv-key) {
  color: #881391;
  font-weight: 600;
}

.json-viewer-container :deep(.jv-string) {
  color: #1a1aa6;
}

.json-viewer-container :deep(.jv-number) {
  color: #1c00cf;
}

.json-viewer-container :deep(.jv-boolean) {
  color: #0e22a0;
}

.json-viewer-container :deep(.jv-null) {
  color: #808080;
}

.json-viewer-container :deep(.jv-ellipsis) {
  color: #666;
}

.json-viewer-container :deep(.jv-item) {
  margin: 2px 0;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .about {
    padding: 1rem;
  }
  
  .json-viewer-container {
    font-size: 11px;
  }
}
</style>
