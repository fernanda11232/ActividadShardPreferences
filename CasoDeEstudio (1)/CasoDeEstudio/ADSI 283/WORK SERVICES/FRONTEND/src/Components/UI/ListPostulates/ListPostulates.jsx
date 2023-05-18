import React from 'react'
import { map } from 'lodash';
import { PostulatesItem } from '../PostulatesItem/PostulatesItem';

export function ListPostulates(props) {
    const { postulates, users, path } = props

  return map(postulates, (postulate)=><PostulatesItem key={postulate._id} postulate={postulate} users={users} path={path}/>)
}
