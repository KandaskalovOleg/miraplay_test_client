import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { App } from './App';
import { Games } from './components/Games/Games';

export const Root = () => (
  <Router>
    <Routes>
      <Route  path="/" element={<App />}>
        <Route path="games" element={<Games />} />
      </Route>
    </Routes>
  </Router>
)
