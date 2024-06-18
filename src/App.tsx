import Container from "./components/layout/Container"
import Footer from "./components/layout/Footer"
import HashTagList from "./components/hashtag/HashtagList"
import FeedbackItemsContextProvider from "./contexts/FeedbackItemsContextProvider";


function App() {
  return (
    <div className="app">
      <Footer />
      <FeedbackItemsContextProvider>
        <Container />
      </FeedbackItemsContextProvider>
      <HashTagList />
    </div>
  )
}

export default App
