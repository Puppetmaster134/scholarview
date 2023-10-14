import { useMemo, useState, useEffect } from "react";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Scatterplot from "./Scatterplot/Scatterplot";
import InfoPane from "./InfoPane";
import FilterPane from "./FilterPane/FilterPane";

const ScholarViewPane = ({data}) => {
    const [allData, setAllData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [yearList, setYearList] = useState([])

    const [filter, setFilter] = useState({
        substringMatch : '',
        minYear : 0,
        maxYear : 3000
    })

    const [subsetSize, setSubsetSize] = useState(null)
    const [hovered, setHovered] = useState(null);
    const [selected, setSelected] = useState(null);

    const applyFilter = () => {
        let fd = allData.filter((element) => {
            if(filter === undefined) {
                return true;
            }
        
            let pass = true;
            if ('substringMatch' in filter) {
                let criterion = filter.substringMatch.toLowerCase()
                pass = pass && (element.title.toLowerCase().includes(criterion) || element.abstract.toLowerCase().includes(criterion))
            }

            if ('minYear' in filter) {
                pass = pass && element.year >= filter.minYear
            }

            if ('maxYear' in filter) {
                pass = pass && element.year <= filter.maxYear
            }

            return pass;
        })

        let dataSubset = subsetSize != null ? fd.slice(0, subsetSize) : fd
        return dataSubset
    }

    useEffect(() =>{
        // let tmp = subsetSize != null ? data.slice(0, subsetSize) : data
        let allYears = []
        const daters = data.map((entry) => {
            let point2d = entry['emb2d']
            allYears.push(entry['year'])
            return {
                x : point2d[0],
                y : point2d[1],
                title : entry['title'],
                abstract : entry['abstract'],
                url : entry['url'],
                year : entry['year'],
                authors : entry['authors']
            }
        })

        setAllData(daters)
        // setFilterData(daters)
        
        allYears = [...new Set(allYears)]
        setYearList(allYears)
    }, [])

    useEffect(() => {
        let fd = applyFilter()
        setFilterData(fd)
    }, [filter])

    useEffect(() => {
        let fd = applyFilter()
        setFilterData(fd)
    }, [allData])

    const updateFilter = (filter) => {
        setFilter(filter)
    }

    const onRightClick = (e) =>{
        e.preventDefault()
        setSelected(null)
    }


    return (
        <>
        <Row style={{height:"100%"}}>
            <Col lg={3}>
                <Row style={{margin:0, padding:5}}>
                    <FilterPane years={yearList} updateFilterCallback={updateFilter}/>
                </Row>
                <Row>
                    <InfoPane itemInfo={selected}/>
                </Row>
            </Col>
            <Col lg={9} style={{height:"100%"}} onContextMenu={onRightClick}>
                <Row style={{height:"100%"}}>
                    <Scatterplot
                        data = {filterData}
                        setSelected = {setSelected}
                        setHovered = {setHovered}
                    />
                </Row>
            </Col>
        </Row>
        </>
    );
};

export default ScholarViewPane