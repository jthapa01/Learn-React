import FeedbackItem from "./FeedbackItem"
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useFeedbackItemsContext } from "../../contexts/hooks";

export default function FeedbackList() {

  const {isLoading, errorMessage, feedbackItems} = useFeedbackItemsContext();

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {
        feedbackItems.map((feedbackItem) => (
          <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
        ))
      }
    </ol>
  )
}