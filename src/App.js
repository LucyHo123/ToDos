import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './containers/HomePage';
import TodoDetail from './containers/TodoDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/detail/:id' element={<TodoDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
