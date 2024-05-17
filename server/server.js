import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import morgan from 'morgan'
import { resolve } from 'path'

const app = express()

app.use(morgan('common'))

const apiProxy = createProxyMiddleware({
    target: 'https://doomworld.com/idgames/api/api.php',
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    }
})

app.use('/api', apiProxy)

app.use(express.static('./dist'))

const PORT = process.env.PORT || 3000 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
