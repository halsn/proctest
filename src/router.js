import React from 'react'
import { Router } from 'dva/router'
import App from './routes/app'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default function ({ history }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        NProgress.start()
        require.ensure([], require => {
          NProgress.done()
          cb(null, { component: require('./routes/userinfo') })
        })
      },
      childRoutes: [
        {
          path: 'userinfo',
          name: 'userinfo',
          getComponent (nextState, cb) {
            NProgress.start()
            require.ensure([], require => {
              NProgress.done()
              cb(null, require('./routes/userinfo'))
            })
          }
        }, {
          path: 'cloud',
          name: 'cloud',
          getComponent (nextState, cb) {
            NProgress.start()
            require.ensure([], require => {
              NProgress.done()
              cb(null, require('./routes/cloud'))
            })
          }
        }, {
          path: 'classinfo/addstudent',
          name: 'classinfo/addstudent',
          getComponent (nextState, cb) {
            NProgress.start()
            require.ensure([], require => {
              NProgress.done()
              cb(null, require('./routes/classinfo/addStudent'))
            })
          }
        }, {
          path: 'classinfo/myclass',
          name: 'classinfo/myclass',
          getComponent (nextState, cb) {
            NProgress.start()
            require.ensure([], require => {
              NProgress.done()
              cb(null, require('./routes/classinfo/myClass'))
            })
          }
        }, {
          path: 'classinfo/pubtest',
          name: 'classinfo/pubtest',
          getComponent (nextState, cb) {
            NProgress.start()
            require.ensure([], require => {
              NProgress.done()
              cb(null, require('./routes/classinfo/pubTest'))
            })
          }
        }, {
          path: 'classinfo/testinfo',
          name: 'classinfo/testinfo',
          getComponent (nextState, cb) {
            NProgress.start()
            require.ensure([], require => {
              NProgress.done()
              cb(null, require('./routes/classinfo/testInfo'))
            })
          }
        }, {
          path: 'courseinfo/addquiz',
          name: 'courseinfo/addquiz',
          getComponent (nextState, cb) {
            NProgress.start()
            require.ensure([], require => {
              NProgress.done()
              cb(null, require('./routes/courseinfo/addQuiz'))
            })
          }
        }, {
          path: 'courseinfo/mycourse',
          name: 'courseinfo/mycourse',
          getComponent (nextState, cb) {
            NProgress.start()
            require.ensure([], require => {
              NProgress.done()
              cb(null, require('./routes/courseinfo/myCourse'))
            })
          }
        }, {
          path: 'courseinfo/quizinfo',
          name: 'courseinfo/quizinfo',
          getComponent (nextState, cb) {
            NProgress.start()
            require.ensure([], require => {
              NProgress.done()
              cb(null, require('./routes/courseinfo/quizInfo'))
            })
          }
        }, {
          path: '*',
          name: 'error',
          getComponent (nextState, cb) {
            NProgress.start()
            require.ensure([], require => {
              NProgress.done()
              cb(null, require('./routes/error'))
            })
          }
        }
      ]
    }
  ]

  return <Router history={history} routes={routes} />
}
