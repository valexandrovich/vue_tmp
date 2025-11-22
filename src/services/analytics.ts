/**
 * Сервис для сбора информации о пользователе и его устройстве
 * для BigData аналитики
 */

export interface UserDeviceInfo {
  // Браузер
  userAgent: string
  browserName: string
  browserVersion: string
  engine: string
  vendor: string
  appName: string
  appVersion: string
  appCodeName: string
  
  // Операционная система
  os: string
  osVersion: string
  platform: string
  
  // Устройство
  deviceType: 'desktop' | 'mobile' | 'tablet'
  deviceVendor: string
  deviceModel: string
  
  // Экран
  screenWidth: number
  screenHeight: number
  screenColorDepth: number
  screenPixelRatio: number
  viewportWidth: number
  viewportHeight: number
  screenAvailWidth: number
  screenAvailHeight: number
  screenOrientation?: string
  
  // Язык и локализация
  language: string
  languages: string[]
  timezone: string
  timezoneOffset: number
  
  // Сеть
  connectionType?: string
  connectionEffectiveType?: string
  downlink?: number
  rtt?: number
  saveData?: boolean
  
  // Дополнительная информация
  cookieEnabled: boolean
  onlineStatus: boolean
  referrer: string
  url: string
  timestamp: string
  protocol: string
  host: string
  hostname: string
  port: string
  pathname: string
  search: string
  hash: string
  
  // Уникальный идентификатор сессии
  sessionId: string
  visitorId: string
  
  // Производительность
  hardwareConcurrency?: number
  deviceMemory?: number
  maxTouchPoints?: number
  
  // Хранилища
  cookies: Record<string, string>
  localStorage: Record<string, string>
  sessionStorage: Record<string, string>
  localStorageSize: number
  sessionStorageSize: number
  
  // Плагины браузера
  plugins: Array<{ name: string; description: string; filename: string }>
  mimeTypes: Array<{ type: string; description: string; suffixes: string }>
  
  // Дополнительные возможности
  doNotTrack: string | null
  geolocation: boolean
  notifications: boolean
  webgl: {
    vendor: string
    renderer: string
    version: string
  } | null
  canvasFingerprint: string
  
  // Безопасность
  isSecureContext: boolean
  permissions: Record<string, string>
}

/**
 * Получить информацию о браузере из User Agent
 */
function getBrowserInfo(): { name: string; version: string; engine: string } {
  const ua = navigator.userAgent
  let browserName = 'Unknown'
  let browserVersion = 'Unknown'
  let engine = 'Unknown'
  
  // Определение движка
  if (ua.includes('Chrome') && !ua.includes('Edg')) {
    engine = 'Blink'
  } else if (ua.includes('Firefox')) {
    engine = 'Gecko'
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    engine = 'WebKit'
  } else if (ua.includes('Edg')) {
    engine = 'Blink'
  }
  
  // Определение браузера
  if (ua.includes('Chrome') && !ua.includes('Edg')) {
    browserName = 'Chrome'
    const match = ua.match(/Chrome\/(\d+)/)
    browserVersion = match ? match[1] : 'Unknown'
  } else if (ua.includes('Firefox')) {
    browserName = 'Firefox'
    const match = ua.match(/Firefox\/(\d+)/)
    browserVersion = match ? match[1] : 'Unknown'
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    browserName = 'Safari'
    const match = ua.match(/Version\/(\d+)/)
    browserVersion = match ? match[1] : 'Unknown'
  } else if (ua.includes('Edg')) {
    browserName = 'Edge'
    const match = ua.match(/Edg\/(\d+)/)
    browserVersion = match ? match[1] : 'Unknown'
  } else if (ua.includes('Opera') || ua.includes('OPR')) {
    browserName = 'Opera'
    const match = ua.match(/(?:Opera|OPR)\/(\d+)/)
    browserVersion = match ? match[1] : 'Unknown'
  }
  
  return { name: browserName, version: browserVersion, engine }
}

