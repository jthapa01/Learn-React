import { createContext, useEffect, useMemo, useState } from "react";
import { TFeedbackItem } from "../lib/types";

type FeedbackItemsContextProviderProps = {
  children: React.ReactNode;
}

type TFeedbackItemsContext = {
  feedbackItems: TFeedbackItem[];
  filteredFeedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  companyList: string[];
  handleAddToList: (text: string) => void;
  handleSelectCompany: (company: string) => void;
}

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(null);



export default function FeedbackItemsContextProvider({ children }: FeedbackItemsContextProviderProps) {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  const companyList = useMemo(() => feedbackItems.map((item) => item.company).
    filter((company, index, array) => {
      return array.indexOf(company) === index;
    }), [feedbackItems]);

    const filteredFeedbackItems = useMemo(() =>
      selectedCompany
        ? feedbackItems.filter((item) => item.company === selectedCompany)
        : feedbackItems,
      [selectedCompany, feedbackItems]
    );

  const handleAddToList = async (text: string) => {
    const companyName =
      text
        .split(" ")
        .find((word) => word.includes("#"))!
        .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      badgeLetter: companyName.charAt(0).toUpperCase(),
      company: companyName,
      text: text,
      daysAgo: 0,
      upvoteCount: 0
    };

    setFeedbackItems([...feedbackItems, newItem])

    await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
  }

  const handleSelectCompany = (company: string) => { setSelectedCompany(company) };

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks")

        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json(); // Await the response.json() method
        setFeedbackItems(data.feedbacks);
      } catch (error) {
        setErrorMessage("There was an error fetching the feedback items. Please try again later.");
      }
      setIsLoading(false);
    }
    fetchFeedbackItems();
  }, []);

  return (
    <FeedbackItemsContext.Provider value={{
      feedbackItems,
      filteredFeedbackItems,
      isLoading,
      errorMessage,
      companyList,
      handleAddToList,
      handleSelectCompany
    }}>{children}</ FeedbackItemsContext.Provider>
  );
}