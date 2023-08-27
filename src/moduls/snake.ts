class Snake {

    // 表示蛇的容器
    element: HTMLElement;

    // 但是因为具体蛇其实是在snake容器里的div，所以创建一个蛇头
    head: HTMLElement;

    // 蛇的身体
    bodies: HTMLCollection;
    // HTMLCollection 是个集合（包括蛇头）

    constructor() {
        // 蛇的容器
        this.element = document.getElementById('snake')!;

        // 蛇头
        this.head = document.querySelector('#snake>div') as HTMLElement;

        // 先使用ID提取器，然后再提取它内部的所有div，这样提取到的就是一个集合。
        this.bodies = this.element.getElementsByTagName('div');


    }

    // 获取蛇的坐标（主要是蛇头）
    get X() {
        return this.head.offsetLeft
    }

    get Y() {
        return this.head.offsetTop
    }

    // 设置蛇的坐标
    set X(value: number) {

        // 如果新值和旧值相同，则直接不返回
        if (this.X === value) {
            return;
        }

        // X的合法值在0-290
        if (value < 0 || value > 290) {
            // 如果进入设置的这个范围，就说明撞墙了
            throw new Error('Oops! ');
        }

        // 修改X时，是在修改垂直坐标。蛇左右移动，当蛇向左移动时，不能向有调头。反之也一样。
        // 先检查有没有第二节身体，再看第二节身体的坐标和蛇头是否相同，如果相同则说明调头了
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            console.log('水平方向调头');

            // 如果发生了调头，让蛇继续向调头的反方向继续
            // 如果value值大于，说明蛇在向右走。此时发生调头，应该使蛇继续向左走
            // value相当于新设置的方向，当这个值大于原来的X值时，说明蛇本来向左走，但这个新值却让它向右走
            if (value > this.X) {
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
        }


        // 调用移动身体
        this.moveBody()

        this.head.style.left = value + 'px';

        // 调用方法，检查有没有撞到自己
        this.checkHeadBody()
    }
    set Y(value: number) {
        if (this.Y === value) {
            return;
        }

        // Y的合法值在0-290
        if (value < 0 || value > 290) {
            // 如果进入设置的这个范围，就说明撞墙了
            throw new Error('Oops!');
            // 为了页面不直接显示报错，在gamecontrol组件内使用try,catch
        }

        // 修改Y时，是在修改垂直坐标。蛇左右移动，当蛇向上移动时，不能又下调头。反之也一样。
        // 先检查有没有第二节身体，再看第二节身体的坐标和蛇头是否相同，如果相同则说明调头了
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            console.log('水平方向调头');

            // 如果发生了调头，让蛇继续向调头的反方向继续
            // 如果value值大于，说明蛇在向右走。此时发生调头，应该使蛇继续向左走
            // value相当于新设置的方向，当这个值大于原来的X值时，说明蛇本来向左走，但这个新值却让它向右走
            if (value > this.Y) {
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }

        // 调用移动身体
        this.moveBody()

        this.head.style.top = value + 'px';

        // 调用方法，检查有没有撞到自己
        this.checkHeadBody()
    }

    // 设置增加蛇身体长度的方法
    // 给蛇增加身体，就是往前面蛇的容器里增加div
    addBody() {
        this.element.insertAdjacentHTML("beforeend", "<div></div>")
        // 在这个元素的结束标签之前的位置，添加一个div
    }

    // 添加一个蛇身体移动的方法
    moveBody() {

        // 将后边的身体设置为前边身体的位置
        // 第4节=第3节的位置
        // 第3节=第2节的位置
        // 第2节=蛇头的位置

        // 遍历获取所有身体的位置
        // 从后往前取值
        // 蛇头的位置是0，蛇头的位置不再这改，所以这里i不需要等于0
        for (let i = this.bodies.length - 1; i > 0; i--) {

            // 获取前边身体的位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            // 将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px'
        }
    }

    // 检查蛇头是否撞到自己身体的方法
    checkHeadBody() {
        // 获取所有的身体，检查其是否和舌头的坐标发生重叠
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement;

            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                // 如果进入判断，则说明蛇头撞到了墙壁，游戏结束
                throw new Error('Oops! GAME OVER!')
            }


        }

    }
}

export default Snake;