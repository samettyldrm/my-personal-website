import axios from "axios";

const searchImages = async (term) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: "Client-ID vPTBYVsj7_FClsWA3Gu9_bqm8XiHbZ1oB9qn_ADtjqQ",
    },
    params: { query: term },
  });
  return response.data.results;
};

export default searchImages;