/**
 * Получить информацию об операционной системе
 */
function getOSInfo(): { os: string; osVersion: string; platform: string } {
  const ua = navigator.userAgent
  const platform = navigator.platform
  let os = 'Unknown'
  let osVersion = 'Unknown'
  
  if (ua.includes('Windows')) {
    os = 'Windows'
    if (ua.includes('Windows NT 10.0')) osVersion = '10'
    else if (ua.includes('Windows NT 6.3')) osVersion = '8.1'
    else if (ua.includes('Windows NT 6.2')) osVersion = '8'
    else if (ua.includes('Windows NT 6.1')) osVersion = '7'
  } else if (ua.includes('Mac OS X') || ua.includes('Macintosh')) {
    os = 'macOS'
    const match = ua.match(/Mac OS X (\d+[._]\d+)/)
    osVersion = match ? match[1].replace('_', '.') : 'Unknown'
  } else if (ua.includes('Linux')) {
    os = 'Linux'
  } else if (ua.includes('Android')) {
    os = 'Android'
    const match = ua.match(/Android (\d+\.?\d*)/)
    osVersion = match ? match[1] : 'Unknown'
  } else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) {
    os = 'iOS'
    const match = ua.match(/OS (\d+[._]\d+)/)
    osVersion = match ? match[1].replace('_', '.') : 'Unknown'
  }
  
  return { os, osVersion, platform }
}

/**
 * Определить тип устройства
 */
function getDeviceType(): 'desktop' | 'mobile' | 'tablet' {
  const ua = navigator.userAgent
  const width = window.screen.width
  
  if (/tablet|ipad|playbook|silk/i.test(ua) || (width >= 600 && width < 1024)) {
    return 'tablet'
  }
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua) || width < 600) {
    return 'mobile'
  }
  return 'desktop'
}

/**
 * Получить информацию об устройстве
 */
function getDeviceInfo(): { vendor: string; model: string } {
  const ua = navigator.userAgent
  let vendor = 'Unknown'
  let model = 'Unknown'
  
  if (ua.includes('iPhone')) {
    vendor = 'Apple'
    const match = ua.match(/iPhone(\d+,\d+)/)
    model = match ? `iPhone ${match[1]}` : 'iPhone'
  } else if (ua.includes('iPad')) {
    vendor = 'Apple'
    model = 'iPad'
  } else if (ua.includes('Android')) {
    const match = ua.match(/Android.*?;\s([^)]+)\)/)
    if (match) {
      const deviceInfo = match[1].split(';')
      vendor = deviceInfo[0]?.trim() || 'Unknown'
      model = deviceInfo[1]?.trim() || 'Unknown'
    }
  } else {
    vendor = navigator.vendor || 'Unknown'
  }
  
  return { vendor, model }
}

/**
 * Получить или создать уникальный идентификатор посетителя
 */
function getVisitorId(): string {
  const storageKey = 'analytics_visitor_id'
  let visitorId = localStorage.getItem(storageKey)
  
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem(storageKey, visitorId)
  }
  
  return visitorId
}

/**
 * Получить или создать идентификатор сессии
 */
