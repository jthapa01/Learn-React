
import { useFeedbackItemsContext } from "../../contexts/hooks";
import HashtagItem from "./HashtagItem";

export default function HashTagList() {

  const {companyList, handleSelectCompany} = useFeedbackItemsContext();
  return (
    <ul className="hashtags">
      {
        companyList.map((company: string) =>
        (
          <HashtagItem company={company} onSelectCompany={handleSelectCompany}></HashtagItem>
        ))
      }
    </ul>
  )
}