const express = require('express');  
const axios = require('axios');  
const fs = require('fs');  
const app = express();  
const port = 32000;  
  
app.get('/', async (req, res) => {  
  try {  
    // 读取normal.txt文件中的所有行  
    const fileContent = fs.readFileSync('/normal.txt', 'utf8');  
    const lines = fileContent.split('\n');  
  
    // 随机选择一行作为图片URL  
    const randomLineIndex = Math.floor(Math.random() * lines.length);  
    const imageUrl = lines[randomLineIndex];  
  
    // 使用axios获取图片内容  
    const response = await axios({  
      method: 'get',  
      url: imageUrl,  
      responseType: 'stream',  
    });  
  
    // 将图片内容写入响应中  
    res.set('Content-Type', 'image/jpeg');  
    response.data.pipe(res);  
  } catch (error) {  
    console.error(error);  
    res.status(500).send('Internal Server Error');  
  }  
});  
  
app.listen(port, () => {  
  console.log(`Server is running on port ${port}`);  
});