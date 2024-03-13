'use client'
import { useEffect, useState } from "react";
import { CircularProgress, Card, CardBody, CardFooter, Chip, Button, ButtonGroup } from "@nextui-org/react";
import "../globals.css";
import { Countdown } from "@/components/CountDown/page";

export default function Timer() {


    const [value, setValue] = useState(0);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>(undefined);

    const countdown = new Countdown(200, (remainingTime) => {
        console.log(remainingTime);
        setValue(remainingTime);
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

    return (
        <Card className="h-2/4 w-1/4 border-none bg-gradient-to-br from-cyan-500 to-blue-500">
            <CardBody className="justify-center items-center pb-0">
                <CircularProgress
                    classNames={{
                        svg: "w-full h-full drop-shadow-md",
                        indicator: "stroke-white",
                        track: "stroke-white/10",
                        value: "text-3xl font-semibold text-white",
                    }}
                    
                    value={value}
                    strokeWidth={4}
                    showValueLabel={true}
                />
            </CardBody>
            <CardFooter className="justify-center items-center flex flex-col gap-4">
                <Button radius="full" color="primary" onClick={start}>
                    Start
                </Button>
                <Button radius="full" color="primary" onClick={stop}>
                    Stop
                </Button>
            </CardFooter>
        </Card>
    );
}
