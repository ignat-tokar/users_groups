import {useState, useEffect} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import useHttp from '../hooks/http.hook';

function EditGroup() {

  const [form, setForm] = useState({
    name: '',
    description: ''
  });
  const groupId = document.location.pathname.split('/t/')[1];
  const [group, setGroup] = useState(null);
  const [first, setFirst] = useState(true);
  const {request} = useHttp();
  const navigate = useNavigate();

  async function getGroupById() {
    const data = await request('/api/groups');

    const fetchedGroup = data.filter(group => {
      return group._id === groupId;
    });
    setForm({...fetchedGroup[0]});
  }

  useEffect(() => {
    if (first) {
      getGroupById();
      setFirst(false);
    }
  }, []);

  function inputHandler(event) {
    setForm({...form, [event.target.name]: [event.target.value]});
  }

  async function saveHandler(event) {

    const body = JSON.stringify({...form});
    const id = document.location.pathname.split('/t/')[1];

    await fetch(`/api/groups/edit/${id}`, {
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
          {form.name &&
            <div className="card-content">
              <span className="card-title">Creating new Group:</span>
              <div className="row">
                <div className="input-field col s12 inline">
                  <span style={{fontSize: '1.3rem'}}>Name: </span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="validate"
                    value={form.name}
                    onChange={inputHandler}
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <span style={{fontSize: '1.3rem'}}>Description:</span>
                  <input
                    id="description"
                    name="description"
                    type="text"
                    className="validate"
                    value={form.description}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
          }
          <div className="card-action">
            <NavLink 
              to='/groups'
              className="waves-effect waves-light btn-large"
              style={{marginRight: '2rem'}}
              onClick={saveHandler}
            >Save</NavLink>
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

export default EditGroup;