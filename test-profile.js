import http from 'http';
http.get('http://localhost:3000/api/auth/profile?access_token=foo', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('RESPONSE:', data.slice(0, 100)));
});
