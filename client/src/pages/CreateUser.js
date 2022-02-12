import {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';

function CreateUser() {

  const [form, setForm] = useState({
    username: '',
  });
  const [groups, setGroups] = useState(null);
  const [update, setUpdate] = useState(true);

  function inputHandler(event) {
    setForm({...form, [event.target.name]: [event.target.value]});
  }

  async function createHandler(event) {

    // Получение списка выбранных групп
    const nodeListOptions = document.querySelectorAll('option');
    const arrayOptions = Array.prototype.slice.call(nodeListOptions);
    const selectedOptions = arrayOptions.filter(option => option.selected);
    const values = selectedOptions.map(option => option.value);
    const formForSend = {username: form.username, groups: values};
    const body = JSON.stringify({...formForSend});

    await fetch('/api/users/', {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async function getListOfGroup() {
    const response = await fetch('/api/groups', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    setGroups(data);
  }

  useEffect(() => {
    if(update) {
      getListOfGroup();
      setUpdate(false);
    }
  }, [update]);

  return (
    <div className="row">
      <div className="col s12 m12">
        <div className="card" style={{ marginTop: '5rem' }}>
          <div className="card-content">
            <span className="card-title">Creating new User:</span>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="validate"
                  value={form.username}
                  onChange={inputHandler}
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="input-field col s12">
                <span style={{fontSize: '1rem'}}>Choose Group from list below:</span>
                <select className="browser-default" multiple style={{height: '9rem'}}>
                  {groups && groups.map(group => {
                    return (
                      <option key={group._id} value={group._id}>{group.name}</option>
                    )
                  })}
                </select>
              </div>         
            </div>
          </div>
          <div className="card-action">
            <NavLink
              to="/users"
              className="waves-effect waves-light btn-large"
              style={{marginRight: '2rem'}}
              onClick={createHandler}
            >Create</NavLink>
            <NavLink
              to="/users"
              className="waves-effect waves-light btn-large"
            >Cancel</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;