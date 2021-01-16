import './App.css';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <section className="main-container">
        <Switch>
          {routes.map(route => (
            <Route key={route.path} path={route.path} component={route.component} />
          ))}
        </Switch>
      </section>
    </div>
  );
}

export default App;