function getSessionId(): string {
  const storageKey = 'analytics_session_id'
  const sessionTimeout = 30 * 60 * 1000 // 30 минут
  const lastActivityKey = 'analytics_last_activity'
  
  const lastActivity = localStorage.getItem(lastActivityKey)
  const now = Date.now()
  
  // Если прошло больше 30 минут, создаем новую сессию
  if (!lastActivity || (now - parseInt(lastActivity)) > sessionTimeout) {
    const sessionId = `session_${now}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem(storageKey, sessionId)
    localStorage.setItem(lastActivityKey, now.toString())
    return sessionId
  }
  
  // Обновляем время последней активности
  localStorage.setItem(lastActivityKey, now.toString())
  
  return localStorage.getItem(storageKey) || `session_${now}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Получить информацию о сетевом соединении
 */
function getConnectionInfo(): { 
  type?: string
  effectiveType?: string
  downlink?: number
  rtt?: number
  saveData?: boolean
} {
  const nav = navigator as any
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection
  
  if (connection) {
    return {
      type: connection.type,
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData
    }
  }
  
  return {}
}

/**
 * Получить все куки
 */
function getAllCookies(): Record<string, string> {
  const cookies: Record<string, string> = {}
  
  if (document.cookie) {
    document.cookie.split(';').forEach(cookie => {
      const [name, ...rest] = cookie.trim().split('=')
      if (name) {
        cookies[name] = rest.join('=')
      }
    })
  }
  
  return cookies
}

/**
 * Получить все данные из localStorage
 */
function getAllLocalStorage(): Record<string, string> {
  const storage: Record<string, string> = {}
  
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) {
        storage[key] = localStorage.getItem(key) || ''
      }
    }
  } catch (e) {
    console.error('Error reading localStorage:', e)
  }
  
  return storage
}

/**
 * Получить все данные из sessionStorage
 */
function getAllSessionStorage(): Record<string, string> {
  const storage: Record<string, string> = {}
  
  try {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)
      if (key) {
        storage[key] = sessionStorage.getItem(key) || ''
      }
    }
  } catch (e) {
    console.error('Error reading sessionStorage:', e)
  }
  
  return storage
}

/**
 * Получить размер хранилища в байтах
 */
function getStorageSize(storage: Storage): number {
  let total = 0
  try {
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i)
      if (key) {
        const value = storage.getItem(key) || ''
        total += key.length + value.length
      }
    }
  } catch (e) {
    console.error('Error calculating storage size:', e)
  }
  return total
}

/**
 * Получить информацию о плагинах браузера
 */
function getPluginsInfo(): Array<{ name: string; description: string; filename: string }> {
  const plugins: Array<{ name: string; description: string; filename: string }> = []
  
  try {
    for (let i = 0; i < navigator.plugins.length; i++) {
      const plugin = navigator.plugins[i]
      plugins.push({
        name: plugin.name,
        description: plugin.description,
        filename: plugin.filename || ''
      })
    }
  } catch (e) {
    console.error('Error reading plugins:', e)
  }
  
  return plugins
}

/**
 * Получить информацию о MIME типах
 */
function getMimeTypesInfo(): Array<{ type: string; description: string; suffixes: string }> {
  const mimeTypes: Array<{ type: string; description: string; suffixes: string }> = []
  
  try {
    for (let i = 0; i < navigator.mimeTypes.length; i++) {
      const mimeType = navigator.mimeTypes[i]
      mimeTypes.push({
        type: mimeType.type,
        description: mimeType.description,
        suffixes: mimeType.suffixes || ''
      })
    }
  } catch (e) {
    console.error('Error reading mimeTypes:', e)
  }
  
  return mimeTypes
}

/**
 * Получить информацию о WebGL
 */
function getWebGLInfo(): { vendor: string; renderer: string; version: string } | null {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
      if (debugInfo) {
        return {
          vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
          renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
          version: gl.getParameter(gl.VERSION) || ''
        }
      }
    }
  } catch (e) {
    console.error('Error getting WebGL info:', e)
  }
  
  return null
}

/**
 * Получить Canvas fingerprint
 */
function getCanvasFingerprint(): string {
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.textBaseline = 'top'
      ctx.font = '14px Arial'
      ctx.textBaseline = 'alphabetic'
      ctx.fillStyle = '#f60'
      ctx.fillRect(125, 1, 62, 20)
      ctx.fillStyle = '#069'
      ctx.fillText('Canvas fingerprint', 2, 15)
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
      ctx.fillText('Canvas fingerprint', 4, 17)
      return canvas.toDataURL()
    }
  } catch (e) {
    console.error('Error getting canvas fingerprint:', e)
  }
  
  return ''
}

/**
 * Получить информацию о разрешениях
 */
