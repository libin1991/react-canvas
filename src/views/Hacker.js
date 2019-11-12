import React, {useRef, useEffect} from 'react';

function Hacker() {

    const canvasRef = useRef(null);

    useEffect(() => {

        // 获取当前的canvas元素
        const canvas = canvasRef.current;

        // 获取canvas上下文，2d表示建立一个二维渲染上下文，当然也有基于WebGL的三维渲染上下文，在本系列中暂不考虑
        const context = canvas.getContext('2d');

        // 临时保存canvas的宽高信息，固定800 x 600
        const w = canvas.width = 800;
        const h = canvas.height = 600;

        // 文字颜色
        const textColor = '#33ff33';

        // 背景填充色
        const bgColor = 'rgba(0, 0, 0, .1)';

        // 保存所有可能出现的文字
        const words = "0123456789qwertyuiopasdfghjklzxcvbnm,./;'[]QWERTYUIOP{}ASDFGHJHJKL:ZXCVBBNM<>?";

        // 将文字拆分进一个数组
        const wordsArr = words.split('');

        // 这里假设每个文字的字体大小为16px
        const font_size = 16;

        // 根据字体大小动态计算文字列数
        const columns = w / font_size;

        // 保存每列中的文字当前下落了几个字体单位
        const dropUnits = [];

        // 初始化dropUnits，默认值从1开始，而不是0，因为canvas的fillText方法默认是从文字的左下角开始绘制
        for (let i = 0; i < columns; i++) {
            dropUnits[i] = 1;
        }

        function draw() {

            // 设置上下文的填充色和字体大小，这里需要重新设置fillStyle
            context.fillStyle = textColor;
            context.font = font_size + 'px arial';

            // 核心，
            // 这里开始循环每一列，
            // 为每一列创建随机文字，
            // 同时根据当前列已经下落了几个字体大小来设置文字坐标(坐标原点为canvas容器的左上角)
            for (let i = 0, len = dropUnits.length; i < len; i++) {
                const text = wordsArr[Math.floor(Math.random() * wordsArr.length)];
                const x = i * font_size;
                const y = dropUnits[i] * font_size;
                context.fillText(text, x, y);

                // 当文字已经超出高度边界的时候，需要重置当前列下落的字体单位
                if (y > h && Math.random() > 0.98) {
                    dropUnits[i] = 0;
                }

                dropUnits[i]++;
            }
        }

        // 循环执行动画
        (function frame() {
            // 此处需要再次调用requestAnimationFrame，注意并不是同步递归
            window.requestAnimationFrame(frame);

            // 在绘制下一帧的文字之前给画布填充背景色
            context.fillStyle = bgColor;
            context.fillRect(0, 0, w, h);
            draw();
        }());
    }, []);

    return (
        <canvas ref={canvasRef} style={{background: '#000'}}/>
    );
}

export default Hacker;
