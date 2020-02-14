import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import UserGroupRecords from './models/UserGroupRecords.js'

import {createGroup} from './userGroup/userGroup.js'
import { UserGroup,GroupInvitation,User,getConfig } from 'radiks-gavin-test';

const styles = {
  formControl: {
    minWidth: 300,
  },
  selectEmpty: {
  },
};



class UserGroupList extends Component {

  constructor(props) {
  	super(props);
    this.state = {
      groupName : "",
      groupList :[]
    }
  }

  async createUserGroup() {
    const group = new UserGroup({ name: this.state.groupName });
    const groupCreate = await group.create();
    console.log(groupCreate)
    await this.saveUserGroup(groupCreate)

  }

  async getMyGroups() {
    const groups = await UserGroup.myGroups();
    console.log(groups);
    console.log(UserGroup);

  }

  async inviteToGroup() {
    const groups = await UserGroup.myGroups();
    console.log(groups)
    /*
    const group = await UserGroup.findById(groups[0]._id);
    console.log(group)
    */
    const group = groups[0]
    console.log(group)

    const usernameToInvite = 'gavingao.id.blockstack'
    const invitation = await group.makeGroupMembership(usernameToInvite);
    console.log(invitation); // the ID used to later activate an invitation

    /*
    const group = await UserGroup.findById("5db432a9b4f5-41d8-b7f5-4d329e1940a5");
    console.log(group);
    const invitation = await group.makeGroupMembership("the11011.id.blockstack");
    console.log(invitation);
    */
  }

  async inviteUserToGroup() {
    const group = new UserGroup({ name: 'testGroup' });
    group.create().then(grp => {
      console.log(grp);
      group.makeGroupMembership("gavingao.id.blockstack").then(invitation => {
        console.log(invitation);
      });

    })
  }

  async inviteActivate() {
    console.log(GroupInvitation)
    const invitation = await GroupInvitation.findById("4b24a0d0fcdf-40a2-a735-a3e0cbd4a002");
    console.log(invitation)
    await invitation.activate().catch(err => console.log(err));
  }

  getInfo(){
    console.log(User.currentUser());
  }

  async saveUserGroup(userGroupItem){

    const groupRecord = new UserGroupRecords({
      id: userGroupItem._id,
      KeyId: userGroupItem.attrs.signingKeyId,
      Key: userGroupItem.privateKey,
      name: userGroupItem.attrs.name
    });
    console.log(groupRecord)
    groupRecord.save()
  }
  async updateUserGroup(){

  }
  async getGroupRecord(){
    const fetchMessages = await UserGroupRecords.fetchList();
    console.log(fetchMessages)
  }

  async signOut() {
    const {userSession} = await getConfig()
    userSession.signUserOut(window.location.origin);
  }

  handleChangeGroupName = (event) => {
    this.setState({groupName: event.target.value});
  }

  handleQueryUserGroup = async () =>{
      console.log("in handleQueryUserGroup")
      this.state.messageList = []
      //const debugMessage = await Message.findById('2f8e22079444-454b-9e77-5e461232cdd9');
      const fetchMessages = await Message.fetchList({flag : true});
      console.log(fetchMessages)
      fetchMessages.forEach((item) => {
          console.log(item)
          if (item.attrs != undefined){
            console.log(typeof(item.attrs.content))
            if (typeof(item.attrs.content)=="string"){//明文数据

              this.state.messageList.push({
                  from: item.attrs.from,
                  content: item.attrs.content,
                  flag : item.attrs.flag
              })
            }else {//密文数据
              this.state.messageList.push({
                  from: item.attrs.from.cipherText,
                  content: item.attrs.content.cipherText,
                  flag : item.attrs.flag
              })
            }
          }

      })
      console.log(this.state.messageList)
      this.setState({isLoading:false})
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
          <FormControl className = {classes.formControl}>
            <InputLabel id="demo-simple-select-label">用户群组选择</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
              </Select>
          </FormControl>
          <div>

            <Button onClick={() => this.signOut()}>SignOut</Button>

            <form  noValidate autoComplete="off">
              <TextField className={classes.former} id="outlined-basic" label="群组名称" variant="outlined"
                value = {this.state.groupName}
                onChange={this.handleChangeGroupName}
              />
            </form>

            <Button onClick={() => this.createUserGroup()}>createUserGroup</Button>

            <br/>

            <Button onClick={() => this.inviteToGroup()}>inviteToGroup</Button>

            <Button onClick={() => this.inviteUserToGroup()}>inviteUserToGroup</Button>

            <Button onClick={() => this.getMyGroups()}>getMyGroups</Button>

            <Button onClick={() => this.getInfo()}>getUserInfo</Button>

            <Button onClick={() => this.inviteActivate()}>inviteActivate</Button>

            <Button onClick={() => this.getGroupRecord()}>getGroupRecord</Button>
          </div>
      </div>
  );
  }
  async componentDidMount() {
      this.handleQueryUserGroup()
  }
}

export default withStyles(styles)(UserGroupList);
