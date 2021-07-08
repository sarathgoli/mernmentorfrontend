import React from "react";
import Navbar from "./components/Navbar/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/home";
import Writeblog from "./pages/writeblog";
import Dashboard from "./pages/dashboard";
import Lost from "./pages/lost";
import Login from "./pages/login";
import Register from "./pages/registration";
import Displaypost from "./pages/displaypost";
import Forgetpassword from "./pages/forgetpassword";
import { selectUser } from "./components/redux_code/userSlice";
import { useSelector } from "react-redux";
import Editpost from "./pages/editpost";
import Logout from "./pages/logout";
import Addmail from "./pages/addmail"
import Addcdata from "./pages/addcdata";
import Addingcdata from "./pages/addingcdata";
import Updatingcdata from "./pages/updatingcdata"
import AdminDashboard from "./pages/admindashboard";


function App() {
  const user = useSelector(selectUser);
  return (
    <Router>
      <Navbar />
      <Switch>
        {/* <Route exact path="/" component={About} /> */}
        {user != null && user.isauthenticated && (
          <Route exact path="/home" component={Home} />
        )}
        {user != null && user.isauthenticated && (
          <Route exact path="/writeblog" component={Writeblog} />
        )}
        {user != null && user.isauthenticated && (
          <Route exact path="/dashboard" component={Dashboard} />
        )}
        <Route exact path="/" component={About} />
        <Route exact path="/registration" component={Register} />
        <Route exact path="/forgetpassword" component={Forgetpassword} />
        {user != null && user.isauthenticated && (
        <Route exact path="/displayingpost/:postid" component={Displaypost} />
        )}
        {user != null && user.isauthenticated && (
        <Route exact path="/editpost/:postid" component={Editpost}/>
        )}
        {user != null && user.isauthenticated && user.isadmin && (
        <Route exact path="/addmail" component = {Addmail} />
        )}
        {user != null && user.isauthenticated && user.isadmin && (
        <Route exact path="/addcdata" component = {Addcdata} />)}
        {user != null && user.isauthenticated && user.isadmin && (
        <Route exact path="/addingcdata" component = {Addingcdata} />)}
        {user != null && user.isauthenticated && user.isadmin && (
        <Route exact path="/updatingcdata" component = {Updatingcdata} />)}
        {user != null && user.isauthenticated && user.isadmin && (
        <Route exact path="/admindashboard" component={AdminDashboard}/>)}
        <Route exact path="/login" component={Login}/>
        {user != null && user.isauthenticated && (
        <Route exact path="/logout" component={Logout}/>
        )}
        {/* <Route component={Lost} /> */}
        <Route exact path="*" component={About}/>
      </Switch>
    </Router>
  );
}

export default App;
