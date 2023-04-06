window.addEventListener("DOMContentLoaded", () => {
    // let section
    let navbar = document.getElementById("navbar")
    let tasksMenu = document.getElementById("tasks-menu");
    let statsMenu = document.getElementById("stats-menu");
    let menus = document.getElementById("menus")
    let i = false;
    let errorCounter = 0;
    let score = 0;
    let completedTasks = 0
    let allErrors = 0
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
    let averageErrors1 = 0
    averageErrors1 = Math.floor(allErrors/completedTasks)
    errorCounterField.innerHTML = "Errors: " + errorCounter + " " + "Max errors: " + maxErrors;
    // const userData = (a) => {
    //   data = [score=score,averageErrors=Math.floor(allErrors/completedTasks),completedTasks=completedTasks,allErrors=allErrors]
    //   switch(a) {
    //   case "set":
    //       localStorage.setItem("userData",data)
    //   case "get":
    //      d =  localStorage.getItem("userData")
    //      if (d){
    //      score = d[score]
    //      averageErrors1 = d[averageErrors]
    //      completedTasks = d[completedTasks]
    //      allErrors = d[allErrors]
    //      }
    //     alert(d)
    //     console.log(d[score])
    //   }
    // }  
   let alertData = document.getElementById("alertData")
   alertData.addEventListener("click",() =>{
    console.log(allErrors)
    console.log(averageErrors1)
  })
    
//   let resetScreen = document.getElementById("resetScreen")
//   resetScreen.addEventListener("click",() =>{
//    screenReset()
//    console.log(score)
//  })


    const generate = () => {
      var randomNum =
        0 + parseInt(Math.floor(Math.random() * (127 - 33 + 1) + 33));
        return randomNum
    }

    navbar.onpointerenter = e => {
      decimal =  e.clientX
      const x = decimal
      navbar.style.setProperty("--x", x + "px");
    }
      

    navbar.onpointermove = e => {
        decimal =  e.clientX
        const x = decimal
        setTimeout(()=> {
          navbar.style.setProperty("--x", x + "px");
        },60)
      }
  

    const screenReset = () => {
      errorCounter = 0
      textField.innerHTML = `${b}`;
      score1.innerHTML = `Score: ${score}`
      completedTasks1.innerHTML = `Tasks: ${completedTasks}`
      averageErrors.innerHTML = `Average errors: ${averageErrors1}`
      errorCounterField.innerHTML = "Errors: " + errorCounter + " " + "Max errors: " + maxErrors;
      hideMenus()
    }

    const timer = () => {
      var start = Date.now();
    setInterval(function() {
    var delta = Date.now() - start; // milliseconds elapsed since start
    timerField.innerHTML = Math.floor(delta / 1000)// in seconds
    // alternatively just show wall clock time:

    } , 1000); // update about every second
    }
    //Чтение файлов
  
    // Открытие и скрытие меню заданий
    const hideMenus = ()=> {
      setTimeout(() => {
        menus.style.display = "none"
      },100)
      buttonRow.style.setProperty("--a", -800 + "px");
      statsRow.style.setProperty("--b", 800 + "px");
    }


    tasksMenu.addEventListener("click", () => {
      menus.style.display = "flex"
      setTimeout(() => {
        buttonRow.style.setProperty("--a", 0);
      },100)
    });
  
    btnHideTasksMenu.addEventListener("click", () => {
      buttonRow.style.setProperty("--a", -800 + "px");
      setTimeout(() => {
        menus.style.display = "none"
      },100)
    });
  
    // Открытие и скрытие меню статистики
    statsMenu.addEventListener("click", () => {
      menus.style.display = "flex"
      setTimeout(() => {
      statsRow.style.setProperty("--b", 0 + "px");
    },100)
    });
  
    statsHideMenu.addEventListener("click", () => {
      statsRow.style.setProperty("--b", 800 + "px");
      setTimeout(() => {
        menus.style.display = "none"
      },100)
    });
  
    // Task 1
    task1.addEventListener("click", () => {
      b = ""
      e = [];
      for (let i = 0; i < 10; i++) {
        a = Math.round(Math.random());
        if (a == 1) {
          e.push("a");
        } else {
          e.push("o");
        }
      }
      e = e.join("");
      b = e;
      maxErrors = 7
      i=true
      screenReset()
    });
  
    // Задание 2
    task2.addEventListener("click", () => {
      b = ""
      for (counter = 0; counter <= 9; counter++) {
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
      maxErrors = 10
      screenReset();
    });

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

        if (content.slice(0,9)== "data:text") {
            content = content.substring(23);
            content = atob(content);
            data = JSON.parse(content);
            data1 = data.taskText;
            data2 = data.maxErrors;
            data1 = JSON.stringify(data1);
            f = data1.length;
            data1 = data1.substring(1, f - 1);
            maxErrors = data2
            b = data1;
            i = true;
            screenReset()
        }
        else{
          i = false
          alert("Error on read: File must be txt")
        }
        };
      };
  
      input.click();
    });
  
    // // Основной цикл

    screenReset();
    textField.innerHTML = `${b}`;
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
                completedTasks1.innerHTML = `Tasks: ${completedTasks}`
                score1.innerHTML = `Score: ${score}`
              }
            } else {
              // xmarkAnimation();
              audio1.play();
              errorCounter++;
              allErrors++
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