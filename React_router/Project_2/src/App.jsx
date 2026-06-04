import './App.css'
import { Routes, Route } from "react-router";
import { MainPage } from './Pages/MainPage/MainPage'
import { ProgLangPage } from './Pages/ProgLangPage/ProgLangPage'
import { SinglPostPage } from './Pages/SinglPostPage/SinglPostPage'
import { RatingPage } from './Pages/RatingPage/RatingPage'
import { Page404 } from './Pages/Page404/Page404'
import { WithHeader } from './components/WithHeader.jsx';
import { languages } from '../utils/db.js';




function App() {

  const cards = languages;

  return (
    <>
      <Routes>

        <Route path='/programming-languages/:id' element={<SinglPostPage cards={cards} />}></Route>

        <Route path='/' element={<WithHeader />}>
          <Route index element={<MainPage />}></Route>
          <Route path='programming-languages' element={<ProgLangPage cards={cards} />}></Route>
          <Route path='rating' element={<RatingPage cards={cards} />}></Route>
          <Route path='*' element={<Page404 />}></Route>
        </Route>

      </Routes>

    </>
  )
}

export default App
