import {Routes, Route, Navigate} from 'react-router-dom';
import ListOfGroup from './pages/ListOfGroup';
import CreateGroup from './pages/CreateGroup';
import EditGroup from './pages/EditGroup';

import ListOfUser from './pages/ListOfUser';
import CreateUser from './pages/CreateUser';
import EditUser from './pages/EditUser';


function useRoutes() {
  return (
    <Routes>
      <Route path="/users" element={<ListOfUser />}/>
      <Route path="/users/create" element={<CreateUser />}/>
      <Route path="/users/edit/t/*" element={<EditUser />}/>
      <Route path="/groups" element={<ListOfGroup />}/>
      <Route path="/groups/create" element={<CreateGroup />}/>
      <Route path="/groups/edit/t/*" element={<EditGroup />}/>
      <Route path="/" element={<Navigate to="/groups" />}/>
    </Routes>
  );
}

export default useRoutes;