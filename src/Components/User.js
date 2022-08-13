import "./User.css"

const User = ({ user, selectUser }) => {

  return (
      <div className="user-wrapper" onClick={() => selectUser(user)}>
          <div className="user-info">
          <div className="user-detail">
                  <img src={user.avatar} alt="user" className="avatar" />
                  <h4>{user.name}</h4>
              </div>
                      {user.isOnline ? (<div className="stat">
          <small className="online">on</small>
        </div>) : (<div className="stat">
            <small clas="offline">off</small>
              </div>)}
          </div>    
    </div>
  )
}

export default User