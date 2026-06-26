import http from 'http';
http.get('http://localhost:3000/api/reports', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('RESPONSE:', data.slice(0, 100)));
});
