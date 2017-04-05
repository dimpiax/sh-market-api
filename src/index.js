/* @flow */

import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'

import Logger from './utils/logger'

import config from './config'
import database from './database'
import application from './app'

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(methodOverride())

// static
app.use('/images/adverts/', express.static('public/images'))

// routers
app.use('/apiv1', require('./app/routes/apiv1').default)

process.on('unhandledRejection', (e: string) => { Logger.error('\nRejection:\n', e) })

const httpServer = app.listen(config.ports.httpServer, () => {
    Logger.log(`HTTP server. Listening to port ${httpServer.address().port}`)
})

// setup database's environment and run application
const run = async (): Promise<void> => {
    await database.setup(config.database.uri)
    application.init()
}

run()
