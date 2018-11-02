import React, { Component } from 'react';
import './chat.css';
import io from "socket.io-client";
import uuid from 'uuid';
import $ from 'jquery';

class Chat extends Component {
      constructor(props) {
          super(props);
          this.state = {
              message: '',
              messageID: '',
              author: '',
              usernames: [],
              messages: [],
          }
          this.socket = io('localhost:5000');

          this.socket.on('usernames', (data) => {
              this.setState({
                  usernames : data
              })
          });

          this.socket.on('new message', (data) => {

            this.setState({
                messages: [...this.state.messages, data]
            });
          });

        
      }

    onSend(e) {
        if (this.state.message === '') {
            alert('cannot send blank text')
        } else {   
            this.socket.emit('send message', {
                        message: this.state.message,
                        messageID: this.state.messageID
            })
        }
        this.setState({message: '', messageID:''});

        e.preventDefault();
    }

    onUserLogin = (ev) => {
        if (this.state.author === '') {
            alert('username is required')
        } else {
            this.socket.emit('new user', this.state.author, (data) => {
                if (data) {
                    $(function(){
                        $('#login').hide();
                        $('#chatroom').show();
                    });
                } else {
                    alert('username is taken')
                }
            });

        };
        ev.preventDefault();
    }
    
    render() {
        let username = this.state.usernames.map(username =>{
            return(<li key={username} className="text-capitalize" >{username}</li>)
        });
       

            return (            
                <div>
    
                    <div className="header" id="login" >
                        <div className="bg-color">
                            <div className="wrapper">
                                <div className="container">
                                    <div className="">
                                        <div className="text-center">
                                            <h2 className="title">Enter your Username</h2>
                                            <form className="contact-form">
                                                <div className="">
                                                    <div className="form-group">
                                                        <input className="form-control login" type="text"
                                                        onKeyPress={event => {
                                                            if (event.key === 'Enter') {
                                                                this.onUserLogin()
                                                            }
                                                        }}
                                                        value={this.state.author} 
                                                        onChange={
                                                            (ev) => this.setState({
                                                                author: ev.target.value
                                                            })
                                                            }  
                                                                placeholder="Username"
                                                        />
                                                        <div className="validation"></div>                                 
                                                    </div>
                                                    <div className="login_btns">
                                                        <a href="https://github.com/shingie3500/node-reactjs-smiple-chatApp.git" className="btn btn-download">Download now!</a>
                                                        <a onClick={this.onUserLogin.bind(this)} href="#2" className="btn btn-login">Login</a>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            
            
                
                    <div className="header" id="chatroom" >
                        <div className="bg-color">
                            <div className="container text-center">
                                <h2 className="title">  Welcome to <span>Express</span> & <span>React</span> ChatRoom</h2>                               
                            </div>         
                            <div className="mainwrapper" >
                                <div id="chatwrapper">                   
                                
                                    <div id="chatwindow"  >     
                                        {this.state.messages.map(message => {
                                            
                                                return (               
                                                    <div id={message.msg.messageID} className="others" key={message.msg.messageID} ><label className="text-capitalize text-primary font-weight-bold">{message.author}: </label> <span className="font-italic" >{message.msg.message}</span></div>
                                                )                                        
                                        })}                           
                                    </div>                    
                                    
                                    <form action="" className="msgform" >
                                        <input className="form-control" type="text"  placeholder="Say something" id="msg" value={this.state.message} onChange={e => this.setState({message: e.target.value, messageID: uuid.v4() })} autoComplete="off"/>
                                        <a onClick={this.onSend.bind(this)} href="#2" className="btn form-control"  id="send">Send</a>
                                    </form>
                                </div>
                                <div id="userwrapper">
                                    <div id="users" >
                                    <ul>
                                            {username}
                                    </ul>                             
                                    </div>
                                </div>
                            </div>       
                        </div>
                    </div>
                         
                </div>            
            );
        }
    }


export default Chat;
