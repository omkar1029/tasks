const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioController extends cc.Component {

    voiceAudioSource: cc.AudioSource = null;

    onLoad(){
        this.voiceAudioSource = this.node.getComponent(cc.AudioSource);
    }

    PlayAudio(audioClip: cc.AudioClip){
        this.voiceAudioSource.clip = audioClip;
        this.voiceAudioSource.play();
    }
}
