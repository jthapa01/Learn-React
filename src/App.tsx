import Container from "./components/layout/Container"
import Footer from "./components/layout/Footer"
import HashTagList from "./components/hashtag/HashtagList"
import { useFeedbackItemsStore } from "./stores/feedbackItemsStore"
import { useEffect } from "react";

function App() {
const fetchFeedbackItems = useFeedbackItemsStore((state) => state.fetchFeedbackItems);

useEffect(() => {
  fetchFeedbackItems();
},[fetchFeedbackItems]);

  return (
    <div className="app">
      <Footer />
        <Container />
        <HashTagList />
    </div>
  )
}

export default App
