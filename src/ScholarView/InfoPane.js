import { useMemo, useState, useEffect } from "react";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const InfoPane = ({itemInfo}) => {
    const authorString = () => {
        let formattedAuthors = itemInfo.authors.map((authorData) => {
            let lastName = authorData.last.join(' ')
            let firstName = authorData.first.join(' ')
            
            return lastName + ", " + firstName
        })

        return formattedAuthors.join('; ')
    }

    return (
        <>
            {itemInfo && (
                <>
                <h4><a href={itemInfo.url} target="_blank">{itemInfo.title}</a></h4>
                <div style={{fontWeight : "bold"}}>{itemInfo.year}</div>
                <div>
                    {authorString()}
                </div>
                <hr/>
                <div>{itemInfo.abstract}</div>
                </>
            )}
        </>
    );
};

export default InfoPane