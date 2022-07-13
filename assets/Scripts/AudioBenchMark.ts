import { _decorator, Component, Node, AudioClip, EditBox, director, Director } from 'cc';
import { AudioManager } from './AudioManager';
const { ccclass, property } = _decorator;

@ccclass('AudioBenchMark')
export class AudioBenchMark extends Component {
    @property(AudioClip)
    public shortAudioClip: AudioClip = null;
    @property(AudioClip)
    public streamingAudioClip: AudioClip = null;

    @property(EditBox)
    public shortAudioNumberEditBox: EditBox = null;
    @property(EditBox)
    public shortAudioToPlayNumberEditbox: EditBox = null;
    
    @property(EditBox)
    public streamingAudioNumberEditBox: EditBox = null;
    @property(EditBox)
    public streamingAudioToPlayNumberEditbox: EditBox = null;

    public shortAudioManager: AudioManager = null;
    public streamingAudioManager: AudioManager = null;

    start() {
        this.shortAudioManager = new AudioManager(this.shortAudioClip);
        this.streamingAudioManager = new AudioManager(this.streamingAudioClip);
        
        this.shortAudioNumberEditBox.string = this.shortAudioManager.audioSourceNumber.toString();
        this.shortAudioToPlayNumberEditbox.string = this.shortAudioManager.numToPlay.toString();

        this.streamingAudioNumberEditBox.string = this.streamingAudioManager.audioSourceNumber.toString();
        this.streamingAudioToPlayNumberEditbox.string = this.streamingAudioManager.numToPlay.toString();
    }
    update(deltaTime: number) {
        if (this.shouldPlayShortAudio) {
            this.shortAudioManager.playAudioOfNum(this.curShortAudioId);
            this.curShortAudioId++;
            if(this.curShortAudioId >= this.shortAudioManager.numToPlay) {
                this.shouldPlayShortAudio = false;
            }
        }
        if (this.shouldPlayStreamingAudio) {
            this.streamingAudioManager.playAudioOfNum(this.curStreamingAudioId);
            this.curStreamingAudioId++;
            if(this.curStreamingAudioId >= this.streamingAudioManager.numToPlay) {
                this.shouldPlayStreamingAudio = false;
            }
        }
    }
    // General method to update editbox and audioManager of audio source number.
    updateAudioNum(editbox: EditBox, audioManager: AudioManager, num: number) {
        if(num < 0) {
            num = 0;
        }
        audioManager.changeAudioSourceNumber(num);
        editbox.string = audioManager.audioSourceNumber.toString();
    }
    //General method to update editbox and audioManager of audio source to play.
    updateAudioToPlayNum(editbox: EditBox, audioManager: AudioManager, numToPlay: number) {
        if(numToPlay > audioManager.audioSourceNumber) {
            return;
        }
        if(numToPlay < 0) {
            numToPlay = 0;
        }
        audioManager.numToPlay = numToPlay;
        editbox.string = audioManager.numToPlay.toString();
    }

    // Short audio sources in assets
    addShortAudio() {
        this.updateAudioNum(this.shortAudioNumberEditBox, this.shortAudioManager,
            this.shortAudioManager.audioSourceNumber + 1);
    }
    deleteShortAudio() {
        this.updateAudioNum(this.shortAudioNumberEditBox, this.shortAudioManager, 
            this.shortAudioManager.audioSourceNumber - 1);
    }
    setShortAudioNumber() {
        let num = parseInt(this.shortAudioNumberEditBox.string);
        this.updateAudioNum(this.shortAudioNumberEditBox, this.shortAudioManager,
            num);
        
    }

    // Short audio sources to play
    addShortAudioToPlay() {
        this.updateAudioToPlayNum(this.shortAudioToPlayNumberEditbox, this.shortAudioManager,
            this.shortAudioManager.numToPlay + 1);
    }
    deleteShortAudioToPlay() {
        this.updateAudioToPlayNum(this.shortAudioToPlayNumberEditbox, this.shortAudioManager,
            this.shortAudioManager.numToPlay - 1);
    }
    setShortAudioToPlay() {
        let num = parseInt(this.shortAudioToPlayNumberEditbox.string);
        this.updateAudioToPlayNum(this.shortAudioToPlayNumberEditbox, this.shortAudioManager,
            num);
    }
    
    // Play short audios
    playShortAudioInFrame() {
        this.shortAudioManager.playAllAudioSourceInOneFrame();
    }
    pauseAllShortAudio() {
        this.shortAudioManager.pauseAllAudioSourceInOneFrame();
    }
    stopAllShortAudio() {
        this.shortAudioManager.stopAllAudioSourceInOneFrame();
    }
    shouldPlayShortAudio: boolean = false;
    curShortAudioId: number = 0;
    playShortAudioInSteps() {
        if(!this.shouldPlayShortAudio) {
            this.shouldPlayShortAudio = true;
            this.curShortAudioId = 0;
        }
    }
    
    
    // short audio sources in assets
    addStreamingAudio() {
        this.updateAudioNum(this.streamingAudioNumberEditBox, this.streamingAudioManager,
            this.streamingAudioManager.audioSourceNumber + 1);
    }
    deleteStreamingAudio() {
        this.updateAudioNum(this.streamingAudioNumberEditBox, this.streamingAudioManager,
            this.streamingAudioManager.audioSourceNumber - 1);
    }
    setStreamingAudioNumber() {
        let num = parseInt(this.streamingAudioNumberEditBox.string);
        this.updateAudioNum(this.streamingAudioNumberEditBox, this.streamingAudioManager,
            num);
    }

    // Short audio sources to play
    addStreamingAudioToPlay() {
        this.updateAudioToPlayNum(this.streamingAudioToPlayNumberEditbox, this.streamingAudioManager,
            this.streamingAudioManager.numToPlay + 1);
    }
    deleteStreamingAudioToPlay() {
        this.updateAudioToPlayNum(this.streamingAudioToPlayNumberEditbox, this.streamingAudioManager,
            this.streamingAudioManager.numToPlay - 1);
    }
    setStreamingAudioToPlay() {
        let num = parseInt(this.streamingAudioToPlayNumberEditbox.string);
        if (num > this.streamingAudioManager.audioSourceNumber) {
            return;
        }
        this.updateAudioToPlayNum(this.streamingAudioToPlayNumberEditbox, this.streamingAudioManager,
            num);
    }

    // Play control
    playStreamingAudioInFrame() {
        this.streamingAudioManager.playAllAudioSourceInOneFrame();
    }
    pauseStreamingAudioInFrame() {
        this.streamingAudioManager.pauseAllAudioSourceInOneFrame();
    }
    stopStreamingAudioInFrame() {
        this.streamingAudioManager.stopAllAudioSourceInOneFrame();
    }
    shouldPlayStreamingAudio: boolean = false;
    curStreamingAudioId: number = 0;
    playStreamingAudioInSteps() {
        if(!this.shouldPlayStreamingAudio) {
            this.shouldPlayStreamingAudio = true;
            this.curStreamingAudioId = 0;
        }
    }

}

