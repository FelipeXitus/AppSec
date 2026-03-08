import pino from 'pino'

const transport = pino.transport({
  targets: [
    {
      target: 'pino-pretty',
      level: 'debug',
      options: {}
    },
    {
      target: 'pino/file',
      level: 'debug',
      options: { destination: 'logs/app.log' }
    }
  ]
})

export const logger = pino({
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: ['req.headers.authorization', 'req.headers.cookie', 'req.body.senha', 'senha', 'token']
}, transport
)

const transportSecurity = pino.transport({
  targets: [
    {
      target: 'pino-pretty',
      level: 'debug',
      options: {}
    },
    {
      target: 'pino/file',
      level: 'debug',
      options: { destination: 'logs/security.log' }
    }
  ]
})

export const loggerSecurity = pino({
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: ['req.headers.authorization', 'req.headers.cookie', 'req.body.senha', 'senha', 'token']
}, transportSecurity
)
