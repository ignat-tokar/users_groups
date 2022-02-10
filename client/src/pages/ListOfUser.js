import {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';

function ListOfUser() {

  const [users, setUsers] = useState(null);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    if(update){
      getListOfUser();
      setUpdate(false);
    }
  }, [update]);

  async function getListOfUser() {
    const response = await fetch('/api/users/', {
      method: 'GET',
      headers: {
        'Content-Type': 'applications/json'
      }
    });
    const data = await response.json();
    setUsers(data);
  }

  async function deleteHandler(event) {
    setUpdate(true);
    await fetch(`/api/users/delete/${event.target.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return (
    <>
      <h1>List of User</h1>
      <NavLink
        to="/users"
        style={{marginRight: '1.3rem'}}
        className="waves-effect waves-light btn"
      >Users</NavLink>
      <NavLink
        to="/groups"
        className="waves-effect waves-light btn"
      >Groups</NavLink>      
      <table>
        <thead>
          <tr>
              <th>Username</th>
              <th>Date</th>
              <th>Groups</th>
              <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users && users.map(user => {
            return (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{
                  user.create.split('T')[1].split(':')[0] + ':' +
                  user.create.split('T')[1].split(':')[1] + ' (' +
                  user.create.split('T')[0] + ')'
                }</td>
                <td>
                  {user.groups && user.groups.map(group => {
                    return (
                      <p key={group._id}>{group.name}</p>
                    );
                  })}
                </td>
                <td>
                  <NavLink
                    to={"/users/edit/t/" + user._id.toString()}
                    className="waves-effect waves-light btn"
                    style={{marginRight: '2rem'}}
                  >Edit</NavLink>
                  <NavLink
                    to="/users"
                    id={user._id}
                    className="waves-effect waves-light btn"
                    onClick={deleteHandler}
                  >Delete</NavLink>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>    
      <NavLink to="/users/create" className="waves-effect waves-light btn" >Add new User</NavLink>
    </>
  );
}

export default ListOfUser;