import { useSearchParams } from "react-router-dom";

/*
  חייב להתחיל ב
  use
  חייב להיות פונקציה
*/

const useQueryParams = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  // console.log("searchParams = " + searchParams);

  let query = {};

  /*
        ?animal=dog&race=mammals

        query = {
            animal:"dog",
            race:"mammals"
        }
    */
  for (const [key, value] of searchParams) {
    console.log("value = " + value);
    query[key] = value;
    /*
        query = {
            animal:"dog",
            race:"mammals"
        }
    */
  }
  // console.log("query = " + JSON.stringify(query));
  return query;
};

export default useQueryParams;
