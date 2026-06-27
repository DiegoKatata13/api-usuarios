const fs = require('fs');
const path = require('path');

// Criar diretório de logs se não existir
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const getTimestamp = () => {
  const now = new Date();
  return now.toISOString();
};

const logToFile = (level, message, error = null) => {
  const logFile = path.join(logsDir, `app-${new Date().toISOString().split('T')[0]}.log`);
  const logEntry = `[${getTimestamp()}] [${level}] ${message}${error ? '\n' + error.stack : ''}\n`;
  fs.appendFileSync(logFile, logEntry);
};

const logger = {
  info: (message) => {
    console.log(`\x1b[36m[${getTimestamp()}] [INFO]\x1b[0m ${message}`);
    logToFile('INFO', message);
  },

  error: (message, error = null) => {
    console.error(`\x1b[31m[${getTimestamp()}] [ERROR]\x1b[0m ${message}`);
    if (error) console.error(error.stack);
    logToFile('ERROR', message, error);
  },

  warn: (message) => {
    console.warn(`\x1b[33m[${getTimestamp()}] [WARN]\x1b[0m ${message}`);
    logToFile('WARN', message);
  },

  debug: (message) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`\x1b[35m[${getTimestamp()}] [DEBUG]\x1b[0m ${message}`);
      logToFile('DEBUG', message);
    }
  },
};

module.exports = logger;
