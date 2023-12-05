import { Container } from '@mui/material';
import Header from './components/Header';
import './App.css';
import Product from './screens/Product';
import data from './data/data.json';

function App() {
  // console.log(data);
  return (
    <div className="App">
      <Header />
      <Product />
      {/* <Container maxWidth="xl">
        <h1>Hello World</h1>
      </Container> */}
    </div>
  );
}

export default App;
