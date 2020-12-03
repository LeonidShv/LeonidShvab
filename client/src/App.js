import { requestHttp } from './api';
import './App.css';

function App() {

  const logIn = async () => {
      const response = await requestHttp('/api/login', {
        email: "senya2@gmail.com",
        password: "1234"
      }, 'POST')

      console.log('response login: ', response);
  }

  const rgistration = async () => {
    const response = await requestHttp('/api/registration', {
      email: "senya2@gmail.com",
      password: "1234"
    }, 'POST')

    console.log('response login: ', response);
  }

  return (
    <div className="App">
      <h1>Hi</h1>

      <button onClick={logIn}>logIn</button>

      <button onClick={rgistration}>Rgistration</button>

    </div>
  );
}

export default App;
