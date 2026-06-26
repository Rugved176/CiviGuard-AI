import http from 'http';
const data = JSON.stringify({ prompt: 'test' });
const req = http.request('http://localhost:3000/api/draft', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('RESPONSE:', body.slice(0, 100)));
});
req.write(data);
req.end();
