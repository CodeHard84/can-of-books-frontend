import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const AuthButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated ? (
        <Button variant="danger" onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </Button>
      ) : (
        <Button variant="success" onClick={() => loginWithRedirect()}>
          Log In
        </Button>
      )}
    </>
  );
};

export default AuthButton;
