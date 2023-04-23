const fs = require('fs');
window.addEventListener("DOMContentLoaded", () => {
    // let section
    let navbar = document.getElementById("navbar")

    let mainMenu = document.querySelector(".mainMenu")
    let mainMenuClose = document.getElementById("menuClose")
    let scanTasks = document.getElementById("scanTasks")

    let customTaskSubmit = document.getElementById("customTaskSubmit")
    let i = false;
    let errorCounter = 0;
    let score = 0;
    let completedTasks = 0
    let allErrors = 0
    let averageErrors1 = 0
    let textField = document.getElementById("text");
    b = "Welcome!"
    let task1 = document.getElementById("task1");
    let averageErrors = document.getElementById("ae");
    let completedTasks1 = document.getElementById("ct")
    let errorCounterField = document.getElementById("errorCounterField");
    let timerField = document.getElementById("timerField");
    let task2 = document.getElementById("task2");
    let score1 = document.getElementById("score");
    let audio1 = new Audio("sound.mp3");
    let audio = new Audio("sound2.mp3");
    let maxErrors = 0
    audio.volume = 0.2;
    audio1.volume = 0.2;
    errorCounterField.innerHTML = "Errors: " + errorCounter + " " + "Max errors: " + maxErrors;

    const taskConfirmWindow = (taskName,taskText,errors,time) => {

    }
    
    // document.getElementById("stopTimer").addEventListener("click", () => {
    //   timer(false)
    // }) 
  
    const alertMessage = (title,message) => {
      const alertBox = document.querySelector(".alertBox")
      alertBox.style.display="flex"
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
      closeButton.innerHTML = "Close"
      titleLine.appendChild(titleText)
      contentLine.appendChild(contentField)
      window.appendChild(titleLine)
      window.appendChild(contentLine)
      window.appendChild(closeButton)
      closeButton.addEventListener ("click", ()=> {
        alertBox.style.display="none"
        // clearInterval(lifetime)
        while (alertBox.firstChild) {
          alertBox.removeChild(alertBox.lastChild);
        }
      })
      alertBox.appendChild(window)
      // const lifetime = setInterval(()=>{
      //   alertBox.style.display="none"
      //   while (alertBox.firstChild) {
      //     alertBox.removeChild(alertBox.lastChild);
      //   }
      // },5000)
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
      fs.writeFile(`./User/customTasks/${taskName}.txt`, `${JSON.stringify(fileData)}`, function(err) {
        if(err) {
            return alert(err);
        }
        alertMessage("Message:",`Task ${taskName} created!`)
    }); 
  } else {
    alertMessage("Error!",`Empty Fields`)
  }

    })

    

    // Ascii generator
    const generate = () => {
      var randomNum =
        0 + parseInt(Math.floor(Math.random() * (127 - 33 + 1) + 33));
        return randomNum
    }
    
    //Scan tasks directory
    scanTasks.addEventListener("click", ()=> {
      let scanField = document.querySelector(".tasksScanField")
      while (scanField.firstChild) {
        scanField.removeChild(scanField.lastChild);
      }
      fs.readdir("./user/customTasks", (err, files) => {
        files.forEach(file => {
        if (file.substring(file.length-3) == "txt"){
         const newDiv = document.createElement("button")
         newDiv.setAttribute("id",`taskCreated`)
         newDiv.classList.add("btn")
         newDiv.classList.add("btn-text")
         newDiv.classList.add("color-white")
         newDiv.addEventListener("click",() => {
          fs.readFile(`./user/customTasks/${file}`, 'utf8', function(err, content) {
            data = JSON.parse(content);
            data1 = data.taskText;
            data2 = data.maxErrors;
            data3 = data.timerTime
            data1 = JSON.stringify(data1);
            f = data1.length;
            data1 = data1.substring(1, f - 1);
            maxErrors = data2
            b = data1;
            i = true;
            console.log()
            screenReset()
            timer(data3)
          });

         })
          const content = document.createTextNode(`${file.replace(".txt","")}`);
          newDiv.appendChild(content);
          document.querySelector(".tasksScanField").appendChild(newDiv)
        }
        else {
          alertMessage("Error!",`Wrong format on: ${file}`)
        }
        });
        
      });
    })
    
    // Navbar animation
    navbar.onpointermove = e => {
        decimal =  e.clientX
        const x = decimal
        setTimeout(()=> {
          navbar.style.setProperty("--x", x + "px");
        },60)
      }
  
      // Navbar show function
     const navbarShow = () => {
      mainMenu.style.display = "flex"
      setTimeout(()=> {
        mainMenu.style.bottom = "3%"
      },100)
     }

     // Navbar hide function
     const navbarHide = () => {
      mainMenu.style.bottom = "100vh"
      setTimeout(()=> {
        mainMenu.style.display = "none"
      },400)
     }

       // Navbar click to show listener
      navbar.addEventListener("click", ()=> {
        navbarShow()
      })

      // Navbar hide button listener
      mainMenuClose.addEventListener("click", ()=> {
        navbarHide()
      })



    // Resetting screen

    const screenReset = () => {
      errorCounter = 0
      textField.innerHTML = `${b}`;
      score1.innerHTML = `Score: ${score}`
      completedTasks1.innerHTML = `Tasks: ${completedTasks}`
      averageErrors.innerHTML = `Average errors: ${averageErrors1}`
      errorCounterField.innerHTML = "Errors: " + errorCounter + " " + "Max errors: " + maxErrors;
      mainMenu.style.bottom = "100vh"
    }



    // Tasks timer
    const timer = (time) => {  
  
     //Пофиксить возможность двойного нажатия 
      var start = Date.now();
      time = time
      timerField.innerHTML = `${time}s left`
    const ad = setInterval(function() {
    var delta = Date.now() - start; 
    curr = Math.floor(delta / 1000)
    let timeLeft = time-curr
    timerField.innerHTML = `${timeLeft}s left`
    if (timeLeft === 0) {
      i = false
      textField.innerHTML = "Time out"
      clearInterval(ad)
    }
    } , 1000);
    }
  



    // Task 1
    task1.addEventListener("click", () => {
      let max = prompt("Symbols count")
      Number(max)
      if (max){
      b = ""
      e = [];
      timer(false)
      for (let i = 0; i < max; i++) {
        a = Math.round(Math.random());
        if (a == 1) {
          e.push("a");
        } else {
          e.push("o");
        }
      }
      e = e.join("");
      b = e;
      maxErrors = Math.floor(max*0.5) 
      i=true
      screenReset()
      max = +max + (max/2)
      timer(max)
    }
    });
  
    // Task 2
    task2.addEventListener("click", () => {
      let max = prompt("Symbols count")
      Number(max)
      if (max) {
      b = ""
      for (counter = 0; counter <= max; counter++) {
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
      maxErrors = Math.floor(max*1.2)
      screenReset();
      timer(max*3)
    }
    });




    // // Основной цикл
    userData(2)
    screenReset();
    i = true
    window.addEventListener("keydown", (e) => {
      if (i == true) {
        if (errorCounter < maxErrors || maxErrors == false) {
          textField.innerHTML = b;
        let ascii,
          key = e.key;
        if (key.length == 1) {
          ascii = key.charCodeAt(0);
          if (ascii < 128 && e.ctrlKey) {
            ascii = ascii & 0x1f;
          }
        }
  
        if (typeof ascii == "number" && ascii < 128 && ascii > 15) {
          // field1.style.display = "inline";
          // field1.innerHTML = String.fromCharCode(ascii);

          let key1 = String.fromCharCode(ascii);
            if (key1 === b.charAt(0) && b.length != 0) {
              b = b.substring(1, b.length);
              textField.innerHTML = `${b}`;
              score++
              score1.innerHTML = `Score: ${score}`
              audio.play();
              if (b.length == 0) {
                i = false;
                textField.innerHTML = "Congratulations";
                score = score + 100
                completedTasks++
                averageErrors1 = Math.floor(allErrors/completedTasks)
                completedTasks1.innerHTML = `Tasks: ${completedTasks}`
                score1.innerHTML = `Score: ${score}`
                userData(1)
              }
            } else {
              // xmarkAnimation();
              audio1.play();
              errorCounter++;
              allErrors++
              averageErrors1 = Math.floor(allErrors/completedTasks)
              averageErrors.innerHTML = `Average errors: ${averageErrors1}`
              
              errorCounterField.innerHTML = "Errors: " + errorCounter + " " + "Max errors: " + maxErrors;
            }
          
  
          // setTimeout(() => {
          //   field1.style.display = "none";
          // }, 400);
        }
      } else {
        textField.innerHTML = "Max Errors"
      }
    } 
    });
  });