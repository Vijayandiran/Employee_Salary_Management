import logo from './logo.svg';
import './App.css';
import Count from './components/Count'
import EmployeeCreateForm from './pages/EmployeeCreateForm';
import EmployeeGridWithLocalizationProvider from './pages/EmployeeGrid';

function App() {
  return (
    <div className="App">
      <EmployeeCreateForm />
    </div>
  );
}

export default App;
