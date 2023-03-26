import "./App.css";
import SearchHeader from "./SearchHeader";
import searchImages from "./Api";
import {useState} from "react";
import ImageList from "./Components/imageList";



function App() {
  const [images, setImages] = useState([])
  
  const handleSubmit = async (term) => {
    const result = await searchImages(term);
    setImages(result)
  };
  return (
    <div className="App">
      <SearchHeader search={handleSubmit} />
      <ImageList imagesPlaceHolder = {images}/>
    </div>
  );
}

export default App;
