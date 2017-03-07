import React from 'react';
import { Icon } from 'antd';
import { didmount } from '../../utils';

const myCourse = () => {
  return (
    <div>
      <div>
        <Icon type='frown-o' />
        <h1>myCourseinfo</h1>
      </div>
    </div>
  );
};

export default didmount(myCourse);
