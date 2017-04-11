import React from 'react'
import { connect } from 'dva'
import Login from './login'
import Signup from './signup'
import Header from '../components/layout/header'
import Bread from '../components/layout/bread'
import Footer from '../components/layout/footer'
import Sider from '../components/layout/sider'
import styles from '../components/layout/main.less'
import { classnames, didmount } from '../utils'
import '../components/layout/common.less'

function App({ children, location, dispatch, app, loading }) {
  const { showLogin, showSignup, username, siderFold, darkTheme, isNavbar, menuPopoverVisible } = app

  const loginProps = {
    loading,
    dispatch,
    onOk(data) {
      dispatch({ type: 'app/login', payload: data })
    }
  }

  const signupProps = {
    loading,
    dispatch,
    onOk(data) {
      dispatch({ type: 'app/signup', payload: data })
    }
  }

  const headerProps = {
    user: username,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    switchMenuPopover() {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    logout() {
      dispatch({ type: 'app/logout' })
    },
    switchSider() {
      dispatch({ type: 'app/switchSider' })
    }
  }

  const siderProps = {
    siderFold,
    darkTheme,
    location,
    changeTheme() {
      dispatch({ type: 'app/changeTheme' })
    }
  }

  if (showLogin) {
    return (
      <div className={styles.spin}>
        <Login {...loginProps} />
      </div>
    )
  } else if (showSignup) {
    return (
      <div className={styles.spin}>
        <Signup {...signupProps} />
      </div>
    )
  } else {
    return (
      <div className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold }, { [styles.withnavbar]: isNavbar })}>
        {!isNavbar ? <aside className={classnames(styles.sider, { [styles.light]: !darkTheme })}>
          <Sider {...siderProps} />
        </aside> : ''}
        <div className={styles.main}>
          <Header {...headerProps} />
          <Bread {...{ location }} />
          <div className={styles.container}>
            <div className={styles.content}>
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default connect(({ app, loading }) => ({ app, loading: loading.global }))(didmount(App))
