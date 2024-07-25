AFRAME.registerComponent("game-play", {
    schema: {
      elementId: { type: "string", default: "#coin1" },      
    },
    
    update: function() {
      this.isCollided(this.data.elementId);
    },
    init:function(){
      var duration=120
      const timerEl = document.querySelector('#timer')
      this.startTimer(duration, timerEl)
    },

    startTimer:function(duration,timerEl){
      var minutes
      var seconds

      setInterval(()=>{
        if(duration>=0){
          minutes=parseInt(duration/60)
          seconds=parseInt(duration%60)

          if(minutes<10){
            minutes='0'+minutes
          }
          if(seconds<10){
            seconds='0'+seconds
          }
          
          timerEl.setAttribute("text", {
          value: minutes + ":" + seconds,
        });

        duration-=1

        } else{
          this.game_over()
        }
      },1000)
    },
  
    isCollided: function(elementId) {
      const element = document.querySelector(elementId);
      element.addEventListener("collide", e => {
        if (elementId.includes("#treasureCoins")) {          
          element.setAttribute('visible',false)
          this.update_score()
          this.update_targets()
          
        }
        else {

        }         
      });
    },
    update_targets:function(){
      var element=document.querySelector('#xyz')
      var count=element.getAttribute('text').value
      var currentTarget=parseInt(count)
      currentTarget-=1
      element.setAttribute('text',{value:currentTarget})
    }, 
    update_score:function(){
      var element=document.querySelector('#treasureCoins')
      var count=element.getAttribute('text').value
      var currentScore=parseInt(count)
      currentScore+=50
      element.setAttribute('text',{value:currentScore})
    },

    game_over:function(){
      var plane_el=document.querySelector('#scuba_diver')
      var element=document.querySelector('#game_over_text')
      element.setAttribute('visible',true)
      plane_el.setAttribute('dynamic-body',{mass:1})
    },
    
  });
  