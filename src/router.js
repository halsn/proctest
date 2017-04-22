import React from 'react'
import { Router } from 'dva/router'
import App from './routes/app'

export default function ({ history }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], require => {
          cb(null, { component: require('./routes/userinfo') })
        })
      },
      childRoutes: [
        {
          path: 'userinfo',
          name: 'userinfo',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/userinfo'))
            })
          }
        }, {
          path: 'cloud',
          name: 'cloud',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/cloud'))
            })
          }
        }, {
          path: 'classinfo/addstudent',
          name: 'classinfo/addstudent',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/classinfo/addStudent'))
            })
          }
        }, {
          path: 'classinfo/myclass',
          name: 'classinfo/myclass',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/classinfo/myClass'))
            })
          }
        }, {
          path: 'classinfo/pubtest',
          name: 'classinfo/pubtest',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/classinfo/pubTest'))
            })
          }
        }, {
          path: 'classinfo/testinfo',
          name: 'classinfo/testinfo',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/classinfo/testInfo'))
            })
          }
        }, {
          path: 'courseinfo/addquiz',
          name: 'courseinfo/addquiz',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/courseinfo/addQuiz'))
            })
          }
        }, {
          path: 'courseinfo/mycourse',
          name: 'courseinfo/mycourse',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/courseinfo/myCourse'))
            })
          }
        }, {
          path: 'courseinfo/quizinfo',
          name: 'courseinfo/quizinfo',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/courseinfo/quizInfo'))
            })
          }
        }, {
          path: '*',
          name: 'error',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error'))
            })
          }
        }
      ]
    }
  ]

  return <Router history={history} routes={routes} />
}
