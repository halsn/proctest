import React from 'react';
import { Icon } from 'antd';
import { didmount } from '../../utils';

const myClass = () => {
  return (
    <div>
      <div>
        <Icon type='frown-o' />
        <h1>myCourseinfo</h1>
      </div>
    </div>
  );
};

export default didmount(myClass);
