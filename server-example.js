/**
 * ПРИМЕР серверного endpoint для приема аналитических данных
 * 
 * Это пример для Node.js/Express. Адаптируйте под ваш стек.
 * 
 * Установка зависимостей:
 * npm install express cors body-parser
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Хранилище данных (в продакшене используйте БД: MongoDB, PostgreSQL, etc.)
const analyticsData = [];

/**
 * Endpoint для приема данных о пользователе и устройстве
 * POST /api/analytics
 */
app.post('/api/analytics', (req, res) => {
  try {
    const data = req.body;
    
    // Валидация данных
    if (!data.userAgent || !data.sessionId) {
      return res.status(400).json({ error: 'Invalid data' });
    }
    
    // Добавление IP адреса (на сервере)
    data.ipAddress = req.ip || req.connection.remoteAddress;
    
    // Сохранение в хранилище (в продакшене - в БД)
    analyticsData.push({
      ...data,
      receivedAt: new Date().toISOString()
    });
    
    console.log('Analytics data received:', {
      sessionId: data.sessionId,
      visitorId: data.visitorId,
      userAgent: data.userAgent,
      deviceType: data.deviceType,
      os: data.os,
      browser: data.browserName
    });
    
    res.status(200).json({ success: true, message: 'Data received' });
  } catch (error) {
    console.error('Error processing analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Endpoint для приема событий пользователя
 * POST /api/events
 */
app.post('/api/events', (req, res) => {
  try {
    const event = req.body;
    
    // Сохранение события (в продакшене - в БД)
    console.log('User event received:', event);
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Endpoint для получения статистики (опционально)
 * GET /api/stats
 */
app.get('/api/stats', (req, res) => {
  const stats = {
    totalRecords: analyticsData.length,
    uniqueVisitors: new Set(analyticsData.map(d => d.visitorId)).size,
    uniqueSessions: new Set(analyticsData.map(d => d.sessionId)).size,
    deviceTypes: analyticsData.reduce((acc, d) => {
      acc[d.deviceType] = (acc[d.deviceType] || 0) + 1;
      return acc;
    }, {}),
    browsers: analyticsData.reduce((acc, d) => {
      acc[d.browserName] = (acc[d.browserName] || 0) + 1;
      return acc;
    }, {}),
    os: analyticsData.reduce((acc, d) => {
      acc[d.os] = (acc[d.os] || 0) + 1;
      return acc;
    }, {})
  };
  
  res.json(stats);
});

app.listen(PORT, () => {
  console.log(`Analytics server running on http://localhost:${PORT}`);
  console.log(`Endpoints:`);
  console.log(`  POST http://localhost:${PORT}/api/analytics`);
  console.log(`  POST http://localhost:${PORT}/api/events`);
  console.log(`  GET  http://localhost:${PORT}/api/stats`);
});

