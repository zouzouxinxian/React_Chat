import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import Avatar from '../common/Avatar';
import '../../assete/scss/CreateGroup.scss';
import config from '../../config/serverConfig';
import { createGroup } from '../../util/upload';
import LeftHeader from '../common/LeftHeader';
import Loading from '../common/Loading';
import ProfileSection from '../common/ProfileSection';
import EditableInput from '../common/EditableInput';
import SubmitButton from '../common/SubmitButton';

class CreateGroup extends Component {
  constructor (props) {
    super(props);
    this.state = {
      avatar: config.DEFAULT_GROUP_URL,
      nickname: '',
      describe: '',
      isLoading: false
    }
  }
  @autobind
  setAvatar (value) {
    this.setState({ avatar: value })
  }
  @autobind
  handleChange (prop) {
    return e => {
      this.setState({ [prop]: e.target.value})
    }   
  }
  @autobind
  handleSubmit (e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    let info = {
      nickname: this.state.nickname,
      describe: this.state.describe,
      avatar: this.state.avatar === config.DEFAULT_GROUP_URL
              ? '' : this.state.avatar,
      _id: this.props._id
    };
    createGroup(info)
    .then(() => {
      this.setState({ isLoading: false })
      this.props.close();
    })
  }
  render () {
    return (
      <div className = 'left-panel-wrap create-group'>
        <LeftHeader title = '创建群组'/>
        <div className = 'panel-wrap'>
          { this.state.isLoading && <Loading/> }       
          <Avatar
            setAvatar = { this.setAvatar }
            src = { this.state.avatar }
            size = '12'
          />
          <ProfileSection title = '昵称'>
            <EditableInput
              defaultValue = { this.state.nickname }
              minLength = { 1 }
              maxLength = { 15 }
              placeholder = '请填写群名称（1~10个字）'
              handleChange = { this.handleChange('nickname') }
            />
          </ProfileSection>
          <ProfileSection title = '群介绍'>
            <EditableInput
              defaultValue = { this.state.describe }
              minLength = { 0 }
              maxLength = { 30 }
              placeholder = '群介绍（0~30个字）'
              handleChange = { this.handleChange('describe') }
            />
          </ProfileSection> 
          <SubmitButton 
            disabled = { this.state.nickname.length < 1 } 
            isCircle = { true }
            onClick = { this.handleSubmit }
          ></SubmitButton>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({_id: state.user.get('_id')})
)(CreateGroup);
