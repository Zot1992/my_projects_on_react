import './App.css'
import { Routes, Route } from "react-router";

import { MainPage } from './Pages/User/MainPage/MainPage'
import { ArticlesPage } from './Pages/User/ArticlesPage/ArticlesPage'
import { WePage } from './Pages/User/WePage/WePage'
import { Page404 } from './Pages/User/Page404/Page404';
import { SingleArticlePage } from './Pages/User/SingleArticlePage/SingleArticlePage'
import { User } from './components/User';

import { Admin } from './components/Admin';
import { PageDashboard } from './Pages/Admin/PageDashboard/PageDashboard'
import { PageCategories } from './Pages/Admin/PageCategories/PageCategories';
import { PageUpdateCategory } from './Pages/Admin/PageUpdateCategory/PageUpdateCategory';
import { PageCreateCategory } from './Pages/Admin/PageCreateCategory/PageCreateCategory';
import { PageDashboardArticles } from './Pages/Admin/PageDashboardArticles/PageDashboardArticles';
import { PageUpdateArticle } from './Pages/Admin/PageUpdateArticle/PageUpdateArticle';
import { PageCreateArticle } from './Pages/Admin/PageCreateArticle/PageCreateArticle';

import { arrayArticles, arrayCategories } from '../utils/db'

function App() {

  const articles = arrayArticles;
  const categories = arrayCategories;

  return (
    <>
      <Routes>

        <Route path='/dashboard' element={<Admin />}>
          <Route index element={<PageDashboard />}></Route>
          <Route path='categories' element={<PageCategories categories={categories} />}></Route>
          <Route path='categories/create' element={<PageCreateCategory />}></Route>
          <Route path='categories/update/:categoryId' element={<PageUpdateCategory />}></Route>
          <Route path='articles' element={<PageDashboardArticles articles={articles} />}></Route>
          <Route path='articles/create' element={<PageCreateArticle categories={categories} />}></Route>
          <Route path='articles/update/:articleId' element={<PageUpdateArticle categories={categories} />}></Route>
        </Route>

        <Route path='/' element={<User />}>
          <Route index element={<MainPage />}></Route>
          <Route path='articles' element={<ArticlesPage articles={articles} categories={categories} />}></Route>
          <Route path='articles/:categorySlug' element={<ArticlesPage articles={articles} categories={categories} />}></Route>
          <Route path='articles/:categorySlug/:articleId' element={<SingleArticlePage articles={articles} />}></Route>
          <Route path='we' element={<WePage />}></Route>
          <Route path='*' element={<Page404 />}></Route>
        </Route>

      </Routes>
    </>
  )
}

export default App
