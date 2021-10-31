import { Redirect, Route as ReactDOMRoute } from "react-router-dom";
import { useUser } from "../providers/User";

const ProtectedRoute = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { authenticated } = useUser();

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return isPrivate === authenticated ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/" : "/",
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
