import React from "react";
import { useState } from "react";

const icon = '<i className="fa-solid fa-magnifying-glass flex flex-column"></i>'

function SearchHeader({ search }) {
  const [valueInput, setValue] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    search(valueInput);
  };

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div className="flex flex-row p-5">
      <form className="w-screen" onSubmit={handleFormSubmit}>
        <label className="flex flex-row items-center gap-x-2 p-1">
        <i className="fa-solid fa-magnifying-glass absolute top-16 left-16 pointer-events-none text-sky-500" ></i>
        </label>
        <input 
        placeholder="Search..." 
        className="input w-full box-border p-3 pl-12 border-2 border-sky-500" value={valueInput} onChange= {handleChange} />
        
      </form>
    </div>
  );
}

export default SearchHeader;
