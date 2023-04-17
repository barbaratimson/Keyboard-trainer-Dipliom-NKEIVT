
window.addEventListener("DOMContentLoaded", () => {
    // let section
    let navbar = document.getElementById("navbar")

    let icon = document.querySelector(".fa-regular")
    let mainMenu = document.querySelector(".mainMenu")
    let mainMenuClose = document.getElementById("menuClose")

    let customTaskPanel = document.getElementById("customTaskPanel")
    let customTaskSubmit = document.getElementById("customTaskSubmit")
    let customTaskButton = document.getElementById("createCustomTask")
    let i = false;
    let errorCounter = 0;
    let score = 0;
    let completedTasks = 0
    let allErrors = 0
    let averageErrors1 = 0
    let textField = document.getElementById("text");
    let countdownField = document.getElementById("countdown")
    b = "Welcome!"
    let task1 = document.getElementById("task1");
    let btnHideTasksMenu = document.getElementById("hide");
    let buttonRow = document.getElementById("btnRow");
    let statsRow = document.getElementById("stats");
    let statsHideMenu = document.getElementById("hide2");
    let body = document.getElementById("body");
    let field1 = document.getElementById("keybox");
    let averageErrors = document.getElementById("ae");
    let xmark = document.getElementById("xmark");
    let completedTasks1 = document.getElementById("ct")
    let errorCounterField = document.getElementById("errorCounterField");
    let timerField = document.getElementById("timerField");
    let task2 = document.getElementById("task2");
    let task3 = document.getElementById("task3");
    let score1 = document.getElementById("score");
    let audio1 = new Audio("sound.mp3");
    let audio = new Audio("sound2.mp3");
    let maxErrors = 0
    audio.volume = 0.2;
    audio1.volume = 0.2;
    errorCounterField.innerHTML = "Errors: " + errorCounter + " " + "Max errors: " + maxErrors;

    

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

    var textFileAsBlob = new Blob([JSON.stringify(fileData)], {type:'text/plain'});
    var fileNameToSaveAs = taskName;
      var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();

  } else {
    alert("Empty fields")
  }

    })

    

    // Ascii generator
    const generate = () => {
      var randomNum =
        0 + parseInt(Math.floor(Math.random() * (127 - 33 + 1) + 33));
        return randomNum
    }
    


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
        mainMenu.style.bottom = "2.5%"
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
    ad = setInterval(function() {
    var delta = Date.now() - start; 
    curr = Math.floor(delta / 1000)
    let timeLeft = time-curr
    timerField.innerHTML = `${timeLeft}s left`
    if (timeLeft === 0) {
      i = false
      textField.innerHTML = "Time out"
      clearInterval(ad)
      timerLimit = 0
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


    // Task 3
    task3.addEventListener("click", () => {
      b = ""
      var input = document.createElement("input");
      input.type = "file";
      input.onchange = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file); 
        reader.onload = (readerEvent) => {
          var content = readerEvent.target.result; 
        if (content.slice(0,9) === "data:text") {
            content = content.substring(23);
            content = atob(content);
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
            screenReset()
            timer(data3)
        }
        else{
          i = false
          alert("Error on read: File must be .txt")
        }
        };
      };
  
      input.click();
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