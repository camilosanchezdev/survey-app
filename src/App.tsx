import { AppProvider } from './providers/app';
import { AppRoutes } from './routes';

// primereact - theme
import 'primereact/resources/themes/lara-light-indigo/theme.css';
// primereact - core
import 'primereact/resources/primereact.min.css';

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
