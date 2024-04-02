'use client'
import { useEffect, useState } from "react";
import { useImmer } from 'use-immer';
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import { clearInterval } from 'worker-timers';
import "../globals.css";
import { Countdown, TimeProgress } from "@/components/CountDown/countdown";
import { setting } from "@/components/Settings/settings";
import CircleRingWithContent from "@/components/ring/ring";



function TimerButton({ state, startFunc, stopFunc, extendFunc }: { state: string, startFunc: () => void, stopFunc: () => void, extendFunc: () => void }) {
    if (state == "") {
        return <Button color="primary" radius="full" className="w-1/4" onClick={startFunc}>
            Start
        </Button>
    } else if (state == "focusing" || state == "breaking" || state == "Long breaking") {
        // return <><Button color="primary" radius="full" className="w-1/4" onClick={extendFunc}>
        //     Extend(5 min)
        // </Button><Button color="primary" radius="full" className="w-1/4" onClick={stopFunc}>
        //         End Focus
        //     </Button>
        // </>
        return <Button color="primary" radius="full" className="w-1/4" onClick={stopFunc}>
            End Focus
        </Button>
    } else {
        return <Button color="primary" radius="full" className="w-1/4" onClick={startFunc}>
            Start
        </Button>
    }
};


function Format({ value }: { value: TimeProgress }) {
    let hours = Math.floor(value.timeLeft / (1000 * 60 * 60));
    let minutes = Math.floor((value.timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((value.timeLeft % (1000 * 60)) / 1000);

    const formattedHours: string = hours.toString().padStart(2, '0');
    const formattedMinutes: string = minutes.toString().padStart(2, '0');
    const formattedSeconds: string = seconds.toString().padStart(2, '0');
    return <>
        <p>{formattedHours}:{formattedMinutes}:{formattedSeconds}</p>
    </>
}

export default function Timer() {

    const initTimeProgress = { timeLeft: Number(setting.getItem("focus")) * 60 * 1000, percent: 0.5 }

    const [state, setState] = useState<string>("1212");
    const [value, setValue] = useState<TimeProgress>(initTimeProgress);
    const [timerId, setTimerId] = useState<number | undefined>(undefined);
    const [focusList, updateFocusLsit] = useImmer<string[]>([]);


    const startFocusTimer = () => {
        const countdown = new Countdown((timeDiff) => {
            setValue(timeDiff);
        }, () => {
            new Notification(
                "Focus stopped", {
                body: "Focus stopped"
            }
            )
            updateFocusLsit(draft => { draft.push("focus") });
            setState("stopped");
        });
        const intervalId = countdown.start(Number(setting.getItem("focus")));
        setTimerId(() => { return intervalId });
        setState("focusing");
    };

    const startBreakTimer = () => {
        const countdown = new Countdown((timeDiff) => {
            setValue(timeDiff);
        }, () => {
            new Notification(
                "Break stopped", {
                body: "Break stopped"
            }
            )
            updateFocusLsit(draft => { draft.push("break") });
            setState("stopped");
        });
        const intervalId = countdown.start(Number(setting.getItem("break")));
        setTimerId(() => { return intervalId });
        setState("breaking");
    };


    const startLongBreakTimer = () => {
        const countdown = new Countdown((timeDiff) => {
            setValue(timeDiff);
        }, () => {
            new Notification(
                "Break stopped", {
                body: "Break stopped"
            }
            )
            updateFocusLsit(draft => { draft.push("longBreak") });
            setState("stopped");
        });
        const intervalId = countdown.start(Number(setting.getItem("longBreak")));
        setTimerId(() => { return intervalId });
        setState("Long breaking");
    };

    const extend = () => {

    }

    const stop = () => {
        console.log(focusList);
        if (timerId == undefined) {
            console.log("Not interval id");
        } else {
            clearInterval(timerId);
            setState("");
        }
    }


    const format = (value: TimeProgress, state: string) => {
        let hours = Math.floor(value.timeLeft / (1000 * 60 * 60));
        let minutes = Math.floor((value.timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((value.timeLeft % (1000 * 60)) / 1000);

        const formattedHours: string = hours.toString().padStart(2, '0');
        const formattedMinutes: string = minutes.toString().padStart(2, '0');
        const formattedSeconds: string = seconds.toString().padStart(2, '0');
        return <>
            <p className="text-6xl font-medium">{formattedHours}:{formattedMinutes}:{formattedSeconds}</p>
            <p className="text-2xl">{state}</p>
        </>
    }

    useEffect(() => {
        const fs = focusList.slice(-5);
        console.log(fs);
        if (fs.at(-1) == "focus") {
            if (fs.length == 5 && fs.indexOf("longBreak") == -1) {
                startLongBreakTimer();
            } else {
                startBreakTimer();
            }
        } else if (fs.at(-1) == "break" || fs.at(-1) == "longBreak") {
            startFocusTimer();
        } else {
            console.log("init");
        }

    }, [focusList])

    const config = {
        size: 400,
        contentSize: 300,
        backgroundColor: "#DDD",
        ringColor: "#0070F0",
        ringWidth: 15,
        progress: value.percent,
        content: format(value, state),
    };

    return (
        <div className="flex flex-col">
            <Card >
                <CardBody>
                    <CircleRingWithContent {...config} />
                </CardBody>
                <CardFooter className="flex flex-col items-center">
                    <div className="justify-center items-center flex flex-col gap-4">
                        <TimerButton
                            state={state}
                            startFunc={startFocusTimer}
                            stopFunc={stop}
                            extendFunc={extend}
                        />
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
