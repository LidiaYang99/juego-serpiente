// 定义食物
class Food {
    element: HTMLElement;

    constructor() {
        // 获取页面中的food元素，并将其赋值给element
        this.element = document.getElementById('food')!;
    }

    // 通过坐标可以判断蛇是否吃到了食物

    // 定义一个获取食物X轴坐标的方法
    get X() {
        return this.element.offsetLeft
    }

    // 定义一个获取食物Y轴坐标的方法
    get Y() {
        return this.element.offsetTop
    }

    // 修改食物位置的方法
    // 生成随机数，最小是0，最大是300(宽/高)-10(食物自生的高度)
    // 且食物的坐标必须是整10的，因为蛇自身的大小是10*10，所以每次移动就是一格，一格就是10
    // 如果食物在35.45这种地方，蛇会永远吃不到

    // 随机数


    change() {
        // 1-29的随机整数，乘10就是10的倍数了
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;

        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }

}

export default Food;