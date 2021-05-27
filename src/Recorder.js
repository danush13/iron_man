import React, { Component } from 'react';
import { io } from "socket.io-client";



const ENDPOINT = "http://0.0.0.0:5000";


class Recorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recording: false,
            audioChunks: []
        }
        this.chunks = []
        this.socket = io(ENDPOINT);
        this.socket.on("connect", () => {
            console.log(this.socket.id);
        });

    }

    componentDidMount() { }


    recordAudio = async () => {
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.mediaRecorder = new MediaRecorder(this.stream)
        this.mediaRecorder.start(10)
        this.mediaRecorder.ondataavailable = e => {
            this.chunks.push(e.data);
        };
        // setInterval(() => {
        //     console.log('after 3 seconds')
        //     console.log(this.chunks[0].type)
        //     const blob = new Blob(this.chunks, { 'type': this.chunks[0].type });
        //     this.socket.emit('message', {audio: blob, type:this.chunks[0].type})
        // }, 5000);
    }
    stopRecordingAudio = async () => {
        // console.log("stop has been called")
        // console.log(this.mediaRecorder)
        this.mediaRecorder.stop()
        const blob = new Blob(this.chunks, { 'type': this.chunks[0].type });
        this.socket.emit('message', { audio: blob, type: this.chunks[0].type })
        this.socket.on("rec_message", data => {
            console.log(data)
            const blob = new Blob([data.audio], { type: data.type });
            const audioUrl = URL.createObjectURL(blob);
            const audio = new Audio(audioUrl);
            audio.play();

        });



    }

    test = () => {
        this.socket.emit("message", { name: "John" });
    }

    sendMessage = () => {
        // this.socket.emit("message", bota(JSON.stringify({ name: "John" })));
        this.ws.send("hello world")

    }

    // recordAudioV2 = async () => {
    //     this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    //     this.recordAudio = RecordRTC(stream, {
    //         type: 'audio',
    //         mimeType: 'audio/webm',
    //         sampleRate: 44100,
    //         desiredSampRate: 16000,
    //         recorderType: StereoAudioRecorder,
    //         numberOfAudioChannels: 1
    //     });
    //     this.recordAudio.startRecording();
    // }

    render() {
        return (
            <>
                <button onClick={this.recordAudio}>Record</button>
                <button onClick={this.stopRecordingAudio}>Stop</button>
                <button onClick={this.test}>test</button>
                <button onClick={this.sendMessage}>send message</button>

            </>
        )
    }
}

export default Recorder;