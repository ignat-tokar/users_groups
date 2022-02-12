import {useState} from 'react';
import {NavLink} from 'react-router-dom';

function CreateGroup() {

  const [form, setForm] = useState({
    name: '',
    description: ''
  });

  function inputHandler(event) {
    setForm({...form, [event.target.name]: [event.target.value]});
  }

  async function createHandler(event) {

    const body = JSON.stringify({...form});
    console.log(body);

    await fetch('/api/groups/', {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return (
    <div className="row">
      <div className="col s12 m12">
        <div className="card" style={{ marginTop: '5rem' }}>
          <div className="card-content">
            <span className="card-title">Creating new Group:</span>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="validate"
                  value={form.name}
                  onChange={inputHandler}
                />
                <label htmlFor="name">Name of Group</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="description"
                  name="description"
                  type="text"
                  className="validate"
                  value={form.description}
                  onChange={inputHandler}
                />
                <label htmlFor="description">Description of Group</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <NavLink
              to="/groups"
              className="waves-effect waves-light btn-large"
              style={{marginRight: '2rem'}}
              onClick={createHandler}
            >Create</NavLink>
            <NavLink
              to="/groups"
              className="waves-effect waves-light btn-large"
            >Cancel</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateGroup;