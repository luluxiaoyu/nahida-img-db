const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');

const app = express();
const db = new sqlite3.Database('./db.db', sqlite3.OPEN_READONLY);

// 设置路由
app.get('/', async (req, res) => {
  // 执行查询
  db.all(
    `SELECT urls FROM main 
    WHERE r18 != 1 AND tags LIKE '%纳西妲%' AND tags NOT LIKE '%AI%' AND tags NOT LIKE '%NovelAI%' AND status NOT LIKE '%unavailable%'`,
    async (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        // 随机选择结果
        const randomRow = rows[Math.floor(Math.random() * rows.length)];
        const imageUrl = randomRow.urls;
 
        try {
          // 下载图片并将其作为响应发送
          const imageResult = await axios.get(imageUrl, { responseType: 'arraybuffer' });
          const imageBuffer = Buffer.from(imageResult.data, 'binary');
          res.set('Content-Type', 'image/png');
          res.send(imageBuffer);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      }
    }
  );
});

// 启动服务器
app.listen(32031, () => {
  console.log('Server is running on port 32031');
});