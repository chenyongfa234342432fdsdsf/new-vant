import "./style/index.css";
import _Sidebar from './Sidebar';
import SidebarItem from './SidebarItem';
const Sidebar = Object.assign(_Sidebar, {
  Item: SidebarItem
});
export { Sidebar, SidebarItem };