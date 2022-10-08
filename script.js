///Javascript for the logic
function getHistory() { //getting the history value using its id and innerText
  return document.getElementById("history-value").innerText;
}
//alert(getHistory()); //for testing if the function works

//print history fucntion to print history value
function printHistory(num){
  document.getElementById("history-value").innerText=num;
}
//we get the parameter and set it to the history value
// printHistory("9*9+8");

function getOutput() {
    return document.getElementById("output-value").innerText;
  }

//print output to get the output value of the calculator
function printOutput(num) {
  if(num==""){ //checking if the output is empty we set the output to empty else we convert it to formatted
  document.getElementById("output-value").innerText=num;
  }else{ //else we convert it to the comma separated value
  document.getElementById("output-value").innerText=getFormattedNumber(num);
  }
}
//printOutput("9999"); //checking if the printOutput works

//the fuction to read the number and return formatted values
function getFormattedNumber(num) {
  //make - being recognized as a number
  if(num=="-"){
    return "";
  }
  //To do this we use toLocaleString functions
  var n = Number(num);
  var value = n.toLocaleString("en");
  return value;
}
//printOutput("8776543"); //testing if the getFormattedNumber function works

//To manipulate the output we have to convert the comma separated back to the original number
//Defining the function to do the work
function reverseNumberFormat(num) {
  return Number(num.replace(/,/g,'')); //This will replace the comma to an empty character
  //eg replacing x with y the format is (/x/g/y)
}
//using alert statement to check if the function is working
//alert(reverseNumberFormat(getOutput()));

//getting to the operations using the operator class
var operator = document.getElementsByClassName("operator");
//using for loop to access one by one
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click',function(){
        //inside here we give what happens when the user clicks the operators
        //alert("The operator clicked: "+this.id);

        //starting with the clear button which removes the output and the history (setting to  them empty)
        if(this.id == "clear"){
          printHistory("");
          printOutput("");
        }
        //backspace button
        else if(this.id == "backspace"){ //we convert it into number format as for backspace should not deal
          //with commas in the output
          //The we convert it into a string and remove the last character using substring fuction
          //and printed back
          var output = reverseNumberFormat(getOutput()).toString();
          if(output){ //if output has a value
            output = output.substr(0,output.length-1);
            printOutput(output);
          }
        }else {
          //For the other operators do not work if the output is empty
          //First we Declaring both history and output value
          var output = getOutput();
          var history = getHistory();
          //Enable to change the operator from history and operations
          if(output == "" && history != ""){
            if(isNaN(history[history.length-1])){ //checking if the last character is an operators and remove the last character
              //using substract function
              history = history.substr(0,history.length-1);

            }
          }
          if(output != "" || history != ""){ //checking if the operator is not empty before we proceed (and the history as well)
              //condition?true:false (the first value is assigned to the output else the second value is assigned to the output)
              //Only if output has a value
              output = output ==""?output:reverseNumberFormat(output); //giving number format of the output
              //adding the output to the history value
              history = history + output;

              //if userclicks the equals sign '='
              if(this.id == "="){
                var result = eval(history); //the history is evaluated (where we added values from the output)
                printOutput(result); //the result is printed at the output
                printHistory(""); //and history is set to empty

              }else{ //for other operators, operators get added to history and output is set to empty
                    history = history+this.id;
                    printHistory(history);
                    printOutput("");
              }

            }
        }

    });
}

//getting to the numbers using the number class
var number = document.getElementsByClassName("number");
//using for loop to access one by one
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener('click',function(){
        //inside here we give what happens when the user clicks the operators
        //alert("The number clicked: "+this.id);
        var output = reverseNumberFormat(getOutput());
        if(output != NaN){ //Checking if the output is a number
            output = output+this.id;//concatinating the id to the out put and printing it
            printOutput(output);
        }
    });
}
