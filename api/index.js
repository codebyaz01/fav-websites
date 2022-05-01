const http = require('http')
const fs = require('fs')
const URL = require('url')
const path = require('path')

function readDataFile(filePath, cb) {
    fs.readFile(filePath, (err, data) => {
        if (err) throw err
        
        cb(data)
    })
}

function writeDataFile(filePath, data, cb) {
    fs.writeFile(filePath, data, (err) => {
        if (err) throw err

        cb()
    })
}

http.createServer((req, res) => {
        
    const { name, url, del } = URL.parse(req.url, true).query
    const urlsFile = path.join(__dirname, 'urls.json')

    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    })

    if (del) { 
        return readDataFile(urlsFile, (data) => {
            data = JSON.parse(data)
            data.urls = data.urls.filter(item => item.name !== name && item.url !== url)
            data = JSON.stringify(data, null, 2)
            writeDataFile(urlsFile, data, () => res.end())
        })
    }
    
    if (name && url) {
        return readDataFile(urlsFile, (data) => {
            data = JSON.parse(data)
            data.urls.push({ name, url})
            data = JSON.stringify(data, null, 2)
            writeDataFile(urlsFile, data, () => {res.end()})            
        })
    }

    readDataFile(urlsFile, (data) => res.end(data))
 
}).listen('3000', () => console.log('Server is running'))