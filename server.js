const express = require('express')
const next = require('next')
const Request = require('request');


const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('/word', (req, res) => {
    const api_id='ac127e40';
    const api_key='909ae52ea2d7d9900e6718413f491c71'
    const {input}=req.query;
    const url='https://od-api.oxforddictionaries.com/api/v1/entries/en/'+input
    Request.get({
        "headers": {
          "content-type": "application/json",
          'app_id': api_id,
          'app_key': api_key
            },
        "url": url,

    }, (error, response, body) => {
        if(error) {
            res.sendStatus(404)
            return console.dir(error);
        }
        res.send(JSON.parse(body))
    });
  })
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
