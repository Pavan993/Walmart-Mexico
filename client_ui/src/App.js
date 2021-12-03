import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';

import Users from './Components/Users';
import DemoGraphicUser from './Components/DemoGraphicUser'

function App() {
  return (
    <div className="App">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Users />
        </Grid>
        <Grid item xs={6}>
          <DemoGraphicUser />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
