import Routes from "./routes";
import Header from "./components/Header";
import { GlobalStyles } from "./styles/global";
function App() {
  return (
    <>
      <Header />
      <Routes />
      <GlobalStyles />
    </>
  );
}

export default App;
