import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Reproductor de audio
import ReactAudioPlayer from 'react-audio-player';

var rows = {};
function updateAudios() {
    var audios = JSON.parse(localStorage.getItem("audios"));
    var datosAudios = {};
    if(audios !=undefined) {
        Object.entries(audios).forEach(([carpeta, value]) => {
            datosAudios[carpeta] = {}; 
            datosAudios[carpeta]["carpeta"] = carpeta; 
            datosAudios[carpeta]["audios"] = value; 
        });
    }
    rows = datosAudios;
}

function Row(dataAudios) {
  const { row } = dataAudios;
  const [open, setOpen] = React.useState(false);
  const getAudiosArr = ()=> Object.keys(row.audios);
  return (
    <React.Fragment>
    
              <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.carpeta}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Audios
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                    { 
                        getAudiosArr().map((audio) =>{
                        return (<TableRow key={audio}>
                            <TableCell component="th" scope="row">
                                {audio}
                            </TableCell>
                            <TableCell>
                                <ReactAudioPlayer 
                                    src={row.audios[audio]}
                                    controls
                                    id="audioareproducir"
                                />
                            </TableCell>
                        </TableRow>)
                    })
                    }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
    updateAudios();
  return (
    <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Carpetas
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableBody>
        {
            Object.values(rows).length > 0 && 
                Object.values(rows).map((row) => (
                    <Row key={row.carpeta} row={row} />
                ))
            
        }
        </TableBody>
      </Table>
    </TableContainer>

    </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
  );
}
