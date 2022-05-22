import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService'



class Login extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            username:'',
            password:'',
            isShowPassword: false,
            errMessage: '',
        }
    }
    handleOnChangeUserName = (event) =>
    {
        this.setState (
            {
                username:event.target.value
            })
    
    }
    handleOnChangePassword = (event) =>
    {
        this.setState (
            {
                password:event.target.value
            })
    
    }
    handleLogin = async () =>
    {
        this.setState(
            {
                errMessage: ''
            })
       console.log(this.state.username)
       console.log(this.state.password)
       try
       {
            let data = await handleLoginApi(this.state.username, this.state.password)
            if(data && data.errCode !==0)
            {
                this.setState(
                    {
                        errMessage: data.message
                    })
            }
            if(data && data.errCode ===0)
            {
                this.props.userLoginSuccess(data.user)
                console.log('login success')
            }
       }
       catch(error)
       {
                if(error.response)
                {
                    if(error.response)
                    {
                        if(error.response.data)
                        {
                            this.setState(
                                {
                                    errMessage: error.response.data.message
                                })
                        }
                    }
                }
       }
    }
    handleShowHidePassword = () =>
    {
        this.setState(
            {
                isShowPassword: !this.state.isShowPassword
            })
    }
    render() {
        return (
           <div className='login-background'>
               <div className='login-container'>
                   <div className='login-content row'>
                       <div className='col-12 login-text'>Login</div>
                       <div className='col-12 form-group login-input'>
                           <label>Username</label>
                           <input type='text' className='form-control' placeholder='Enter your username'
                           value={this.state.username}
                           onChange={(event)=> this.handleOnChangeUserName(event)}/>
                       </div>
                       <div className='col-12 form-group login-input'>
                           <label>Password</label>
                            <div className='login-custom-password'>
                                <input type={this.state.isShowPassword ? 'text': 'password'}
                                className='form-control' 
                                placeholder='Enter your password'
                                value={this.state.password}
                                onChange={(event)=> this.handleOnChangePassword(event)}/>
                                <span
                                    onClick={()=> this.handleShowHidePassword()}
                                
                                > <i className={this.state.isShowPassword? 'fas fa-eye' : 'fas fa-eye-slash'}></i></span>
                            </div>
                           
                       </div>
                       <div className='col-12'>
                           <span className='forgot-password'>Forgot your password?</span>
                       </div>
                       <div className='col-12' style={{color: 'red'}}>
                           {this.state.errMessage}
                       </div>
                       <div className='col-12'>
                            <button className='col-12 login-btn' onClick={()=> this.handleLogin()}>Login</button>
                       </div>
                       <div className='col-12 text-center mt-3'>
                           <span>Or login with</span>
                       </div>
                       <div className='col-12 social-icon'>
                            <i className="fab fa-facebook-f facebook"></i>
                            <i className="fab fa-google google"></i>
                       </div>
                   </div>
               </div>
           </div>
        )
    }
}

const mapStateToProps = state => { //redux
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess:(userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
