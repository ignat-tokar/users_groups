import {BrowserRouter} from 'react-router-dom';
import useRoutes from './routes';
import 'materialize-css';

function App() {

  const routes = useRoutes();

  return (
    <BrowserRouter>
      <div className="container">
        {routes}
      </div>
    </BrowserRouter>
  );
}

export default App;
