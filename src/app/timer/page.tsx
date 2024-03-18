'use client'
import { useState } from "react";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import "../globals.css";
import dynamic from "next/dynamic";
import { Countdown, TimeProgress } from "@/components/CountDown/countdown";
// @ts-ignore
const TinyRing = dynamic(() => import('@ant-design/plots').then(({ Tiny }) => Tiny.Ring), { ssr: false })

export default function Timer() {


    const [value, setValue] = useState<TimeProgress>({ timeLeft: 0, percent: 0 });
    const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>(undefined);

    const countdown = new Countdown(1, (timeDiff) => {
        console.log(timeDiff);
        setValue(timeDiff);
    }, () => {
        console.log('Countdown completed!');
    });


    const start = async () => {
        const intervalId = countdown.start();
        setTimerId(() => { return intervalId });
    };

    const stop = async () => {
        if (timerId == undefined) {
            console.log("没有定时器id");
        } else {
            countdown.stop(timerId);
        }
    }

    const format = (tp: TimeProgress) => {
        let hours = Math.floor(tp.timeLeft / (1000 * 60 * 60));
        let minutes = Math.floor((tp.timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((tp.timeLeft % (1000 * 60)) / 1000);

        const formattedHours: string = hours.toString().padStart(2, '0');
        const formattedMinutes: string = minutes.toString().padStart(2, '0');
        const formattedSeconds: string = seconds.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    const config = {
        percent: value.percent,
        color: ['#E8EFF5', '#1677ff'],
        animate: false,
        annotations: [
            {
                type: 'text',
                radius: 0.9,
                style: {
                    text: format(value),
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 50,
                    fontStyle: 'bold',
                },
            },
        ],
    };

    return (
        <div className="flex flex-col">
            <TinyRing {...config} />
            <div className="justify-center items-center flex flex-col gap-4">
                <Button radius="full" color="primary" onClick={start}>
                    Start
                </Button>
                <Button radius="full" color="primary" onClick={stop}>
                    Stop
                </Button>
            </div>
        </div>
    );
}