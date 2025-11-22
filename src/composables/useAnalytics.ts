/**
 * Composable для работы с аналитикой
 */

import { onMounted, onUnmounted } from 'vue'
import { collectUserDeviceInfo } from '../services/analytics'
import { sendAnalyticsData, sendUserEvent, retryFailedAnalytics } from '../services/api'

export function useAnalytics() {
  /**
   * Собрать и отправить данные о пользователе
   */
  const collectAndSend = async () => {
    const data = await collectUserDeviceInfo()
    await sendAnalyticsData(data)
  }

  /**
   * Отправить событие пользователя
   */
  const trackEvent = (eventType: string, eventData?: Record<string, any>) => {
    sendUserEvent(eventType, eventData)
  }

  /**
   * Инициализация аналитики при монтировании компонента
   */
  onMounted(() => {
    // Собираем данные при загрузке
    collectAndSend()
    
    // Пытаемся отправить ранее неудачные данные
    retryFailedAnalytics()
    
    // Отслеживаем изменения размера окна
    const handleResize = () => {
      trackEvent('window_resize', {
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    window.addEventListener('resize', handleResize)
    
    // Отслеживаем уход со страницы
    const handleBeforeUnload = () => {
      trackEvent('page_unload', {
        timeOnPage: Date.now() - parseInt(localStorage.getItem('analytics_page_load_time') || '0')
      })
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload)
    
    // Сохраняем время загрузки страницы
    localStorage.setItem('analytics_page_load_time', Date.now().toString())
    
    // Очистка при размонтировании
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    })
  })

  return {
    collectAndSend,
    trackEvent
  }
}

