import MoviePage from "./components/MoviePage"
import Search from "./components/Search"
import { SearchProvider } from "./context/SearchContext"

function App() {

  return (
   <>
    <SearchProvider>
      <Search/>
      <MoviePage />
    </SearchProvider>   
   </>
  )
}

export default App
