import React from 'react';

const SearchBar = ({onchange}) => (
    <input type="text" name="search" placeholder="Busca un producto" onChange={onchange} autoFocus></input>
);

export default SearchBar