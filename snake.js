document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const scoreDisplay = document.getElementById("score");
    const speedDisplay = document.getElementById("speed");

    const gridSize = 20;
    const tileCount = canvas.width / gridSize;
    let snake = [{ x: 10, y: 10 }];
    let apple = { x: 15, y: 15 };
    let direction = { x: 0, y: 0 };
    let score = 0;
    let speed = 1;
    let gameInterval;

    const drawGame = () => {
        // 移动蛇
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        snake.unshift(head);

        // 吃苹果
        if (head.x === apple.x && head.y === apple.y) {
            score++;
            scoreDisplay.textContent = score;
            speed = Math.min(10, Math.floor(score / 5) + 1); // 每5分增加一次速度，最高为10
            speedDisplay.textContent = speed;
            clearInterval(gameInterval);
            gameInterval = setInterval(drawGame, 300 / speed); // 根据速度调整间隔时间

            apple = {
                x: Math.floor(Math.random() * tileCount),
                y: Math.floor(Math.random() * tileCount),
            };
        } else {
            snake.pop();
        }

        // 绘制背景
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 绘制蛇
        ctx.fillStyle = "lime";
        snake.forEach(segment => ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize));

        // 绘制苹果
        ctx.fillStyle = "red";
        ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);

        // 检查撞墙
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
            resetGame();
        }

        // 检查咬到自己
        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                resetGame();
            }
        }
    };

    const resetGame = () => {
        snake = [{ x: 10, y: 10 }];
        direction = { x: 0, y: 0 };
        score = 0;
        speed = 1;
        scoreDisplay.textContent = score;
        speedDisplay.textContent = speed;
        clearInterval(gameInterval);
        gameInterval = setInterval(drawGame, 300 / speed);
    };

    const changeDirection = (event) => {
        switch (event.keyCode) {
            case 37:
                if (direction.x === 0) direction = { x: -1, y: 0 }; // 左
                break;
            case 38:
                if (direction.y === 0) direction = { x: 0, y: -1 }; // 上
                break;
            case 39:
                if (direction.x === 0) direction = { x: 1, y: 0 }; // 右
                break;
            case 40:
                if (direction.y === 0) direction = { x: 0, y: 1 }; // 下
                break;
        }
    };

    document.addEventListener("keydown", changeDirection);
    gameInterval = setInterval(drawGame, 300 / speed); // 设置初始间隔时间
});
