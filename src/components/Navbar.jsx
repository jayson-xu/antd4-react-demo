import { Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import routes from '../routes';

function Navbar() {
  const history = useHistory();

  function menuClicked({ item, key, keyPath, domEvent }) {
    console.log(key, item);
    history.push(key);
  }

  return (
    <section className="main-menu">
      <Menu mode="inline" onClick={menuClicked}>
        {routes.map(route => (
          <Menu.Item key={route.path}>
            <span>{route.name}</span>
          </Menu.Item>
        ))}
      </Menu>
    </section>
  );
}

export default Navbar;
