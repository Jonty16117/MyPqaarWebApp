import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Homepage from "./components/homepage/Homepage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import AddRoutes from "./components/dashboard/ScheduleAuction/AddRoutes";
import InitializeAuction from "./components/dashboard/InitializeAuction/InitializeAuction";
import ConductAuction from "./components/dashboard/ConductAuction/ConductAuction";
import AddTrucksRequests from "./components/dashboard/ManageTrucks/AddTrucksRequests";
import RemoveTrucksRequests from "./components/dashboard/ManageTrucks/RemoveTrucksRequests"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Homepage}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/register" exact component={Register}></Route>
          <Route path="/dashboard" exact component={Dashboard}></Route>
          <Route path="/addroutes" exact component={AddRoutes}></Route>
          <Route path="/initializeAuction" exact component={InitializeAuction}></Route>
          <Route path="/conductAuction" exact component={ConductAuction}></Route>
          <Route path="/addTrucksRequests" exact component={AddTrucksRequests}></Route>
          <Route path="/removeTrucksRequests" exact component={RemoveTrucksRequests}></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}
