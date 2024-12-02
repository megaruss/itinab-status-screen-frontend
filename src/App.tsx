import "./App.css"; // Import the CSS file
import NetworkWidget from "./components/NetworkWidget";
import ServerStatus from "./components/ServerStatus";
import EnvironmentStatus from "./components/EnvironmentStatus";
import config from './config'; 

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <h1>ITinaB Status - {config.NATIONAL_SOCIETY_NAME}</h1>
        </div>
        <div className="header-right">
          <img src="/eru-logo.png" alt="Logo" className="logo" />
        </div>
      </header>
      <div className="content">
        <div className="column">
          <NetworkWidget />
        </div>
        <div className="column">
          <ServerStatus />
        </div>
        <div className="column">
          <EnvironmentStatus />
        </div>
      </div>
    </div>
  );
}

export default App;
