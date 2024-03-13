export class Countdown {
    private remainingTime: number;

    constructor(private duration: number, private onUpdate: (remainingTime: number) => void, private onComplete: () => void) {
        this.remainingTime = duration;
    }

    start() {
        const countdownTimerId = setInterval(() => {
            this.remainingTime--;
            this.onUpdate(this.remainingTime);

            if (this.remainingTime <= 0) {
                this.stop(countdownTimerId);
                this.onComplete();
            }
        }, 1000);
        return countdownTimerId;
    }

    stop(id: NodeJS.Timeout) {
        clearInterval(id);
    }
}