async function getPermissionsInfo(): Promise<Record<string, string>> {
  const permissions: Record<string, string> = {}
  const permissionNames = ['geolocation', 'notifications', 'camera', 'microphone', 'persistent-storage']
  
  for (const name of permissionNames) {
    try {
      const result = await (navigator.permissions as any)?.query({ name })
      permissions[name] = result?.state || 'unknown'
    } catch (e) {
      permissions[name] = 'not supported'
    }
  }
  
  return permissions
}

/**
 * Собрать всю информацию о пользователе и устройстве
 */
export async function collectUserDeviceInfo(): Promise<UserDeviceInfo> {
  const browserInfo = getBrowserInfo()
  const osInfo = getOSInfo()
  const deviceInfo = getDeviceInfo()
  const deviceType = getDeviceType()
  const connectionInfo = getConnectionInfo()
  const cookies = getAllCookies()
  const localStorage = getAllLocalStorage()
  const sessionStorage = getAllSessionStorage()
  const plugins = getPluginsInfo()
  const mimeTypes = getMimeTypesInfo()
  const webgl = getWebGLInfo()
  const canvasFingerprint = getCanvasFingerprint()
  const permissions = await getPermissionsInfo()
  
  // Получить ориентацию экрана
  let screenOrientation: string | undefined
  try {
    screenOrientation = (screen as any).orientation?.type || 
                       (screen as any).orientation?.angle?.toString() || 
                       window.orientation?.toString() || 
                       'unknown'
  } catch (e) {
    screenOrientation = 'unknown'
  }
  
  return {
    // Браузер
    userAgent: navigator.userAgent,
    browserName: browserInfo.name,
    browserVersion: browserInfo.version,
    engine: browserInfo.engine,
    vendor: navigator.vendor,
    appName: navigator.appName,
    appVersion: navigator.appVersion,
    appCodeName: navigator.appCodeName,
    
    // Операционная система
    os: osInfo.os,
    osVersion: osInfo.osVersion,
    platform: osInfo.platform,
    
    // Устройство
    deviceType,
    deviceVendor: deviceInfo.vendor,
    deviceModel: deviceInfo.model,
    
    // Экран
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    screenColorDepth: window.screen.colorDepth,
    screenPixelRatio: window.devicePixelRatio || 1,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    screenAvailWidth: window.screen.availWidth,
    screenAvailHeight: window.screen.availHeight,
    screenOrientation,
    
    // Язык и локализация
    language: navigator.language,
    languages: navigator.languages || [navigator.language],
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: new Date().getTimezoneOffset(),
    
    // Сеть
    connectionType: connectionInfo.type,
    connectionEffectiveType: connectionInfo.effectiveType,
    downlink: connectionInfo.downlink,
    rtt: connectionInfo.rtt,
    saveData: connectionInfo.saveData,
    
    // Дополнительная информация
    cookieEnabled: navigator.cookieEnabled,
    onlineStatus: navigator.onLine,
    referrer: document.referrer,
    url: window.location.href,
    protocol: window.location.protocol,
    host: window.location.host,
    hostname: window.location.hostname,
    port: window.location.port,
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    timestamp: new Date().toISOString(),
    
    // Идентификаторы
    sessionId: getSessionId(),
    visitorId: getVisitorId(),
    
    // Производительность
    hardwareConcurrency: navigator.hardwareConcurrency,
    deviceMemory: (navigator as any).deviceMemory,
    maxTouchPoints: navigator.maxTouchPoints || 0,
    
    // Хранилища
    cookies,
    localStorage,
    sessionStorage,
    localStorageSize: getStorageSize(window.localStorage),
    sessionStorageSize: getStorageSize(window.sessionStorage),
    
    // Плагины браузера
    plugins,
    mimeTypes,
    
    // Дополнительные возможности
    doNotTrack: navigator.doNotTrack || null,
    geolocation: 'geolocation' in navigator,
    notifications: 'Notification' in window,
    webgl,
    canvasFingerprint,
    
    // Безопасность
    isSecureContext: window.isSecureContext,
    permissions
  }
}

