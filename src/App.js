import {Link, Route, Switch, Redirect} from "react-router-dom";
import './App.css';
import StoryPage from "./pages/StoryPage";
import MapPage from "./pages/MapPage";
import AboutPage from "./pages/AboutPage";

function App() {
    return (
        <div className="App">
            <nav>
                <Link to="/story">Story</Link>
                <Link to="/map">Map</Link>
                <Link to="/about">About</Link>
            </nav>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/story"/>
                </Route>
                <Route exact path="/story" component={StoryPage}/>
                <Route exact path="/map" component={MapPage}/>
                <Route exact path="/about" component={AboutPage}/>
            </Switch>
        </div>
    );
}

export default App;
