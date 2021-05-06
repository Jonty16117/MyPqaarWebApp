import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Homepage from "./components/homepage/Homepage";
import Dashboard from "./components/dashboard/Dashboard";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Homepage}></Route>
          <Route path="/login">
            <h1>Login</h1>
          </Route>
          <Route path="/signup">
            <h1>Register</h1>
          </Route>
          <Route path="/dashboard" exact component={Dashboard}></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}
