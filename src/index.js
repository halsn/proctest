/* global window */
import dva from 'dva'
import { message } from 'antd'
import createLoading from 'dva-loading'
import './index.html'

const ERROR_MSG_DURATION = 3 // 3 秒
// 1. Initialize
const app = dva({
  onError(e) {
    message.error(e.message, ERROR_MSG_DURATION)
  }
})

app.use(createLoading())

// 2. Model

app.model(require('./models/app.model'))
app.model(require('./models/userinfo.model'))
app.model(require('./models/courseinfo/myCourse.model'))
app.model(require('./models/courseinfo/courseList.model'))
app.model(require('./models/courseinfo/addQuiz.model'))
app.model(require('./models/cloud.model'))
app.model(require('./models/courseinfo/quizInfo.model'))
app.model(require('./models/classinfo/myClass.model'))
app.model(require('./models/classinfo/addStudent.model'))
app.model(require('./models/classinfo/pubTest.model'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
