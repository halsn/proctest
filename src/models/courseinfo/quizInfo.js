import React from 'react';
import { Icon } from 'antd';
import { didmount } from '../../utils';

const quizInfo = () => {
  return (
    <div>
      <div>
        <Icon type='frown-o' />
        <h1>myCourseinfo</h1>
      </div>
    </div>
  );
};

export default didmount(quizInfo);
