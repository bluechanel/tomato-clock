'use client'
import { useEffect, useState } from "react";
import { useImmer } from 'use-immer';
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import { clearInterval } from 'worker-timers';
import "../globals.css";
import { Countdown, TimeProgress } from "@/components/countdown/countdown";
import { setting } from "@/components/settings/settings";
import CircleRingWithContent from "@/components/ring/ring";
import { showNotification } from "@/utils/notification";


// 计时器类型
export enum TimerState {
    Focusing = "focus",
    Breaking = "break",
    LongBreaking = "longBreak",
    Stop = "stop"
}


function TimerButton({ state, startFunc, stopFunc, extendFunc }: { state: TimerState, startFunc: () => void, stopFunc: () => void, extendFunc: () => void }) {
    if (state == TimerState.Stop) {
        return <Button color="primary" radius="full" className="w-1/4" onClick={startFunc}>
            Start
        </Button>
    } else if (state == TimerState.Focusing || state == TimerState.Breaking || state == TimerState.LongBreaking) {
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

export default function Timer() {

    const initTimeProgress = { timeLeft: Number(setting.getItem("focus")) * 60 * 1000, percent: 1 }

    const [state, setState] = useState<TimerState>(TimerState.Stop);
    const [value, setValue] = useState<TimeProgress>(initTimeProgress);
    const [timerId, setTimerId] = useState<number | undefined>(undefined);
    const [focusList, updateFocusLsit] = useImmer<TimerState[]>([]);


    const selectTimerType = (): TimerState => {
        const fs = focusList.slice(-5);
        if (fs.at(-1) == TimerState.Focusing) {
            if (fs.length == 5 && fs.indexOf(TimerState.LongBreaking) == -1) {
                return TimerState.LongBreaking;
            } else {
                return TimerState.Breaking;
            }
        } else if (fs.at(-1) == TimerState.Breaking || fs.at(-1) == TimerState.LongBreaking) {
            return TimerState.Focusing;
        };
        return TimerState.Focusing;
    };


    const startTimer = () => {
        const timerType = selectTimerType();
        const countdown = new Countdown((timeDiff) => {
            setValue(timeDiff);
        }, () => {
            const tip = showNotification(`${timerType} stopped`);
            tip.onclick = () => {
                window.focus();
            }
            updateFocusLsit(draft => { draft.push(timerType) });
            setState(TimerState.Stop);
        });
        const intervalId = countdown.start(Number(setting.getItem(timerType)));
        setTimerId(() => { return intervalId });
        setState(timerType);
    };


    const extend = () => {

    }

    const stop = () => {
        console.log(focusList);
        if (timerId == undefined) {
            console.log("Not interval id");
        } else {
            clearInterval(timerId);
            setState(TimerState.Stop);
        }
    }


    const format = (value: TimeProgress, state: TimerState) => {
        let hours = Math.floor(value.timeLeft / (1000 * 60 * 60));
        let minutes = Math.floor((value.timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((value.timeLeft % (1000 * 60)) / 1000);

        const formattedHours: string = hours.toString().padStart(2, '0');
        const formattedMinutes: string = minutes.toString().padStart(2, '0');
        const formattedSeconds: string = seconds.toString().padStart(2, '0');
        return <>
            <p className="text-6xl font-semibold">{formattedHours}:{formattedMinutes}:{formattedSeconds}</p>
            {state == TimerState.Stop ? "" : <p className="text-2xl text-gray-500">{state}</p>}
        </>
    }

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
                            startFunc={startTimer}
                            stopFunc={stop}
                            extendFunc={extend}
                        />
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
