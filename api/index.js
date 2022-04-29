const http = require('http')
const fs = require('fs')
const URL = require('url')
const path = require('path')

http.createServer((req, res) => {
    
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    })
    
    const { name, url, del } = URL.parse(req.url, true).query
    const urlsFile = path.join(__dirname, 'urls.json')

    if (!name || !url) {
        return fs.readFile(urlsFile, 'utf8', (err, data) => {
            if (err) throw err
            
            res.end(data)
        })
    }

    res.end()

}).listen('3000', () => console.log('Server is running'))