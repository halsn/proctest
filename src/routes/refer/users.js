import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import UserList from '../components/users/list';
import UserSearch from '../components/users/search';
import UserModal from '../components/users/modal';

function Users({ location, dispatch, users, loading }) {
  const { list, pagination, currentItem, modalVisible, modalType } = users;
  const { field, keyword } = location.query;

  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk(data) {
      dispatch({
        type: `users/${modalType}`,
        payload: data
      });
    },
    onCancel() {
      dispatch({
        type: 'users/hideModal'
      });
    }
  };

  const userListProps = {
    dataSource: list,
    loading,
    pagination,
    onPageChange(page) {
      const query = location.query;
      dispatch(routerRedux.push({
        pathname: '/users',
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize
        }
      }));
    },
    onDeleteItem(id) {
      dispatch({
        type: 'users/delete',
        payload: id
      });
    },
    onEditItem(item) {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'update',
          currentItem: item
        }
      });
    }
  };

  const userSearchProps = {
    field,
    keyword,
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ?
      dispatch(routerRedux.push({
        pathname: '/users',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword
        }
      })) :
      dispatch(routerRedux.push({
        pathname: '/users'
      }));
    },
    onAdd() {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'create'
        }
      });
    }
  };

  return (
    <div className='content-inner'>
      <UserSearch {...userSearchProps} />
      <UserList {...userListProps} />
      <UserModal {...userModalProps} />;
    </div>
  );
}

Users.propTypes = {
};

export default connect(({ users, loading }) => ({ loading: loading.global, users }))(Users);
