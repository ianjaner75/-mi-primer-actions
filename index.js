// create an HTML form with a text field and button
const form = document.createElement("form");
const input = document.createElement("input");
input.type = "text";
input.name = "userInput";
input.placeholder = "Enter something...";
form.appendChild(input);

const button = document.createElement("button");
button.type = "submit";
button.textContent = "Submit";
form.appendChild(button);

// append the form to the body
document.body.appendChild(form);

// add an event listener to handle form submission
form.addEventListener("submit", function(event) {
    event.preventDefault(); // prevent the default form submission behavior
    const userInput = input.value; // get the value from the input field
    console.log("User Input:", userInput); // log the user input to the console
    input.value = ""; // clear the input field after submission
}); 

//Add an event listener to the button to send a POST request to /generate endpoint and display response in a div with id "result"
button.addEventListener("click", function(event) {
    event.preventDefault(); // prevent the default form submission behavior
    const userInput = input.value; // get the value from the input field

    // send a POST request to /generate endpoint
    fetch("/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ input: userInput })
    })
    .then(response => response.json())
    .then(data => {
        // display the response in a div with id "result"
        const resultDiv = document.getElementById("result");
        if (resultDiv) {
            resultDiv.textContent = data.output; // assuming the response has an 'output' field
        } else {
            console.error("Result div not found");
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });

    input.value = ""; // clear the input field after submission
});
    