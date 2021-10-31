import { Switch } from "react-router-dom";
import Home from "../pages/home";
import Dashboard from "../pages/dashboard";
import SignIn from "../pages/signin";
import SignUp from "../pages/signup";
import ProtectedRoute from "./protected";
const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute component={SignIn} path="/signin" />
      <ProtectedRoute component={SignUp} path="/signup" />
      <ProtectedRoute component={Dashboard} path="dashboard" isPrivate />
    </Switch>
  );
};

export default Routes;
