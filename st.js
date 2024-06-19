document.addEventListener("DOMContentLoaded", function() {
    let startTime, updatedTime, difference, tInterval, savedTime;
    let running = false;
    let paused = false;

    const timerDisplay = document.querySelector(".main h1");
    const startButton = document.querySelector(".start button");
    const stopButton = document.querySelector(".stop button");
    const resetButton = document.querySelector(".reset button");
    const lapButton = document.querySelector(".lap button");
    const lapContainer = document.createElement("div");

    lapContainer.classList.add("laps");
    document.body.appendChild(lapContainer);

    startButton.addEventListener("click", startTimer);
    stopButton.addEventListener("click", stopTimer);
    resetButton.addEventListener("click", resetTimer);
    lapButton.addEventListener("click", recordLap);

    function startTimer() {
        if (!running) {
            startTime = new Date().getTime();
            if (paused) {
                startTime -= difference;
            }
            tInterval = setInterval(updateTime, 1000);
            running = true;
            paused = false;
        }
    }

    function stopTimer() {
        if (running) {
            clearInterval(tInterval);
            savedTime = new Date().getTime() - startTime;
            difference = savedTime;
            running = false;
            paused = true;
        }
    }

    function resetTimer() {
        clearInterval(tInterval);
        timerDisplay.textContent = "00:00:00";
        running = false;
        paused = false;
        difference = 0;
        lapContainer.innerHTML = "";
    }

    function updateTime() {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;
        
        let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    function recordLap() {
        if (running || paused) {
            const lapTime = timerDisplay.textContent;
            const lap = document.createElement("p");
            lap.textContent = lapTime;
            lapContainer.appendChild(lap);
        }
    }
});
