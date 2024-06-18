import { useContext } from "react";
import { FeedbackItemsContext } from "./FeedbackItemsContextProvider";

export function useFeedbackItemsContext() {
    const context = useContext(FeedbackItemsContext);
    if(!context) {
      throw new Error("useFeedbackItemsContext must be used within a FeedbackItemsContextProvider");
    }
    return context;
  }