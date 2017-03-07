import React from 'react';
import { Breadcrumb, Icon } from 'antd';
import styles from './main.less';
import { menu } from '../../utils';

const pathSet = [];
const getPathSet = (menuArray, parentPath) => {
  parentPath = parentPath || '/';
  menuArray.forEach(item => {
    pathSet[(parentPath + item.key).replace(/\//g, '-').hyphenToHump()] = {
      path: parentPath + item.key,
      name: item.name,
      icon: item.icon || '',
      clickable: false
    };
    if (item.child) {
      getPathSet(item.child, parentPath + item.key + '/');
    }
  });
};
getPathSet(menu);

function Bread({ location }) {
  const pathNames = [];
  location.pathname.substr(1).split('/').forEach((item, key) => {
    if (key > 0) {
      pathNames.push((pathNames[key - 1] + '-' + item).hyphenToHump());
    } else {
      pathNames.push(('-' + item).hyphenToHump());
    }
  });
  const breads = pathNames.map((item, key) => {
    if (!(item in pathSet)) {
      item = 'Userinfo';
    }
    return (
      <Breadcrumb.Item key={key.toString()} >
        {pathSet[item].icon ? <Icon type={pathSet[item].icon} /> : ''}
        <span>{pathSet[item].name}</span>
      </Breadcrumb.Item>
    );
  });

  return (
    <div className={styles.bread}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Icon type='home' />
        </Breadcrumb.Item>
        {breads}
      </Breadcrumb>
    </div>
  );
}

Bread.propTypes = {
};

export default Bread;
