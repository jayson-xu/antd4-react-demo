import './App.css';
import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';
import Navbar from './components/Navbar';

const onResize = () => {
  console.log('onResize', `${document.documentElement.clientWidth}, ${document.documentElement.clientHeight}`)
}

function App() {
  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize',  onResize)
    }
  }, []);

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
