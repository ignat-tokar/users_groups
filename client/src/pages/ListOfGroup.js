import {useState, useEffect, useCallback} from 'react';
import {NavLink} from 'react-router-dom';
import useHttp from '../hooks/http.hook';

function ListOfGroup() {
  const {request} = useHttp();

  const [first, setFirst] = useState(true);
  const [groups, setGroups] = useState()

  useEffect (() => {
    if (first) {
      update();
      setFirst(false);
    }
  }, [first]);

  async function update() {
    const fetchedGroups = await request('/api/groups');
    setGroups(fetchedGroups);
  }

  async function deleteHandler(event) {
    const id = event.target.id;
    setFirst(true);
    await fetch(`/api/groups/delete/${id}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return (
    <>
      <h1>List of Group</h1>
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
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {groups && groups.map(group => {
            return (
              <tr key={group._id}>
                <td>{group.name}</td>
                <td>{group.description}</td>
                <td>
                  <NavLink
                    to={"/groups/edit/t/" + group._id.toString()}
                    className="waves-effect waves-light btn"
                    style={{marginRight: '2rem'}}
                  >Edit</NavLink>
                  <NavLink
                    to="/groups"
                    id={group._id}
                    className="waves-effect waves-light btn"
                    onClick={deleteHandler}
                  >Delete</NavLink>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>    
      <NavLink to="/groups/create" className="waves-effect waves-light btn" >Add new Group</NavLink>
    </>
  );
}

export default ListOfGroup;