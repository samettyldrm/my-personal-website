function ImageItem({image}) {
    console.log(image)
  return <div className=" m-3 rounded-xl shadow-lg cursor-pointer shadow-black-100 hover:shadow-indigo-500/100">
    <img className="h-72 w-full object-cover rounded-t-xl" src={image.urls.small} alt={image.alt_description} />
    <p className="text-xs p-5 text-right italic">{image.alt_description}</p>
  </div>
}

export default ImageItem;
