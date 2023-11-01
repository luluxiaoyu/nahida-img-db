const fs = require('fs');  
const axios = require('axios');  
const express = require('express');  
const basicAuth = require('express-basic-auth');  
  
const app = express();  
  
// 配置基本认证  
const basicOptions = {  
  realm: 'Image Gallery',  
  users: {  
    'xiaoyu': 'xiaoyu666.666.', // 将用户名和密码替换为您的实际用户名和密码  
  },  
};  
app.use(basicAuth(basicOptions));  
  
// 定义路由  
app.get('/', (req, res) => {  
  // 从normal.txt文件中随机读取一行  
  const filePath = './r_ddiawjdjiwadqijdiadimiwjdijijwd18.txt';  
  fs.readFile(filePath, 'utf8', (err, data) => {  
    if (err) {  
      console.error('Error reading file:', err);  
      res.status(500).send('Error reading file');  
      return;  
    }  
    const lines = data.split('\n');  
    const randomIndex = Math.floor(Math.random() * lines.length);  
    const imageUrl = lines[randomIndex];  
  
    // 使用axios获取图片内容  
    axios({  
      method: 'get',  
      url: imageUrl,  
      responseType: 'stream',  
    })  
      .then((response) => {  
        // 将图片内容直接输出到网页上  
        res.set('Content-Type', 'image/jpeg'); // 根据图片类型设置相应的Content-Type  
        res.write(response.data);  
        res.end();  
      })  
      .catch((error) => {  
        console.error('Error fetching image:', error);  
        res.status(500).send('Error fetching image');  
      });  
  });  
});  
  
// 启动服务器  
const port = 3000;  
app.listen(port, () => {  
  console.log(`Server is running on port ${port}`);  
});