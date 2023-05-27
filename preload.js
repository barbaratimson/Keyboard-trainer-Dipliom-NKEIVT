const fs = require('fs');
/**
 * Self-adjusting interval to account for drifting
 * 
 * @param {function} workFunc  Callback containing the work to be done
 *                             for each interval
 * @param {int}      interval  Interval speed (in milliseconds)
 * @param {function} errorFunc (Optional) Callback to run if the drift
 *                             exceeds interval
 */
function AdjustingInterval(workFunc, interval, errorFunc) {
  var that = this;
  var expected, timeout;
  this.interval = interval;

  this.start = function() {
      expected = Date.now() + this.interval;
      timeout = setTimeout(step, this.interval);
  }

  this.stop = function() {
      clearTimeout(timeout);
  }

  function step() {
      var drift = Date.now() - expected;
      if (drift > that.interval) {
          // You could have some default stuff here too...
          if (errorFunc) errorFunc();
      }
      workFunc();
      expected += that.interval;
      timeout = setTimeout(step, Math.max(0, that.interval-drift));
  }
}


window.addEventListener("DOMContentLoaded", () => {
    // let section
    let navbar = document.getElementById("navbar")
    let showModal = document.getElementById("showModal")
    let mainMenu = document.querySelector(".mainMenuContainer")
    let scanTasks = document.getElementById("scanTasks")
    let mmLine = document.getElementById("topLine")
    const confirmBox = document.querySelector(".confirmBox")
    const endTaskBox = document.querySelector(".endTaskBox")
    let timersRunning = 0
    let timerTime = 0
    let tcwClose = document.getElementById("tcwClose")
    let etClose = document.getElementById("etClose")
    let customTaskSubmit = document.getElementById("customTaskSubmit")
    let i = false;
    let errorCounter = 0;
    let score = 0;
    let completedTasks = 0
    let allErrors = 0
    let averageErrors1 = 0
    let textField = document.getElementById("text");
    let textFiled2 = document.getElementById("text2")
    let b = "Добро пожаловать!"
    let c = ""
    let fullTask
    let task1 = document.getElementById("task1");
    let averageErrors = document.getElementById("ae");
    let completedTasks1 = document.getElementById("ct")
    let errorCounterField = document.getElementById("errorCounterField");
    let errorCounterField2 = document.getElementById("errorCounterField2");
    let timerField = document.getElementById("timerField");
    let task2 = document.getElementById("task2");
    let score1 = document.getElementById("score");
    let userInputEnd = document.getElementById("userInputText")

    let mmShowTasksList = document.getElementById("mmShowTasksList")
    let mmShowStatistics = document.getElementById("mmShowStatistics")
    let mmShowCreateTask = document.getElementById("mmShowCreateTask")
    let mmShowInfo = document.getElementById("mmShowInfo")
    let mmShowSettings = document.getElementById("mmShowSettings")
    let mmCloseButton = document.getElementById("mmCloseButton")

    let mmfile = document.querySelector(".tasksField")
    let mmpage = document.getElementById("tasksList")
    let mmStatistics = document.getElementById("mmStatistics")
    let mmCreateTask = document.getElementById("mmCreateTask")
    let mmInfo = document.getElementById("mmInfo")
    let mmSettings = document.getElementById("mmSettings")
    let clearCache = document.getElementById("clearCache")

    let maxErrors = 0
    let userInput = []
    let ctUserInput = []
    let userInput2 = []
    let escapeCounter = 0
    let userInputCount = 0
    var tTime = 0;
    let taskEnd = false
    errorCounterField.innerHTML = "Ошибки: " + errorCounter
    errorCounterField2.innerHTML = "Макс. ошибок: " + maxErrors;
    
    mmShowSettings.addEventListener(("click"),()=>{
      mmpage.style.visibility = "hidden"
      mmpage.style.scale = 0
      mmLine.style.display="none"
      mmCreateTask.style.visibility="hidden"
      mmCreateTask.style.scale=0
      mmInfo.style.visibility = "hidden"
      mmInfo.style.scale = 0
      mmStatistics.style.visibility = "hidden"
      mmStatistics.style.scale = 0
      mmSettings.style.visibility = "visible"
      mmSettings.style.scale = 1
      mmHideTasks()
    })

    mmShowInfo.addEventListener(("click"),()=>{
      mmpage.style.visibility = "hidden"
      mmpage.style.scale = 0
      mmLine.style.display="none"
      mmCreateTask.style.visibility="hidden"
      mmCreateTask.style.scale=0
      mmSettings.style.visibility = "hidden"
      mmSettings.style.scale = 0
      mmStatistics.style.visibility = "hidden"
      mmStatistics.style.scale = 0
      mmInfo.style.visibility = "visible"
      mmInfo.style.scale = 1
      mmHideTasks()
    })

    mmShowCreateTask.addEventListener(("click"),()=>{
      mmStatistics.style.visibility = "hidden"
      mmStatistics.style.scale = 0
      mmpage.style.visibility = "hidden"
      mmpage.style.scale = 0
      mmLine.style.display="none"
      mmInfo.style.visibility = "hidden"
      mmInfo.style.scale = 0
      mmSettings.style.visibility = "hidden"
      mmSettings.style.scale = 0
      mmCreateTask.style.visibility="visible"
      mmCreateTask.style.scale=1
      mmHideTasks()
    })

    mmShowStatistics.addEventListener("click",()=>{
      mmpage.style.visibility = "hidden"
      mmpage.style.scale = 0
      mmLine.style.display="none"
      mmCreateTask.style.visibility="hidden"
      mmCreateTask.style.scale=0
      mmInfo.style.visibility = "hidden"
      mmInfo.style.scale = 0
      mmSettings.style.visibility = "hidden"
      mmSettings.style.scale = 0
      mmStatistics.style.visibility = "visible"
      mmStatistics.style.scale = 1
      mmHideTasks()
    })

    mmShowTasksList.addEventListener("click",() => {
      mmStatistics.style.visibility = "hidden"
      mmStatistics.style.scale = 0
      mmCreateTask.style.visibility="hidden"
      mmCreateTask.style.scale=0
      mmInfo.style.visibility = "hidden"
      mmInfo.style.scale = 0
      mmSettings.style.visibility = "hidden"
      mmSettings.style.scale = 0
      mmpage.style.visibility="visible"
      mmpage.style.scale= 1
      mmLine.style.display="none"
      setTimeout(()=>{
        mmfile.style.visibility = "visible"
        mmfile.style.scale = 1
      },100)
      setTimeout(()=>{
        scanCustomTasks()
        document.querySelector(".tasksScanField").style.visibility = "visible"
        document.querySelector(".tasksScanField").style.scale = 1
      },200)
    })
    
    const mmHideTasks = () => {
      mmfile.style.visibility = "hidden"
        mmfile.style.scale = 0
      document.querySelector(".tasksScanField").style.visibility = "hidden"
        document.querySelector(".tasksScanField").style.scale = 0
    }

    const renderKeyboard = (inputKey,status) => {
      const keyboard = document.querySelectorAll(".keyboardKey")
      keyboard.forEach(key => {
        let a = key.getAttribute("key1")
        let b = key.getAttribute("key2")
        let c = key.getAttribute("key3")
        let d = key.getAttribute("key4")
        if (a === inputKey || b === inputKey || c === inputKey || d === inputKey || key.innerHTML === ' ') {
          if (status === true){
            key.style.background = "green"
          }
          else {
            key.style.background = "red"
          }
          setTimeout(() => {
            key.style.background = "#ffffff33"
           }, 150);
        }
      })
      
    }

    mmCloseButton.addEventListener("click",()=>{
      navbarHide()
    })

    window.addEventListener("keydown",(e)=>{
      if (e.key === "Escape") {
        if (escapeCounter == 1){
          navbarHide()
          return
        }else {
          navbarShow()
        }
      }
    })
 
    showModal.addEventListener("click",()=>{
      ctUserInput = []
      ctUserInput.push(userInput)
      clearEndText()
      renderTaskEnd(errorCounter,timerTime,fullTask)
    })
    
    const clearUserText = () => {
      while (textFiled2.firstChild) {
        textFiled2.removeChild(textFiled2.lastChild);
      }
    }

    const clearEndText = () => {
      while (userInputEnd.firstChild) {
        userInputEnd.removeChild(userInputEnd.lastChild);
      }
    }

    const renderUserText = () => {
      if (i == true){
      clearUserText()
      userInputCount++
      userInput.forEach(e => {
        const div = document.createElement("div")
        const symbol = document.createTextNode(e.key)
        if (e.key === " " && e.status === true) {
          e.key = "_"
          clearUserText()
          ctUserInput.push(userInput)
          userInput = []
        } else if (e.key === " " && e.status === false) {
          e.key = "_"
        } else {
        if(e.status === false){
            div.style.color = "red"
        } else {
          div.style.color = "lightgreen"
        }
        div.appendChild(symbol)
        textFiled2.appendChild(div)
      }
      })
    } else {
      return
    }
    }


    const renderTaskEnd = (errors,time) => {
      let a = []
      let etErrors = document.querySelector(".etErrors")
      let etTime = document.querySelector(".etTime")
      let etAccuracy = document.querySelector(".etAccuracy")
      ctUserInput.forEach(e => {
        e.forEach(e => {
          const div = document.createElement("div")
          const symbol = document.createTextNode(e.key)       
          if(e.status === false){
            div.style.color = "red"
        } else {
          div.style.color = "lightgreen"
        }
          div.appendChild(symbol)
          a.push(div)
        })
      })
      const perChunk = 34   
      const inputArray = a
        const result = inputArray.reduce((resultArray, item, index) => { 
          const chunkIndex = Math.floor(index/perChunk)
          if(!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []
          }
          resultArray[chunkIndex].push(item)
          return resultArray
        }, [])
      let count = 1
  
      result.forEach(e => {
        const divLine = document.createElement("div")
        divLine.classList.add("uiTextLine")
        divLine.setAttribute("id",count)
        e.forEach(e=> {
          divLine.appendChild(e)
        })
        count++
        userInputEnd.appendChild(divLine)
      })
      let accuracy = 100 - Math.floor(100 * (errors/userInputCount))
      etErrors.innerHTML = errors
      let endTime = timerTime-tTime
      let minutes = Math.trunc(endTime/60)
      minutes = minutes < 10 ? "0" + minutes : minutes;
      let seconds = (Math.floor(endTime%60))
      seconds = seconds < 10 ? "0" + seconds : seconds;
      etTime.innerHTML = `${minutes}:${seconds}`
      etAccuracy.innerHTML = `${accuracy}%`
      endTaskBox.style.visibility = "visible"
      endTaskBox.style.opacity = "1"
      taskEnd=true
    }

    const taskConfirmWindow = (taskName,taskText,errors,time) => {
      let tcwText = document.querySelector(".tcwText")
      let tcwName = document.querySelector(".tcwName")
      let tcwErr = document.querySelector(".tcwErrors")
      let tcwTime = document.querySelector(".tcwTime")
      let start = document.getElementById("tcwStart")
      navbarHide()
      tcwText.innerHTML=taskText
      tcwName.innerHTML=taskName
      tcwErr.innerHTML = errors
      tcwTime.innerHTML = `${time}s`
      confirmBox.style.visibility = "visible"
      confirmBox.style.opacity = "1"
      start.addEventListener("click",()=>{
        b = taskText
        maxErrors = errors
        tTime = time
        timerTime = tTime
        i = true
        screenReset()
        timerStart()
        confirmBox.style.visibility = "hidden"
        confirmBox.style.opacity = "0"
        taskEnd = false
      })
    }
    
    const alertMessage = (title,message) => {
      const alertBox = document.querySelector(".alertBox")
      alertBox.style.visibility="visible"
      alertBox.style.opacity="1"
      const window = document.createElement("div")
      const titleLine = document.createElement("div")
      const closeButton = document.createElement("button")
      const titleText = document.createTextNode(title)
      const contentLine = document.createElement("div")
      const contentField = document.createTextNode(message);
      window.classList.add("alert")

      titleLine.setAttribute("id","titleLine")
      titleLine.classList.add("center-text")
      titleLine.classList.add("color-white")

      contentLine.setAttribute("id","contentLine")
      contentLine.classList.add("center-text")
      contentLine.classList.add("color-white")

      closeButton.classList.add("btn")
      closeButton.classList.add("btn-text")
      closeButton.classList.add("color-white")
      closeButton.innerHTML = "Закрыть"

      titleLine.appendChild(titleText)

      contentLine.appendChild(contentField)

      window.appendChild(titleLine)
      window.appendChild(contentLine)
      window.appendChild(closeButton)
      closeButton.addEventListener ("click", ()=> {
        alertBox.style.opacity="0"
        alertBox.style.visibility="hidden"
        while (alertBox.firstChild) {
          alertBox.removeChild(alertBox.lastChild);
        }
      })
      alertBox.appendChild(window)
    }

    // Saving data to localstorage
    const  userData = (a) => {
      switch(a) {
      case 1:
          localStorage.setItem("userScore",score)
          localStorage.setItem("userErrors",allErrors)
          localStorage.setItem("userTasks",completedTasks)
          localStorage.setItem("userAVE",averageErrors1)
      case 2:
        score = localStorage.getItem("userScore")
        allErrors =  localStorage.getItem("userErrors")
        completedTasks = localStorage.getItem("userTasks")
        averageErrors1 = localStorage.getItem("userAVE")
      }
    }  
    

    //Custom tasks 
    customTaskSubmit.addEventListener(("click"), ()=> {
      let taskName = document.getElementById("taskName").value
      let taskTextField = document.getElementById("taskTextField").value
      let maximumErrors = document.getElementById("maximumErrors").value
      let timerTime = document.getElementById("timerTime").value
      if (taskName && taskTextField && maximumErrors && timerTime) {
      let fileData = {taskText:taskTextField,maxErrors:maximumErrors,timerTime:timerTime}
      fs.writeFile(__dirname + `/User/customTasks/${taskName}.txt`, `${JSON.stringify(fileData)}`, function(err) {
        if(err) {
            return alert(err);
        }
        alertMessage("Сообщение:",`Задание ${taskName} создано!`)
    }); 
  } else {
    alertMessage("Ошибка!",`Пустые поля`)
  }
    })

    // Ascii generator
    const generate = () => {
      var randomNum =
        0 + parseInt(Math.floor(Math.random() * (127 - 33 + 1) + 33));
        return randomNum
    }
    
    //Scan tasks directory
    const scanCustomTasks = () => {
      let scanField = document.querySelector(".tasksScanField")
      while (scanField.firstChild) {
        scanField.removeChild(scanField.lastChild);
      }
      fs.readdir(__dirname + "/User/customTasks", (err, files) => {
        files.forEach(file => {
        if (file.substring(file.length-3) == "txt"){
         const newDiv = document.createElement("button")
         newDiv.classList.add("btnTask")
         newDiv.classList.add("btn")
         newDiv.classList.add("btn-text")
         newDiv.classList.add("color-white")
         newDiv.addEventListener("click",() => {
          fs.readFile(__dirname + `/user/customTasks/${file}`, 'utf8', function(err, content) {
            data = JSON.parse(content);
            data1 = data.taskText;
            data2 = data.maxErrors;
            data3 = data.timerTime
            data1 = JSON.stringify(data1);
            f = data1.length;
            data1 = data1.substring(1, f - 1);
            fullTask = data1
            taskConfirmWindow(`${file.replace(".txt","")}`,data1,data2,data3)
          });

         })
          const content = document.createTextNode(`${file.replace(".txt","")}`);
          newDiv.appendChild(content);
          document.querySelector(".tasksScanField").appendChild(newDiv)
        }
        else {
          alertMessage("Ошибка!",`Неправильный формат файла: ${file}`)
        }
        });
        
      });
    }
    
    // Navbar animation
    navbar.onpointermove = e => {
        decimal =  e.clientX
        const x = decimal
        setTimeout(()=> {
          navbar.style.setProperty("--x", x + "px");
        },60)
      }

      navbar.addEventListener("click",()=>{
        navbarShow()
      })
  
      const navbarShow = () => {
        mainMenu.style.display = "flex"
        setTimeout(() => {
        mainMenu.style.visibility = "visible"
        mainMenu.style.opacity = 1
        },100)
        escapeCounter=1
        i = false
      }

      window.onclick = function(event) {
        if (event.target == mainMenu){
            navbarHide()
          } else if (event.target == confirmBox) {
            confirmBox.style.visibility = "hidden"
            confirmBox.style.opacity = "0"
          } else if (event.target == endTaskBox) {
            endTaskBox.style.visibility = "hidden"
            endTaskBox.style.opacity = "0"
          }
        }

     // Navbar hide function
     const navbarHide = () => {
      mainMenu.style.visibility = "hidden"
      mainMenu.style.opacity = "0"
      escapeCounter = 0
      if (taskEnd == true){
        i = false
      } else {
      i = true
      }
      setTimeout(() => {
        mainMenu.style.display = "none"
      },100)
     }
      tcwClose.addEventListener("click",()=>{
        confirmBox.style.visibility = "hidden"
        confirmBox.style.opacity = "0"
      })
      etClose.addEventListener("click",()=>{
        endTaskBox.style.visibility = "hidden"
        endTaskBox.style.opacity = "0"
      })

      clearCache.addEventListener("click",()=>{
        alertMessage("Сообщение","Статистика сброшена!")
      })
      


    // Resetting screen

    const screenReset = () => {
      errorCounter = 0
      c = ""
      textField.innerHTML = `${b}`;
      textFiled2.innerHTML = `${c}`
      clearUserText()
      userInput = []
      ctUserInput = []
      clearEndText()
      userInputCount = 0
      score1.innerHTML = score
      completedTasks1.innerHTML = completedTasks
      averageErrors.innerHTML = averageErrors1
      errorCounterField.innerHTML = errorCounter
      errorCounterField2.innerHTML =  maxErrors
      timerField.innerHTML = `00:00`
      mainMenu.style.visibility = "hidden"
      mainMenu.style.opacity = "0"
    }

  var doWork = function() {
    if (i == true){
    if (tTime <= 0) {
      textField.innerHTML= "Время вышло"
      timersRunning = 0
      i = false
      ticker.stop()
      return
    } 
    tTime--
    let minutes = Math.trunc(tTime/60)
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let seconds = (Math.floor(tTime%60))
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timerField.innerHTML = `${minutes}:${seconds}`
  } else {
    ticker.stop()
    return
  }
  };

  var doError = function() {
    console.warn('The drift exceeded the interval.');
  };

  var ticker = new AdjustingInterval(doWork, 1000, doError);
    const timerStart = () => {
      if (timersRunning >= 1) {
        ticker.stop()
        timersRunning = 0
      } 
        ticker.start()
        timersRunning = 1

      }
    

    // Task 1
    
    const randomAO = (amount) => {
      let e = []
      for (let i = 0; i < amount; i++) {
        a = Math.round(Math.random());
        if (a == 1) {
          e.push("a");
        } else {
          e.push("o");
        }
      }
      e = e.join("");
      return e
    }

    task1.addEventListener("click", () => {
      b = ""
      b = randomAO(10)
      maxErrors = 6
      timerA=45
      taskConfirmWindow(`"а" и "о" Ур. 1`,b,maxErrors,timerA)
    });

    task2.addEventListener("click", () => {
      b = ""
      b = randomAO(20)
      maxErrors = 10
      timerA=60
      taskConfirmWindow(`"а" и "о" Ур. 2`,b,maxErrors,timerA)
    });

    task3.addEventListener("click", () => {
      b = ""
      b = randomAO(30)
      maxErrors = 10
      timerA=60
      taskConfirmWindow(`"а" и "о" Ур. 3`,b,maxErrors,timerA)
    });

    task4.addEventListener("click", () => {
      b = ""
      for (counter = 0; counter <= 10; counter++) {
        rNum = generate()
          if (rNum >32 && rNum !== 127) {
        b += String.fromCharCode(rNum);
          }
          else {
            rNum = generate()
            b += String.fromCharCode(rNum);
          }
      }
      i = true;
      maxErrors = 20
      timerA = 90
      taskConfirmWindow("Случайные ASCII",b,maxErrors,timerA)
    });
    


    // // Основной цикл
    userData(2)
    screenReset();
    window.addEventListener("keydown", (e) => {
      if (i == true) {
        if (errorCounter < maxErrors || maxErrors == false) {
          textField.innerHTML = b;
        let ascii,
          key = e.key;
        if (key.length == 1) {
          ascii = key.charCodeAt(0);
          if (ascii < 1200 && e.ctrlKey) {
            ascii = ascii & 0x1f;
          }
        }
        if (typeof ascii == "number" && ascii < 1200 && ascii > 15) {
          // field1.style.display = "inline";
          // field1.innerHTML = String.fromCharCode(ascii);
          let key1 = String.fromCharCode(ascii);
            if (key1 === b.charAt(0) && b.length != 0) {
              userInput.push({key:key,status:true})
              userInput2.push({key:key,status:true})
              renderKeyboard(key,true)
              renderUserText()
              b = b.substring(1, b.length);
              c = c + key1
              textField.innerHTML = `${b}`;
              // textFiled2.innerHTML = c
              score++
              score1.innerHTML = score
              if (b.length == 0) {
                i = false;
                textField.innerHTML = "Победа!";
                score = score + 100
                completedTasks++
                averageErrors1 = Math.floor(allErrors/completedTasks)
                completedTasks1.innerHTML = completedTasks
                score1.innerHTML = score
                userData(1)
                ctUserInput.push(userInput)
                renderTaskEnd(errorCounter,tTime,fullTask)
              }
            } else {
              // xmarkAnimation();
              userInput.push({key:key,status:false})
              userInput2.push({key:key,status:true})
              renderKeyboard(key,false)
              renderUserText()
              errorCounter++;
              allErrors++
              averageErrors1 = Math.floor(allErrors/completedTasks)
              averageErrors.innerHTML = averageErrors1
              
              errorCounterField.innerHTML = errorCounter
              errorCounterField2.innerHTML = maxErrors;
            }
          
  
          // setTimeout(() => {
          //   field1.style.display = "none";
          // }, 400);
        }
      } else {
        textField.innerHTML = "Максимальный лимит ошибок"
      }
    } 
    });
    i = false
    taskEnd=true
    textField.innerHTML = b
  });