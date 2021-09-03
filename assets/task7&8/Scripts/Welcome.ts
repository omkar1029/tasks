const { ccclass, property } = cc._decorator;

import GameManager from "./GameManager";

@ccclass
export default class Welcome extends cc.Component {

    @property({ type: cc.AudioClip })
    private audioClips: cc.AudioClip[] = [];

    private label: cc.Label = null;

    @property
    private firstDialogue: string = null;

    @property
    private secondDialogue: string = null;

    private audioId: number = null;

    @property(cc.Node)
    private gameManager: cc.Node = null;

    init(label: cc.Label) {
        this.label = label;
    }

    playWelcomeSequence() {
        this.playFirstDialogue();
    }

    private playFirstDialogue() {
        this.audioId = cc.audioEngine.playEffect(this.audioClips[0], false);
        this.label.string = this.firstDialogue;
        this.scheduleOnce(function () { this.playSecondDialogue(); }, cc.audioEngine.getDuration(this.audioId) + 0.5);
    }

    private playSecondDialogue() {
        this.audioId = cc.audioEngine.playEffect(this.audioClips[1], false);
        this.label.string = this.secondDialogue;
        this.scheduleOnce(function () { this.gameManager.getComponent(GameManager).nextQuestion(); }, cc.audioEngine.getDuration(this.audioId) + 0.5);
    }
}
