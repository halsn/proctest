module.exports = [
  {
    key: 'userinfo',
    name: '个人中心',
    icon: 'user'
  },
  {
    key: 'cloud',
    name: '公共课程',
    icon: 'cloud-o'
  },
  {
    key: 'courseinfo',
    name: '课程',
    icon: 'book',
    child: [
      {
        key: 'mycourse',
        name: '我的课程'
      },
      {
        key: 'addquiz',
        name: '录入习题'
      },
      {
        key: 'quizinfo',
        name: '查看习题'
      }
    ]
  },
  {
    key: 'classinfo',
    name: '班级',
    icon: 'team',
    child: [
      {
        key: 'myclass',
        name: '我的班级'
      },
      {
        key: 'addstudent',
        name: '录入学生'
      },
      {
        key: 'pubtest',
        name: '发布测试'
      },
      {
        key: 'testinfo',
        name: '查看测试'
      }
    ]
  }
]
