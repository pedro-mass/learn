import React, { useState } from "react"
import { Router, Link } from "@reach/router"
import Details from "./Details"
import SearchParams from "./SearchParams"
import ThemeContext from "./ThemeContext"

const App = () => {
  const theme = useState("darkblue")
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
