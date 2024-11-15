import Header from './components/Header';
import TaskManager from './components/TaskManager';
import ShopInput from './components/ShopInput';



export default function App() {
  return (
    <>
      <Header title="Taskmanager" logoUrl="/posty_1.svg" />
      <TaskManager />
    </>
  );
}
