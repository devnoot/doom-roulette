const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

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