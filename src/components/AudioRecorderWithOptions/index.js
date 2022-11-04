import React, { Component } from 'react'
import MDButtonAudio from "components/MDButton";
// Medidor de audio y acciones para generar el audio
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
// Reproductor de audio
import ReactAudioPlayer from 'react-audio-player';
 
class AudioReactRecorderWithOptions extends Component {
  constructor(props) {
    super(props)
 
    this.state = {
      recordState: null
    }
  }
 
  start = () => {
    this.setState({
      recordState: RecordState.START
    })
  }
 
  pause = () => {
    this.setState({
      recordState: RecordState.PAUSE
    })
  }

  stop = () => {
    this.setState({
      recordState: RecordState.STOP
    })
  }
 
  //audioData contains blob and blobUrl
  onStop = (audioData) => {
    console.log('audioData', audioData)
    document.getElementById("audioareproducir").setAttribute("src", audioData.url);
  }
 
  render() {
    const { recordState } = this.state
 
    return (
      <div>
        <ReactAudioPlayer 
            src=""
            controls
            id="audioareproducir"
        />
        <AudioReactRecorder state={recordState} onStop={this.onStop}  canvasWidth="300" canvasHeight="50"/>
        <MDButtonAudio onClick={this.start} color="info">Iniciar</MDButtonAudio>
        <MDButtonAudio onClick={this.stop} color="error">Detener</MDButtonAudio>
      </div>
    )
  }
}
export default AudioReactRecorderWithOptions;