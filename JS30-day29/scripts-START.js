(function () {
  let timer;
  const buttons = document.querySelectorAll("[data-time]");
  const timeLeft = document.querySelector(".display__time-left");
  const endTime = document.querySelector(".display__end-time");

  //計時器
  function startTimer(sec) {
    // console.log(sec);
    const now = Date.now();
    const end = now + sec * 1000; //計算結束時間

    //倒數計時
    setCountDown(end);

    //顯示最後時間
    showEndTime(end);
  }

  function setCountDown(end) {
    clearInterval(timer); //清除之前的計時器

    timer = setInterval(function () {
      const secondsLeft = Math.round((end - Date.now()) / 1000);
      if (secondsLeft >= 0) {
        const displayMin = Math.floor(secondsLeft / 60);
        let displaySec = secondsLeft % 60;
        displaySec = displaySec < 10 ? "0" + displaySec : displaySec;
        timeLeft.textContent = `${displayMin}:${displaySec}`;
      } else {
        clearInterval(timer); //時間到清除計時器
      }
    }, 16);
  }

  function showEndTime(end) {
    const endDate = new Date(end);
    let hour = endDate.getHours();
    let min = endDate.getMinutes();
    min = min < 10 ? `0${min}` : min; //如果分鐘小於10，前面補0
    endTime.textContent = `Back at ${hour}:${min}`;
  }

  function setTimer() {
    //dataset印出來是文字非數字，需要轉換
    //取得dataset並轉換成數字
    const sec = parseInt(this.dataset.time);
    startTimer(sec);
  }

  buttons.forEach((button) => button.addEventListener("click", setTimer));
  document.querySelector("#custom").addEventListener("submit", function (e) {
    e.preventDefault();
    //取得input的value並轉換成數字
    //html中name="minutes"
    const value = parseInt(this.minutes.value);
    //有判斷式，所以字串不會會 NaN
    if (value) {
      startTimer(value * 60);
      this.reset(); //重置表單
    }
  });
})();
