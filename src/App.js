import './App.css';
import Navigation from './Navigation'
import Main from './Main'
import Jobs from './Jobs'
import Customer from './Customer'
import Suppliers from './Suppliers'
import {Switch, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <div className="App__header">
        <h1>App header</h1>
    
      </div>
      <div className="App__body">
        <div className="Nav">
         <Navigation/>
        </div>
        <div className="Main">
        <Switch>
      <Route path = '/customers'>
      
         <Customer/>
      </Route>
      <Route path = '/Jobs'>
    
         <Jobs/>
      </Route>
      <Route path = '/Suppliers'>
         <Suppliers/>
      </Route>
      <Route path = '/'>
  
         <Main/>
      </Route>
      </Switch>
        </div>
      </div>

    </div>
  );
}

export default App;
