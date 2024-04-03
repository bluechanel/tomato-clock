import React, { FC } from 'react';

interface CircleRingWithContentProps {
    /**
     * svg size
     */
    size?: number;
    /**
     * 文字区域size
     */
    contentSize?: number;
    /**
     * 背景图颜色
     */
    backgroundColor?: string;
    /**
     * 圆环颜色
     */
    ringColor?: string;
    /**
     * 圆环宽度
     */
    ringWidth?: number;
    /**
     * 进度百分比
     */
    progress?: number;
    /**
     * 内容
     */
    content?: JSX.Element;
}

const CircleRingWithContent: FC<CircleRingWithContentProps> = ({
    size = 200,
    contentSize = 60,
    backgroundColor = "#ddd",
    ringColor = "#0099cc",
    ringWidth = 10,
    progress = 0,
    content = <></>
}: CircleRingWithContentProps) => {
    const ringRadius = (size - ringWidth) / 2;
    const circumference = 2 * Math.PI * ringRadius; // 计算圆周长

    const transform = `rotate(-90 ${size / 2} ${size / 2})`;
    const storkeArray = `${circumference * progress}, ${circumference}`;

    return (
        <svg width={size} height={size}>
            {/* 背景圆 */}
            <circle cx={size / 2} cy={size / 2} r={ringRadius} fill="none" stroke={backgroundColor} strokeWidth={ringWidth} />

            {/* 进度圆环 */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={ringRadius}
                fill="none"
                stroke={ringColor}
                transform={transform}
                strokeWidth={ringWidth}
                strokeDasharray={storkeArray}
            >
            </circle>

            {/* 内容区域 */}
            <foreignObject x={(size - contentSize) / 2} y={(size - contentSize) / 2} width={contentSize} height={contentSize}>
                <div className="flex flex-col items-center justify-center h-full w-full content-container">
                    <>{content}</>
                </div>
            </foreignObject>
        </svg>
    );
};
export default CircleRingWithContent;