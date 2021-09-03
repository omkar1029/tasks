const { ccclass, property } = cc._decorator;

import Welcome from "./Welcome";
import Question from "./Question";

@ccclass
export default class GameManager extends cc.Component {

    @property(Welcome)
    private welcomeScreen: Welcome = null;

    @property(cc.Label)
    private label: cc.Label = null;

    // @property(Question)
    // private questionNodes: Question[] = [];

    @property(cc.Node)
    private questionNodes: cc.Node[] = [];

    private questionIndex: number = 0;

    onLoad() {
        this.welcomeScreen.init(this.label);

        this.questionNodes.forEach(question => {
            question.getComponent(Question).init(this.label);
        });
    }

    start() {
        this.welcomeScreen.node.active = true;
        this.welcomeScreen.playWelcomeSequence();
        cc.Camera.main.getComponent(cc.AudioSource).enabled = true;
        this.label.node.active = true;
        //this.questions[0].playQuestionSequence();
    }

    nextQuestion() {
        if (this.questionIndex < this.questionNodes.length) {
            if (this.questionIndex > 0) {
                this.questionNodes[this.questionIndex - 1].active = false
            } else if (this.questionIndex == 0) {
                this.welcomeScreen.node.active = false;
            }
            this.questionNodes[this.questionIndex].active = true;
            this.questionNodes[this.questionIndex].getComponent(Question).playQuestionSequence();
            this.questionIndex++;

        } else {
            this.questionNodes[this.questionNodes.length - 1].active = false
            console.log("CONGRATULATIONS!");
            //show final screen
        }
    }
}
