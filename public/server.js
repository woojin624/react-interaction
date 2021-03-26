const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname));
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});
function handleListenLog() {
  console.log('Server Starting...');
}
app.listen(9000, handleListenLog);
// 페이지 열기
app.get('/', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, 'index.html'));
});
app.get('*', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, 'index.html'));
});
