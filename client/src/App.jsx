import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/index";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;