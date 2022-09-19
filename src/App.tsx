import React, { useRef, useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import Box from '@mui/material/Box';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Map from './Map';
import './App.css';



function App() {
  const gisUrl = 'https://services.arcgis.com/tNJpAOha4mODLkXz/arcgis/rest/services/Parks_Recreation/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson';

  const [allHikes, setAllHikes] = useState<any>()
  const [center, setCenter] = useState([-157.96, 21.48]);
  const [expanded, setExpanded] = useState<string | false>(false);

  const fetchHikes = async (url: string) => {
    const response = await fetch(url);
    const hikes = await response.json();
    console.log(hikes)
    setAllHikes(hikes);

  }
  useEffect(() => {

    fetchHikes(gisUrl);

  }, [])


  const runChange = ({ hike }: any) => {
    //console.log(hike);

    setCenter(hike.geometry);




  }


  return (
    <Box width='100vw' display='flex' flexDirection='row'>
      <Box width='30vw' height='100vh' sx={{ overflowY: 'scroll' }} >
        {/* <Map /> */}

        {
          allHikes ? allHikes.features.map((hike: any) =>
            <Accordion>
              <AccordionSummary
                onClick={() => runChange({ hike })}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{hike.properties.TRAILNAME}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <>
                  <h4> Year Created: {hike.properties.YRCREATED}</h4>
                  {hike.properties.LENGTH_MI == 1 ? <h4> Length: {+hike.properties.LENGTH_MI.toFixed(0)} mile </h4> : <h4> Length: {+hike.properties.LENGTH_MI.toFixed(2)} miles </h4>}
                  <h4>Elevation range: {hike.properties.ELEV_RANGE} feet </h4>
                  <h4>Difficulty: {hike.properties.STANDARD} </h4>
                </>
              </AccordionDetails>
            </Accordion>

          )
            : <div />
        }

      </Box>
      <Box width='70vw' height='100vh' style={{ overflow: 'hidden' }}>
        <Box width='100%' height='10%' textAlign='center'>
          <h2 style={{ padding: 0, margin: 0, marginTop: 4 }}>Na Ala Hele Public Trails</h2>
          <h4 style={{ padding: 0, margin: 0 }}>Trail data from <a target='_blank' rel="noreferrer" href="https://honolulu-cchnl.opendata.arcgis.com/datasets/cchnl::na-ala-hele-public-trails/about">Honolulu Open GIS Data</a></h4>
          <h5 style={{ padding: 0, margin: 0 }}>(They definitely don't list all the hikes - and weirdly separate some out?)</h5>
        </Box>
        {allHikes ?
          <Map geojson={allHikes} center={center} />
          : <div></div>
        }
      </Box>
    </Box>
  );
}

export default App;
