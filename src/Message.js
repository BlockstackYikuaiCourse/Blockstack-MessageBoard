import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

const useStyles = theme => ({
  root: {
    width : "100%"
  },
  container : {
    maxWidth : 600
  },
  content:{

  },
  postBox: {
    width : "100%",
    padding:theme.spacing(1)
  },
  submitButton:{
    marginRight: theme.spacing(2)
  }
});


class Message extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
      newStatus:"",
      status:"",
      postBoxClicked: false
  	};

  }
  saveNewStatus(statusText) {
     const { userSession } = this.props

     let status = {
       text: statusText.trim(),
       created_at: Date.now()
     }

     const options = { encrypt: false }
     userSession.putFile('status.json', JSON.stringify(status), options)
       .then(() => {
         this.setState({
           newStatus: status.text
         })
       })
  }
  fetchData() {
   const { userSession } = this.props
   const options = { decrypt: false }
   userSession.getFile('status.json', options)
     .then((file) => {
       var status = JSON.parse(file || '[]')
       console.log(status)
       this.setState({
         status:status
       })
     })
     .finally(() => {
       console.log("read over")
     })
  }
  handleNewStatusChange(event) {
    this.setState({newStatus: event.target.value})
  }

  handleNewStatusSubmit(event) {
    this.saveNewStatus(this.state.newStatus)
    this.setState({
      newStatus: ""
    })
  }

  handlePostBoxClick(event) {
    console.log(this)
    event.stopPropagation()
    this.setState({
      postBoxClicked:true
    })
  }

  handleSubmitClose(){
    this.setState({
      postBoxClicked:false
    })
  }


  render() {
    const { handleSignOut, userSession } = this.props;

    const { classes } = this.props;
    return (
      !userSession.isSignInPending() ?
        <Grid container className={classes.root} justify="center" >
          <Grid container className={classes.container} spacing={2}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow >
                      <TableCell>
                        <div align="center">
                          <ClickAwayListener onClickAway={e=>this.handleSubmitClose(e)}>
                            <TextField
                                     id="outlined-basic"
                                     label="新留言"
                                     value={this.state.newStatus}
                                     onChange={e => this.handleNewStatusChange(e)}
                                     onClick={e => this.handlePostBoxClick(e)}
                                     placeholder="输入留言信息"
                                     className={classes.postBox}
                                     variant="outlined"

                             />
                          </ClickAwayListener>
                        </div>
                        {this.state.postBoxClicked?
                        <div align="right" className={classes.submitButton}>
                             <Button
                                     onClick={e => this.handleNewStatusSubmit(e)}
                                     variant="contained"
                                     color="primary"
                                     >
                                     提交
                             </Button>
                        </div> : null
                        }
                      </TableCell>
                    </TableRow>
                  </TableHead>


                  <TableBody>
                    { this.state.status == ""? null :
                      <TableRow>
                        <TableCell align="center">{this.state.status.text}</TableCell>
                      </TableRow>
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      : null
    );
  }
  componentDidMount() {
    this.fetchData()
  }

}

export default withStyles(useStyles)(Message);
