import express from 'express';

const app = express();
const port = process.env.PORT || 8080;  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// 示例 GET 请求
app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
});



