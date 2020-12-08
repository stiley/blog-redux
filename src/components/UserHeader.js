import React from 'react';
import { connect } from 'react-redux';
import { fetchUser} from "../actions";


class UserHeader extends React.Component{

    componentDidMount() {
         this.props.fetchUser(this.props.userId)
    }

    render(){
        const author = this.props.users.find((user) => {
           return user.id === this.props.userId
        });
        if(!author){
            return null;
        }
        return(
            <div className="header">{author.name}</div>
        );
    }
};

const mapStateToProps = (state) =>{return {users: state.users}};

export default connect(mapStateToProps,{fetchUser: fetchUser})(UserHeader);