/**
 * API сервис для отправки аналитических данных на сервер
 */

import type { UserDeviceInfo } from './analytics'

// URL вашего сервера для приема данных
// В продакшене это должен быть реальный URL вашего API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

/**
 * Отправить данные о пользователе на сервер
 */
export async function sendAnalyticsData(data: UserDeviceInfo): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      // Отправка в фоне, не блокируем UI
      keepalive: true
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    console.log('Analytics data sent successfully')
  } catch (error) {
    // В продакшене можно использовать сервис для логирования ошибок
    console.error('Failed to send analytics data:', error)
    
    // Опционально: сохранить данные в localStorage для повторной отправки
    saveFailedAnalytics(data)
  }
}

/**
 * Сохранить неудачно отправленные данные для повторной попытки
 */
function saveFailedAnalytics(data: UserDeviceInfo): void {
  try {
    const failed = JSON.parse(localStorage.getItem('failed_analytics') || '[]')
    failed.push({
      data,
      timestamp: Date.now(),
      attempts: 0
    })
    
    // Храним максимум 50 неудачных попыток
    const trimmed = failed.slice(-50)
    localStorage.setItem('failed_analytics', JSON.stringify(trimmed))
  } catch (error) {
    console.error('Failed to save analytics data:', error)
  }
}

/**
 * Повторно отправить неудачно отправленные данные
 */
export async function retryFailedAnalytics(): Promise<void> {
  try {
    const failed = JSON.parse(localStorage.getItem('failed_analytics') || '[]')
    
    if (failed.length === 0) return

    const toRetry = failed.filter((item: any) => item.attempts < 3)
    
    for (const item of toRetry) {
      try {
        await sendAnalyticsData(item.data)
        // Удаляем успешно отправленные
        const updated = failed.filter((f: any) => f !== item)
        localStorage.setItem('failed_analytics', JSON.stringify(updated))
      } catch (error) {
        // Увеличиваем счетчик попыток
        item.attempts = (item.attempts || 0) + 1
        const updated = failed.map((f: any) => 
          f === item ? item : f
        )
        localStorage.setItem('failed_analytics', JSON.stringify(updated))
      }
    }
  } catch (error) {
    console.error('Failed to retry analytics:', error)
  }
}

/**
 * Отправить событие пользователя (клики, переходы и т.д.)
 */
export async function sendUserEvent(
  eventType: string,
  eventData?: Record<string, any>
): Promise<void> {
  try {
    const event = {
      eventType,
      eventData,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      sessionId: localStorage.getItem('analytics_session_id'),
      visitorId: localStorage.getItem('analytics_visitor_id')
    }

    await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
      keepalive: true
    })
  } catch (error) {
    console.error('Failed to send user event:', error)
  }
}

