/* global window */
import dva from 'dva';
import { message } from 'antd';
import createLoading from 'dva-loading';
import './index.html';

const ERROR_MSG_DURATION = 3; // 3 秒
// 1. Initialize
const app = dva({
  onError(e) {
    message.error(e.message, ERROR_MSG_DURATION);
  }
});

app.use(createLoading());

// 2. Model

app.model(require('./models/app'));
app.model(require('./models/userinfo'));
app.model(require('./models/courseinfo/courseList'));
app.model(require('./models/courseinfo/addQuiz'));

// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#root');
