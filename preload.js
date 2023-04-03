window.addEventListener("DOMContentLoaded", () => {
    // let section
    let navbar = document.getElementById("navbar")
    let tasksMenu = document.getElementById("tasks-menu");
    let statsMenu = document.getElementById("stats-menu");
    let i = false;
    let errorCounter = 0;
    let score = 0;
    let textField = document.getElementById("text");


    let btnHideTasksMenu = document.getElementById("hide");
    let buttonRow = document.getElementById("btnRow");
    let statsRow = document.getElementById("stats");
    let statsHideMenu = document.getElementById("hide2");
    let body = document.getElementById("body");
    let field1 = document.getElementById("keybox");
    let averageErrors = document.getElementById("ae");
    let completedTasks = 0
    let allErrors = 0
    let xmark = document.getElementById("xmark");
    let completedTasks1 = document.getElementById("ct")
    let errorCounterField = document.getElementById("errorCounterField");
    let timerField = document.getElementById("timerField");
    let task1 = document.getElementById("task1");
    let task2 = document.getElementById("task2");
    let task3 = document.getElementById("task3");
    let score1 = document.getElementById("score");
    let audio1 = new Audio("sound.mp3");
    let audio = new Audio("sound2.mp3");
    let maxErrors = 1000
    audio.volume = 0.2;
    audio1.volume = 0.2;

    // errorCounterField.innerHTML = "Errors: " + errorCounter + " " + "Max errors: " + maxErrors;
  
    const screenUpdate = () => {

    }  



    const xmarkAnimation = () => {
      xmark.innerHTML = `<i class="fa-sharp fa-regular fa-xmark xmark"></i>`
      xmark.classList.add('xmark');
      setTimeout(() => {
        xmark.classList.remove('xmark');
        xmark.innerHTML = ""
    },600)
    }

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
      body.style.background = "#2A2B2E";
      field2.innerHTML = `|=>${b}`;
      buttonRow.style.display = "none";
      errorCounterField.innerHTML = "Errors: " + errorCounter + " " + "Max errors: " + maxErrors;
    }
    //Чтение файлов
  
    // Открытие и скрытие меню заданий
    tasksMenu.addEventListener("click", () => {
      buttonRow.style.setProperty("--a", 0);
    });
  
    btnHideTasksMenu.addEventListener("click", () => {
      buttonRow.style.setProperty("--a", -800 + "px");
    });
  
    // Открытие и скрытие меню статистики
    statsMenu.addEventListener("click", () => {
      statsRow.style.setProperty("--b", 0 + "px");
    });
  
    statsHideMenu.addEventListener("click", () => {
      statsRow.style.setProperty("--b", 800 + "px");
    });
  
    b = "Welcome!"
    // Задание 1
    // task1.addEventListener("click", () => {
    //   b = ""
    //   e = [];
    //   for (let i = 0; i < 10; i++) {
    //     a = Math.round(Math.random());
    //     if (a == 1) {
    //       e.push("a");
    //     } else {
    //       e.push("o");
    //     }
    //   }
    //   e = e.join("");
    //   b = e;
    //   i = false;
    //   maxErrors = 7
    //   screenReset()
    // });
  
    // // Задание 2
    // task2.addEventListener("click", () => {
    //   b = ""
    //   for (counter = 0; counter <= 9; counter++) {
    //     rNum = generate()
    //       if (rNum >32 && rNum !== 127) {
    //     b += String.fromCharCode(rNum);
    //       }
    //       else {
    //         rNum = generate()
    //         b += String.fromCharCode(rNum);
    //       }
    //   }
    //   i = false;
    //   maxErrors = 10
    //   screenReset();
    // });

    // task3.addEventListener("click", () => {
    //   b = ""
    //   var input = document.createElement("input");
    //   input.type = "file";
  
    //   input.onchange = (e) => {
    //     var file = e.target.files[0];

    //     var reader = new FileReader();
    //     reader.readAsDataURL(file); 
  
    //     reader.onload = (readerEvent) => {
    //       var content = readerEvent.target.result; 
    //       content = content.substring(23);
    //       content = atob(content);
    //       data = JSON.parse(content);
    //       data1 = data.taskText;
    //       data2 = data.maxErrors;
    //       data1 = JSON.stringify(data1);
    //       f = data1.length;
    //       data1 = data1.substring(1, f - 1);
    //         if (data1.length > 418) {
    //           alert("Max symbols size is 418, yours is: " + data1.length)
    //           data1 = data1.substring(0, 418);
   
    //         }
    //       maxErrors = data2
    //       b = data1;
    //       field2.innerHTML = `|=>${b}`;
    //       i = false;
    //       errorCounter = 0;
    //       errorCounterField.innerHTML = "Errors: " + errorCounter + " " + "Max errors: " + maxErrors;
    //       buttonRow.style.display = "none";
    //     };
    //   };
  
    //   input.click();
    // });
    // field2.innerHTML = "";
  
    // // Основной цикл
    i = false
    textField.innerHTML = `${b}`;
    window.addEventListener("keydown", (e) => {
      if (i !== true) {
        if (errorCounter < maxErrors) {
          textField.innerHTML = b;
        let ascii,
          key = e.key;
        if (key.length == 1) {
          ascii = key.charCodeAt(0);
          if (ascii < 128 && e.ctrlKey) {
            ascii = ascii & 0x1f;
          }
        }
  
        if (typeof ascii == "number" && ascii < 128) {
          // field1.style.display = "inline";
          // field1.innerHTML = String.fromCharCode(ascii);

          let key1 = String.fromCharCode(ascii);
  
            if (key1 === b.charAt(0) && b.length != 0) {
              b = b.substring(1, b.length);
              textField.innerHTML = `${b}`;
              // score++
              // score1.innerHTML = `Score: ${score}`
              audio.play();
              if (b.length == 0) {
                i = true;
                textField.innerHTML = "Congratulations";
                // score = score + 100
                // completedTasks++
                // completedTasks1.innerHTML = `Completed tasks: ${completedTasks}`
                // score1.innerHTML = `Score: ${score}`
              }
            } else {
              // xmarkAnimation();
              audio1.play();
              // errorCounter++;
              // allErrors++
              // averageErrors.innerHTML = `Average errors: ${Math.floor(allErrors/completedTasks)}`
              
              // errorCounterField.innerHTML = "Errors: " + errorCounter + " " + "Max errors: " + maxErrors;
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