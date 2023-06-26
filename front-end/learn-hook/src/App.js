import React from 'react';
import {
  BrowserRouter as Router,
  useHistory,
  useParams,
} from "react-router-dom";
import './App.css';
import { AppProvider } from './context/AppContext';
import HookRouter from './features/RouterDOM/HookRouter';
import Menu from './features/RouterDOM/Menu';
import logo from './logo.svg';

function App() {
  let history = useHistory();
  console.log("🚀 ~ file: App.js ~ line 14 ~ App ~ history", history)

  return (
    <Router
      basename="/ndh"
    >
      <AppProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Menu />
            <HookRouter />
            {/* <MyLazyLoad /> */}
            {/* <Count /> */}

            {/* <TestEffect /> */}
          </header>
        </div>
      </AppProvider>

    </Router>
  );
}

export default App;
