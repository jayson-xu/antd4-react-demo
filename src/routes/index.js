import Home from '../views/Home';
import FormDemo from '../views/Form';
import ModalDemo from '../views/Modal';
import TableDemo from '../views/Table';

let routes = [
  { path: '/form', name: '表单', component: FormDemo },
  { path: '/modal', name: '对话框', component: ModalDemo },
  { path: '/table', name: '表格', component: TableDemo },
  { path: '/', name: '主页', exact: true, component: Home },
];

export default routes;
