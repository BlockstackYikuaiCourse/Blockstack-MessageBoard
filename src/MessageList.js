import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Message from './models/Message.js'
import TextField from '@material-ui/core/TextField';
import { User, getConfig } from 'radiks';

const styles = {
  center:{
    margin:"100px"
  },
  root: {
    width: 300,
    height: 150,
    margin: '10px auto'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  former:{
    width: 500,
    margin: '10px auto'
  }
};


class MessageList extends Component {

  constructor(props) {
  	super(props);
    this.state = {
      value:null,
      messageList:[],
      isLoading:true
    }
  }

  handleSubmit = async (event) => {
    const attributes = {
      from: User.currentUser()._id,
      content: this.state.value,
      flag: true
    }
    console.log(attributes)
    const message = new Message(attributes);
    await message.save()
    this.setState({isLoading:true})
    await this.handleQuery()
    this.setState({isLoading:false})
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleQuery = async () =>{
      console.log("in")
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

    const message = new Message({
      from : "gavin.id",
      content : "I love Blockstack",
      flag: true
    });
    const handleQuery = async() =>{
      //const fetchMessage = await Message.findById("f3734d92afe7-4a85-afab-ba0c9db01fc3")
      const fetchMessages = await Message.fetchList({flag : false});
      //console.log(fetchMessage)
      console.log(fetchMessages)
    }
    const handleSave = async () =>{
      await message.save()
    }
    const handleUpdate = async() =>{
      const newAttributes = {
        from: "gavin.id",
        content: "I love Blockstack V2",
        flag: false
      }
      await message.update(newAttributes)
    }

    return (
      <div>

        <div className={classes.center }>
          <form  noValidate autoComplete="off">
            <TextField className={classes.former} id="outlined-basic" label="留言框" variant="outlined"
              value = {this.state.value}
              onChange={this.handleChange}
            />
          </form>
          <Button  variant="contained" color="primary" onClick={this.handleSubmit}>
              提交
          </Button>
        </div>
        {this.state.isLoading?<div></div>:
          <div className={classes.center}>
            {this.state.messageList.map((message,i) =>{
              return(
                <Card key = {i} className={classes.root}>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      {message.from}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {message.content}
                    </Typography>
                  </CardContent>
                </Card>)
            })}
          </div>
        }

        <br/>
        <br/>
        <p>radiks db operation</p>
        <Button  variant="contained" onClick={handleQuery}>
            query
        </Button>
        <Button  variant="contained" onClick={handleSave}>
            save
        </Button>
        <Button  variant="contained" onClick={handleUpdate}>
            update
        </Button>
      </div>
  );
  }
  async componentDidMount() {
    this.handleQuery()
  }
}

export default withStyles(styles)(MessageList);
