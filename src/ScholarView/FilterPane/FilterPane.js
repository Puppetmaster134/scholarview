import { useMemo, useState, useEffect } from "react";
import SearchBar from "./SearchBar/SearchBar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import YearPicker from "./YearPicker/YearPicker";

const FilterPane = ({years, updateFilterCallback}) => {
    const [filter, updateFilter] = useState()

    const updateYearFilter = (f) => {
        updateFilter({
            ...filter,
            minYear:f.min,
            maxYear:f.max
        })
    }

    const updateSubstringFilter = (f) => {
        updateFilter({
            ...filter,
            substringMatch:f
        })
    }

    useEffect(() => {
        updateFilterCallback(filter)
    },[filter])

    return (
        <>
            <Row>
                <SearchBar updateSubstringFilter={updateSubstringFilter}/>
            </Row>
            <Row style={{paddingTop:10, paddingBottom:10}}>
                <YearPicker years={years} updateYearFilter={updateYearFilter}/>
            </Row>
        </>
    );
};

export default FilterPane