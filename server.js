'use strict';

const express = require('express')
const pdf = require('html-pdf');
const app = express()
const port = 1337

const createPdf = (html) => {
  const template = `<html><head><meta charset="utf8"></head><body style="margin: 50px;">${html}</body></html>`;

  return new Promise((resolve, reject) => {
    pdf.create(template, {
      childProcessOptions: {
        env: {
          OPENSSL_CONF: '/dev/null'
        }
      }
    }).toBuffer(function (err, buffer) {
      if (err) {
        reject(err);
        return;
      }
      resolve(Buffer.from(buffer).toString('base64'));
    });
  });
}

app.get('/', async (req, res) => {
  const x = await createPdf('<h1>Test</h1>');
  res.contentType('application/json').send(x)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})