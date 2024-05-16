import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import requestId from 'express-request-id'
import morgan from 'morgan'

const app = express()

app.use(requestId)

morgan.token('id', req => {
  req.id.split('-')[0]
})

app.use(
  morgan(
    "[:date[iso] #:id] Started :method :url for :remote-addr",
    {
      immediate: true
    }
  )
)

const apiProxy = createProxyMiddleware({
    target: 'https://doomworld.com/idgames/api/api.php',
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    }
})

app.use('/api', apiProxy)

app.use(express.static('dist'))

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`)
})
