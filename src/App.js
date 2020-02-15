import React from "react";
import Header from "./components/Header";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./constants/PrivateRoute";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Jobtracker from "./pages/Jobtracker";
import Add from "./pages/Add";
import Edit from "./pages/Edit";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <AuthProvider>
        <Router>
          <PrivateRoute exact path="/" component={Jobtracker} />
          <PrivateRoute exact path="/add" component={Add} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />

          <Route
            path="/jobs/:jobId"
            render={props => (
              <Edit {...props} jobId={props.match.params.jobId} />
            )}
          />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
