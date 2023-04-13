import "./App.css";
import Footer from "./components/views/Footer";
import Header from "./components/views/Header";
import {Route, Routes} from "react-router-dom";
import Signup from "./components/views/SignUp";
import MainPage from "./components/views/MainPage";
import Update from "./components/views/UpdatePage";
function App() {
	return (
		<div>
			<Header />
			<Routes>
				<Route path="/" exact={true} Component={MainPage} />
				<Route path="/signup" exact={true} Component={Signup} />
        <Route path="/Update" exact={true} Component={Update} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
