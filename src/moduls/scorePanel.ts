// 定义计分牌
class ScorePanel {
    score: number = 0;
    level: number = 1;

    // 里面的span
    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    // 给最高等级设置一个变量，方便后期扩展
    maxLevel: number;

    // 设置一个变量，表示多少分升一级
    upScore: number;

    // 给span赋值，在构造函数里(也可以直接在后面通过document.getElement....)
    constructor(maxLevel: number = 10, upScore: number = 2) {
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!
        // 这里在后面加感叹号，表示这个元素不可能为空

        this.maxLevel = maxLevel;
        this.upScore = upScore;


    }

    // 设置一个加分的方法
    addScore() {
        // 使分数自增
        this.score++;
        this.scoreEle.innerHTML = this.score + '';
        // 通过隐式类型转换，将其变为字符串

        // 判断分数是多少
        if (this.score % this.upScore === 0) {
            this.levelUp()
        }
    }


    // 设置一个提升等级的方法
    levelUp() {
        // 等级需要有上限
        // 10级以下才会升级
        if (this.level < this.maxLevel) {
            this.level++;
            this.levelEle.innerHTML = this.level + '';
        }

    }

}

export default ScorePanel;





