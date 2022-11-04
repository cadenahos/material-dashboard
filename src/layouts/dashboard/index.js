import * as React from 'react';
import Grid from "@mui/material/Grid";

// Components additional
// Grabadora de audio
import AudioReactRecorderWithOptions from '../../components/AudioRecorderWithOptions'
import TableWithAccordion from '../../components/TableWithAccordion'

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

function Dashboard() {
  const [open, mostrarAlertaValidacion] = React.useState(false);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ width: '100%', marginTop:"10px" }}>
        <Collapse in={open}>
          <Alert
          severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  mostrarAlertaValidacion(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
            id="alertaValidacion"
          >
          </Alert>
        </Collapse>
      </Box>
      <MDBox py={6} style={{backgroundColor:"#fff",border:"1px solid #000", padding:"10px"}}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12} lg={12}>
            <AudioReactRecorderWithOptions />
          </Grid>
        </Grid>
        <Grid container style={{marginTop:"15px"}}>
          <Grid item xs={12} md={5} lg={5}>
            <MDInput label="Nombre del audio" id="nombreAudio"></MDInput>
          </Grid>
          <Grid item xs={12} md={5} lg={5}>
            <MDInput label="Nombre de la carpeta" id="nombreCarpeta"></MDInput>
          </Grid>
          <Grid item xs={12} md={2} lg={2}>
            <MDButton onClick={GrabarAudio} color="success">Guardar Audio</MDButton>
          </Grid>
        </Grid>
      </MDBox>
      <TableWithAccordion/>
    </DashboardLayout>
  );
  function ValidarCamposDelAudio() {
    var mensajesValidacion = "<ul>";
    var pasaValidacion = true;
    if(document.getElementById("nombreAudio").value == "") {
      pasaValidacion = false;
      mensajesValidacion += `<li>El campo 'Nombre del audio' es requerido</li>`;
    }
    if(document.getElementById("nombreCarpeta").value == "") {
      pasaValidacion = false;
      mensajesValidacion += `<li>El campo 'Nombre de la carpeta' es requerido</li>`;
    }
    if(!pasaValidacion) {
      mensajesValidacion+="</ul>";
      document.querySelectorAll("#alertaValidacion .MuiAlert-message")[0].innerHTML = mensajesValidacion;
      mostrarAlertaValidacion(true);
      return false;
    }else {
      mostrarAlertaValidacion(false);
      return true;
    }
  }
  function GrabarAudio() {
    if(!ValidarCamposDelAudio()) {
      return false;
    }
    const audioAGuardar = document.getElementById("audioareproducir").getAttribute("src");
    const nombreCarpeta = document.getElementById("nombreCarpeta").value;
    const nombreAudio = document.getElementById("nombreAudio").value;
    var audios = {};
    if(localStorage.getItem("audios") != undefined){
      audios = JSON.parse(localStorage.getItem("audios"));
    }
    if(audios[nombreCarpeta] == undefined) {
      audios[nombreCarpeta] = {};
    }
    audios[nombreCarpeta][nombreAudio] = audioAGuardar;
    localStorage.setItem('audios', `${JSON.stringify(audios)}`)
    location.reload;
    
  }
}

export default Dashboard;
