import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers,createNewUserService,deleteUserService,editUserService} from '../../services/userService';
import ModalUser from './ModalUser';
import {emitter} from "../../utils/emitter"
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {


    constructor(props)
    {
        super(props)
        this.state =
        {
            arrUsers:[],
            isOpenModalUser: false,
            isOpenModalEditUSer:false,
            userEdit:{}
        }
 
    }

    async componentDidMount() {
        await this.getAllUsersFromReact()
    }

    handleAddNewUser = () =>
    {
        this.setState(
            {
                isOpenModalUser:true,

            })
    }


    getAllUsersFromReact = async () =>
    {
        let response = await getAllUsers('ALL')
        if(response && response.errCode === 0)
        {
            this.setState(
                {
                    arrUsers:response.users
                })
        }
    }

    createNewUser= async (data) =>
    {
        try
        {
            let response = await createNewUserService(data)
            if(response && response.errCode!=0)
            {
                alert(response.errMessage)
            }
            else
            {
                await this.getAllUsersFromReact()
                this.setState(
                    {
                        isOpenModalUser:false
                    })
                emitter.emit('EVENT_CLEAR_MODAL_DATA') //fire event
            }
            console.log("respose create user",data)
        }
        catch(e)
        {
            console.log(e)
        }
        console.log(data)
    }

    toggleUserModal = () =>
    {
        this.setState(
            {
                isOpenModalUser: !this.state.isOpenModalUser,

            })
    }

    toggleUserEditModal = () =>
    {
        this.setState(
            {
                isOpenModalEditUSer: !this.state.isOpenModalEditUSer,
            })
    }

    handleDeleteUser = async (user) =>
    {
        console.log("click delte",user)
        try
        {
            let res =await deleteUserService(user.id)
            if(res && res.errCode ===0)
            {
                await this.getAllUsersFromReact()
            }
            else
            {
                alert(res.errMessage)
            }
            console.log(res)
        }catch(e)
        {
            console.log(e)
        }
    }

    handleEditUser = (user) =>
    {
        console.log('check edit user', user)
        this.setState(
            {
                isOpenModalEditUSer:true,
                userEdit:user
            })
    }
    doEditUser = async (user) =>
    {
        
        try
        {
            let res= await editUserService(user)
            if(res && res.errCode===0)
            {
                this.setState(
                    {
                        isOpenModalEditUSer:false
                    })
                await this.getAllUsersFromReact()
            }
            else
            {
                alert(res.errCode)
            }
        }
        catch(e)
        {
            console.log(e)
        }
    }

    render() {
        
        let arrUsers = this.state.arrUsers
        return (
            <div className="users-container">
                <ModalUser
                isOpen={this.state.isOpenModalUser}
                toggleFromParent={this.toggleUserModal}
                createNewUser = {this.createNewUser}
                test={'abc'}
                />
                {
                    this.state.isOpenModalEditUSer &&
                    <ModalEditUser
                    isOpen={this.state.isOpenModalEditUSer}
                    toggleFromParent={this.toggleUserEditModal}
                    currentUser ={this.state.userEdit}
                    editUser={this.doEditUser}
                    // createNewUser = {this.createNewUser}
                    />
                 }
                <div className="title text-center">Manage user w Tuon</div>
                    <div className='mx-1'>
                        <button 
                        className='btn-primary p-2 m-3'
                        onClick={()=> this.handleAddNewUser()}
                        ><i className="fas fa-plus"></i>Add new user</button>
                    </div>
                    <div className="user-table mt-5 mx-4">
                        <table id="customers">
                        <tbody>
                            <tr>
                                <th>Enail</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                            {arrUsers && arrUsers.map((item,index)=>
                            {
                                console.log('check',item,index)
                                return(
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={()=> this.handleEditUser(item)}><i className='fas fa-pencil-alt'></i></button>
                                            <button className='btn-delete'onClick={()=> this.handleDeleteUser(item)}><i className='fas fa-trash'></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
