import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const styleAccordionDetails = {
    borderTop:'1px solid rgba(0,0,0, .125)'
}


export default function Collapsible({ index, question, answer, onChange, expanded }) {
    
    return (
        <div>
            <Accordion expanded={expanded === `panel${index}`} className='w-[50rem] my-2 sm:min-w-[10rem] sm:max-w-[20rem] md:w-[30rem] lg:w-[35rem] xl:w-[40rem]' onChange={onChange(`panel${index}`)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className='text-xl'
                >
                    {question}
                </AccordionSummary>
                <AccordionDetails sx={styleAccordionDetails}>
                    {answer}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
