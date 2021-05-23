import React, { Component } from 'react';

class Recorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recording: false,
            audioChunks: []
        }
    }


    recordAudio = async () => {
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.mediaRecorder = new MediaRecorder(this.stream)
        this.mediaRecorder.start(10)
        this.mediaRecorder.ondataavailable = e => {
            if (e.data && e.data.size > 0) {
                console.log('data has entered')
                console.log(e.data)

            }
        };
    }
    stopRecordingAudio = async () => {
        console.log("stop has been called")
        console.log(this.mediaRecorder)
        this.mediaRecorder.stop()
    }

    render() {
        return(
            <>
            <button onClick={this.recordAudio}>Record</button>
            <button onClick={this.stopRecordingAudio}>Stop</button>
            </>
        )
    }
}

export default Recorder;