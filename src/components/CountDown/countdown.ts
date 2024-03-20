export interface TimeProgress {
    timeLeft: number;
    percent: number;
}


export class Countdown {
    private startTime: Date | undefined;
    private endTime: Date | undefined;

    constructor(private onUpdate: (timeDiff: TimeProgress) => void, private onComplete: () => void) {
    }

    start(remainingTime: number) {
        this.endTime = new Date();
        this.startTime = new Date();
        this.endTime.setMinutes(this.endTime.getMinutes() + remainingTime);
        const countdownTimerId = setInterval(() => {
            if (this.endTime == undefined || this.startTime == undefined) {
                clearInterval(countdownTimerId)
            } else {
                const now = new Date();
                const left = this.endTime.getTime() - now.getTime();

                if (left <= 0) {
                    clearInterval(countdownTimerId);
                    this.onComplete();
                }

                const tp: TimeProgress = { timeLeft: left, percent: left / (this.endTime.getTime() - this.startTime.getTime()) }
                this.onUpdate(tp);
            }
        }, 1000);
        return countdownTimerId;
    }

    stop(id: NodeJS.Timeout) {
        clearInterval(id);
    }
}