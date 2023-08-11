import React from 'react'
import '../styles/search.scss'
import SearchIcon from '../images/search.svg'

const Search = () => {
  return (
    <>
      <img className='searchImg' src={SearchIcon} alt='Arama İcon' />
      <input type='text' placeholder='FİLM VEYA DİZİ ARA...' />
    </>
  )
}

export default Search
