import React from 'react'
import Immutable from 'immutable'
import { formatDate } from '../../util'
import '../../assete/scss/ActiveListItem.scss'


const ActiveListItem = (props) => {
  const { setChatting , nickname, lastWord, avatar, onlineState, lastWordTime, type, unread, clearUnread, _id } = props;
  return (
    <div className = 'active-list-item'
      onClick = {() => {
        setChatting(Immutable.fromJS({ to: nickname, type, _id, avatar }));
        if(unread !== 0)  clearUnread({ _id, type });
      }}
    >
      <div className = 'active-item-wrap'>
        <img src = { avatar } className = 'avatar'></img>
        <div className = 'info'>
          <p className = 'nickname'>{ nickname }</p>
          <p className = 'last-word'>{ lastWord ? lastWord : (onlineState ? '[在线]' : '[离开]')}</p>
        </div>
        <div className = 'other'>
          <time>{ formatDate(lastWordTime ? lastWordTime : new Date()) }</time>
          <span className = {`unread${ unread == 0 || unread == undefined ? '-hidden' : ''}`}>{ unread }</span>
        </div>      
      </div>
      
     </div>
  ) 
}

export default ActiveListItem