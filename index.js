const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://txtserver.vercel.app/api?url=1');
    const urls = response.data.split('\n'); // 将返回的多行url分割成数组

    const randomIndex = Math.floor(Math.random() * urls.length);
    const randomUrl = urls[randomIndex];

    const imageResponse = await axios.get(randomUrl, { responseType: 'stream' });
    res.set('Content-Type', imageResponse.headers['content-type']);
    imageResponse.data.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/sp3jdciehf3q8rh8idfijARJ3F89R93RFJJFJ/', async (req, res) => {
  try {
    const response = await axios.get('https://txtserver.vercel.app/api?url=2');
    const urls = response.data.split('\n'); // 将返回的多行url分割成数组

    const randomIndex = Math.floor(Math.random() * urls.length);
    const randomUrl = urls[randomIndex];

    const imageResponse = await axios.get(randomUrl, { responseType: 'stream' });
    res.set('Content-Type', imageResponse.headers['content-type']);
    imageResponse.data.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(32000, () => {
  console.log('Server is running on http://localhost:32000');
});
