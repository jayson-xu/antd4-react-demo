import Home from '../views/Home';
import FormDemo from '../views/Form';
import ModalDemo from '../views/Modal';

let routes = [
  { path: '/form', name: '表单', component: FormDemo },
  { path: '/modal', name: '对话框', component: ModalDemo },
  { path: '/', name: '主页', exact: true, component: Home },
];

export default routes;
