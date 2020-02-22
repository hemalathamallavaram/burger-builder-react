import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';


function App() {
  return (
    <BrowserRouter>
        <div className="App">
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
    </BrowserRouter>
  );
}

export default App;
