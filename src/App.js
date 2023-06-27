import './App.css';
import NavBar from './components/NavBar';
import Todo from './components/Todo';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="*" element={<h1>404 PAGE NOT FOUND!</h1>} />
          <Route path="/login" element={<Login/>}>
          </Route>
          <Route path="/register" element={<Register />}>
          </Route>

          <Route path="/todos" element={<Todo/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;