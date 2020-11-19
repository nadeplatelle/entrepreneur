import './App.css';
import Navigation from './Navigation'
import Main from './pages/Main'
import Jobs from './pages/Jobs'
import Customer from './pages/Customer'
import Suppliers from './pages/Suppliers'
import {Switch, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <div className="App__header">
        <h1>Entrepreneur</h1>
    
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
   ) ;
}

export default App;
