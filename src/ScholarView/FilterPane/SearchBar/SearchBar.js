import { useMemo, useState, useEffect } from "react";

import { TextField } from "@mui/material";
const SearchBar = ({onRangeUpdate, updateSubstringFilter}) => {
    const [substring, setSubstring] = useState("")

    const onSubstringChange = (e) => {
        setSubstring(e.target.value)
    }

    useEffect(() => {
        updateSubstringFilter(substring)
    },[substring])
    
    return (
        <>
            <TextField id="outlined-basic" label="Substring Search" onChange={onSubstringChange} variant="outlined" value={substring}/>
        </>
    );
};

export default SearchBar