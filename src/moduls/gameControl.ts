// 需要一个类把其他的几个类整合起来，一起控制

import Snake from "./snake";
import Food from "./food";
import ScorePanel from "./scorePanel";


class GameControl {

    // 定义三个属性

    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    // 创建一个属性来存储蛇得移动方向（也就是按键方向)/direccion
    direction: string = 'Right';

    // 创建一个属性用来记录游戏是否继续
    isLive = true;

    constructor() {
        // 相当于调用对象，这里得thisxxx是实例
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();

        this.init()

    }


    // 游戏初始化方法，调用后游戏开始
    init() {
        // 调用init，蛇才会动，因为init调用了run

        document.addEventListener('keydown', this.keydownHandler.bind(this))
        // 这里的this指向的是document, 因为是绑定的document
        // 通过bind修改this指向


        // 调用下面的run方法，使蛇移动
        this.run()
    }


    // 创建一个键盘按下得相应函数 - 通过类得方法
    keydownHandler(event: KeyboardEvent) {

        // 防止用户按其他的键，所以要检查event.key值是否合法

        //    修改direction的属性
        this.direction = event.key

        // 移动蛇就是移动那个元素的偏移量
    }

    run() {
        // 根据方向this.direction来使蛇的位置发生变化
        // 向上 top 减少/menos
        // 向下 top 增加/mas
        // 向左 left 减少/menos
        // 向右 left 增加/mas

        // 获取蛇现在的坐标
        let X = this.snake.X;
        let Y = this.snake.Y;

        // 根据按键的方向，计算和修改X,Y值
        switch (this.direction) {
            case "ArrowUp":
                Y -= 10;
                break;

            case "ArrowDown":
                Y += 10;
                break;

            case "ArrowLeft":
                X -= 10;
                break;

            case "ArrowRight":
                X += 10;
                break;
        }

        // 检查蛇是否吃到了食物/revisar si come la comida
        this.checkEat(X, Y);





        // 修改蛇的X,Y值

        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e: any) {
            // 进入到了catch, 说明出现了异常，游戏结束，弹出一个提示信息
            alert(e.message + 'Game Over!');
            // 再将isLive设置为false
            this.isLive = false;
        }


        // 开启一个定时调用
        // 后面的定时器就是蛇动的原理，调用run方法，每300毫秒； 
        // 随着等级的增高，速度变快
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);

    }

    // 定义一个方法，用来检查蛇是否吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            console.log('吃到食物了');

            // 吃到食物了，食物的位置要重置
            this.food.change();

            // 分数还要增加
            this.scorePanel.addScore()

            // 蛇的身体要增加一节
            this.snake.addBody()
        }
    }



}

export default GameControl