import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import MovieList from "./components/MovieList/MovieList";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import SeriesDetail from "./pages/SeriesDetail/SeriesDetail";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header></Header>
                <Routes>
                    <Route index element={<Home />}></Route>
                    <Route path="movie/:id" element={<Detail />}></Route>
                    <Route path="series/:id" element={<SeriesDetail />}></Route>
                    <Route path="movies/:type" element={<MovieList />}></Route>
                </Routes>
                <Footer></Footer>
            </BrowserRouter>
        </div>
    );
}

export default App;
