    let mainArray;
      let bulls = 0;
      let cows = 0;
      let elemBulls = document.querySelector("#bulls");
      let elemCows = document.querySelector("#cows");
      let num1 = document.querySelector("#input1");
      let num2 = document.querySelector("#input2");
      let num3 = document.querySelector("#input3");
      let num4 = document.querySelector("#input4");
      let inputArray;

      function new_game() {
        mainArray = randomNumbersArray();
        console.log(mainArray);
        document.querySelector("#give_up").innerText = null
        document.querySelector("#turns_history").innerText = "turns history :"
    
      }

      function goAction() {
        bulls = 0;
        cows = 0;
        inputArray = [
          num1.innerText,
          num2.innerText,
          num3.innerText,
          num4.innerText,
        ];
        if (valid_inputs_check() == false){
            alert("wrong input, \nplease try again !")
        }
        else{
            addArrayToHistory(inputArray);
            arrays_check();
            elemBulls.innerText += `\n ${bulls}`;
            elemCows.innerText += `\n ${cows}`;
            document.querySelector("#wrong_input").innerText = null
        }
      }

      function give_up(){
        document.querySelector("#give_up").innerText = `the code is : \n${mainArray} `
      }

      function valid_inputs_check(){ 
        let set_convert = new Set(inputArray);
        if(set_convert.size == 4){
            return true
        }
        else{
            return false
        }
      }

      function addArrayToHistory(new_item) {
        document.querySelector("#turns_history").innerText += `\n 
        ${new_item}`;
      }

      function randomNumbersArray() {
        const uniqueNumbers = new Set();
        while (uniqueNumbers.size < 4) {
          const randomNumber = Math.floor(Math.random() * 10);
          uniqueNumbers.add(randomNumber);
        }
        return Array.from(uniqueNumbers);
      }

      function arrays_check() {
        for (let i in inputArray) {
          let index_result = mainArray.indexOf(Number(inputArray[i]));

          if (index_result != -1) {
            if (i == index_result) {
              bulls += 1;
            } else {
              cows += 1;
            }
          }
        }
      }

      function plusOne(buttonElement) {
        let currentValue = parseInt(buttonElement.textContent);
        if (currentValue < 9) {
          let newValue = currentValue + 1;
          buttonElement.textContent = newValue;
        } else {
          buttonElement.textContent = 0;
        }
      }

      
