import React, { useContext } from 'react'
import searchContext from '../../contexts/searchContext';

const SearchBar = ({handleSearchSubmit}) => {
  const [searchValues, setSearchValues] = useContext(searchContext)
  const handleSearch = (e) => {
    e.preventDefault();
   setSearchValues({
    ...searchValues, 
    [e.target.name] : e.target.value
   })
  }
  const mindate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return year + "-" + month + "-" + day
  }
  return (
    <div className='shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-xl flex'>
      <input
        type="text"
        name='source'
        placeholder='leaving from'
        value={searchValues.source}
        className='p-4 rounded-tl-xl rounded-bl-xl outline-none border-r-2 border-gray-200'
        onChange={handleSearch}
      />
      <input
        type="text"
        name='destination'
        placeholder='Going to'
        className='p-4 outline-none border-r-2 border-gray-200'
        value = {searchValues.destination}
        onChange={handleSearch}
      />
      <input type="date"
        name="date"
        min={mindate()}
        value={searchValues.date}
        className='p-4 outline-none border-r-2 border-gray-200'
        onChange={handleSearch}
      />
      <input 
      type="text" 
      name="seats" 
      placeholder='persons' 
      className='p-4 outline-none border-r-2 border-gray-200'
      value={searchValues.seats}
      onChange = {handleSearch}
      />
      <button 
      onClick={handleSearchSubmit}
      className='rounded-tr-xl rounded-br-xl flex justify-center items-center px-4 bg-teal-500 text-white text-lg font-bold'>
        search
      </button>

    </div>
  )
}

export default SearchBar