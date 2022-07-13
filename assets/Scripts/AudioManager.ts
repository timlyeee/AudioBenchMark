import { _decorator, Component, Node, AudioSource, AudioClip, game } from 'cc';
const { ccclass, property } = _decorator;

export class AudioManager {
    public commonAudioClip: AudioClip = null;
    public audioSourceList: Array<AudioSource> = [];
    public numToPlay: number = 0;
    constructor(audioClip: AudioClip) {
        this.commonAudioClip = audioClip;
    }
    get audioSourceNumber() {
        return this.audioSourceList.length;
    }
    set audioSourceNumber(num: number) {
        this.changeAudioSourceNumber(num);
    }
    set audioClip(audioClip: AudioClip) {
        this.commonAudioClip = audioClip;
        for (let i = 0; i < this.audioSourceList.length; i++) {
            this.audioSourceList[i].clip = this.commonAudioClip;
        }
    }
    get audioClip(){
        return this.commonAudioClip;
    }
    public setPlayingAudioNumber(number: number) {
        this.numToPlay = number;
    }
    public addOneAudioSource() {
        let audioSource = new AudioSource();
        audioSource.clip = this.commonAudioClip;
        audioSource.loop = false;
        audioSource.playOnAwake = false;
        audioSource.volume = 0.5;
        this.audioSourceList.push(audioSource);
    }
    public deleteOneAudioSource() {
        // pop and destroy
        let audioSource = this.audioSourceList.pop();
        audioSource.destroy();
    }
    public changeAudioSourceNumber(number: number) {
        while (this.audioSourceList.length < number) {
            this.addOneAudioSource();
        }
        while (this.audioSourceList.length > number) {
            this.deleteOneAudioSource();
        }
    }
    public playAllAudioSourceInOneFrame() {
        if (this.audioSourceList.length === 0) {
            return;
        }
        if (this.numToPlay < this.audioSourceList.length) {
            for (let i = 0; i < this.numToPlay; i++) {
                this.audioSourceList[i].play();
            }
        } else {
            // Play all audio sources existent
            for (let i = 0; i < this.audioSourceList.length; i++) {
                this.audioSourceList[i].stop();
            }
        }
    }
    public pauseAllAudioSourceInOneFrame() {
        for (var audioSource of this.audioSourceList) {
            if (audioSource.playing) {
                audioSource.pause();
            }
        }
    }
    public stopAllAudioSourceInOneFrame() {
        for (var audioSource of this.audioSourceList) {
            if (audioSource.playing) {
                audioSource.pause();
            }
        }
    }
    public playAudioOfNum(num: number) {
        this.audioSourceList[num].play();
    }
}

