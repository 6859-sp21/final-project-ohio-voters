import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage";
import VisualizationPage from "./pages/VisualizationPage";
import WriteupPage from "./pages/WriteupPage";

function App() {
    return (
        <Router basename={"/final-project-ohio-voters"}>
            <div className="App">
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/visualization">Visualization</Link>
                    <Link to="/writeup">Writeup</Link>
                </nav>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/visualization" component={VisualizationPage}/>
                    <Route exact path="/writeup" component={WriteupPage}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
