import { useMemo, useState, useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const YearPicker = ({years, updateYearFilter}) => {
    const [yearList, setYearList] = useState([])
    const [min, setMin] = useState('')
    const [max, setMax] = useState('')

    useEffect(() => {
        setYearList(years)

        if (years.length > 0) {
            setMin(Math.min(...years))
            setMax(Math.max(...years))
        }
        else {
            setMin('')
            setMax('')
        }
    },[years])

    useEffect(() => {
        updateYearFilter({
            min:min,
            max:max
        })
    },[min, max])

    const updateMin = (event) => {
        setMin(event.target.value)
    }

    const updateMax = (event) => {
        setMax(event.target.value)
    }

    return (
        <>
            <Row>
                <Col lg={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">From</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={min}
                            label="Min"
                            onChange={updateMin}
                        >
                            {yearList.map((year) => {
                                return (
                                    <MenuItem key={year} value={year}>{year}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Col>
                <Col lg={6} style={{padding:"0"}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">To</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={max}
                            label="Max"
                            onChange={updateMax}
                        >
                            {yearList.map((year) => {
                                return (
                                    <MenuItem key={year} value={year}>{year}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Col>
            </Row>

        </>
    );
};

export default YearPicker