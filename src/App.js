import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Components/Home';


class App extends Component {
render(){
  return (
    <BrowserRouter>
    <div>
        <Home/>
    </div>
    </BrowserRouter>
  );
}
  
}

export default App;
