var pomodoro = {
    started : false,
    minutes : 0,
    seconds : 0,
    fillerHeight : 0,
    fillerIncrement : 0,
    interval : null,
    minutesDom : null,
    secondsDom : null,
    fillerDom : null,
    workTime : 25,
    restTime : 5,

    init : function(){
      var self = this;
      this.minutesDom = document.querySelector('#minutes');
      this.secondsDom = document.querySelector('#seconds');
      this.fillerDom = document.querySelector('#filler');
      this.interval = setInterval(function(){
        self.intervalCallback.apply(self);
      }, 1000);
      document.querySelector('#start-work').onclick = function(){
        self.startWork.apply(self);
      };
      document.querySelector('#stop-work').onclick = function(){
        self.stopWork.apply(self);
      };
      document.querySelector('#start-rest').onclick = function(){
        self.startRest.apply(self);
      };
      document.querySelector('#stop-rest').onclick = function(){
        self.stopRest.apply(self);
      };

      let workBtn = document.querySelector('.btn-enter');
      workBtn.addEventListener('click', function() {
        let workEnter = document.querySelector('.workTime').value;
        workTime = workEnter;
      });
    },

    resetVariables : function(mins, secs, started){
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
      this.fillerIncrement = 200/(this.minutes * 60);
      this.fillerHeight = 0;  
    },
    startWork: function() {
      this.resetVariables(this.workTime, 0, true);
    },
    stopWork: function(){
      this.resetVariables(this.workTime, 0, false);
      this.updateDom();
    },
    startRest: function(){
      this.resetVariables(this.restTime, 0, true);
    },
    stopRest: function(){
      this.resetVariables(this.restTime, 0, false);
      this.updateDom();
    },

    toDoubleDigit : function(num){
      if(num < 10) {
        return "0" + parseInt(num, 10);
      }
      return num;
    },
    updateDom : function(){
      this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
      this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
      this.fillerHeight = this.fillerHeight + this.fillerIncrement;
      this.fillerDom.style.height = this.fillerHeight + 'px';
    },
    intervalCallback : function(){
      if(!this.started) return false;
      if(this.seconds == 0) {
        if(this.minutes == 0) {
          this.timerComplete();
          return;
        }
        this.seconds = 59;
        this.minutes--;
      } else {
        this.seconds--;
      }
      this.updateDom();
    },
    timerComplete : function(){
      this.started = false;
      this.fillerHeight = 0;
    }, 
};


window.onload = function(){
  pomodoro.init();
};

function newFunction() {
  return 'DOMContentLoaded';
}
