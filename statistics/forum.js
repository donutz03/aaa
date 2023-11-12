// forum.js

function height() {
    // Get the user input for the new height
    var userInput = prompt("Enter new height:");

    // Convert the user input to an integer
    var newHeight = parseInt(userInput);

    // Check if the conversion was successful and the value is not NaN
    if (!isNaN(newHeight) || newHeight > 0 || newHeight < 300) {
        // Get the userHeight element
        var userHeightElement = document.getElementById('userHeight');

        // Update the text content of userHeight with the new height
        userHeightElement.textContent = newHeight + 'cm';
    } else {
        // Handle the case where the input is not a valid number
        alert("Please enter a valid number for the height.");
    }
}

function weight() {
    // Get the user input for the new height
    var userInput = prompt("Enter new weight:");

    // Convert the user input to an integer
    var newWeight = parseInt(userInput);

    // Check if the conversion was successful and the value is not NaN
    if (!isNaN(newWeight) || newWeight > 30 || newWeight < 400) {
        // Get the userWeight element
        var userWeightElement = document.getElementById('userWeight');

        // Update the text content of userWeight with the new height
        userWeightElement.textContent = newWeight + ' kg';
    } else {
        // Handle the case where the input is not a valid number
        alert("Please enter a valid number for the weight.");
    }
}

function step() {
    // Get the user input for the new height
    var userInput = prompt("Enter the number of steps you took today:");

    // Convert the user input to an integer
    var newSteps = parseInt(userInput);

    // Check if the conversion was successful and the value is not NaN
    if (!isNaN(newSteps)) {
        // Get the userWeight element
        var userSteps = document.getElementById('userSteps');

        // Update the text content of userWeight with the new height
        userSteps.textContent = newSteps;
    } else {
        // Handle the case where the input is not a valid number
        alert("Please enter a valid number for the steps you took.");
    }
}

function water() {
    // Get the user input for the new height
    var userInput = prompt("Enter the number of liters of water you drank today:");

    // Convert the user input to an integer
    var newWater = parseInt(userInput);

    // Check if the conversion was successful and the value is not NaN
    if (!isNaN(newWater)) {
        // Get the userWeight element
        var userWater = document.getElementById('userWater');

        // Update the text content of userWeight with the new height
        userWater.textContent = newWater + ' L';
    } else {
        // Handle the case where the input is not a valid number
        alert("Please enter a valid number of liters you drank today.");
    }

}
async function saveToJson() {
    // Collect data from elements with IDs starting with "user"
    const userData = {
        userHeight: document.getElementById("userHeight").innerText,
        userWeight: document.getElementById("userWeight").innerText,
        userSteps: document.getElementById("userSteps").innerText,
        userWater: document.getElementById("userWater").innerText,
    };

    // Convert data to JSON format
    const jsonData = JSON.stringify(userData, null, 2);

    async function saveToJson() {
        const userData = {
            userHeight: document.getElementById("userHeight").innerText,
            userWeight: document.getElementById("userWeight").innerText,
            userSteps: document.getElementById("userSteps").innerText,
            userWater: document.getElementById("userWater").innerText,
        };

        try {
            // Send data to the server
            const response = await fetch('http://localhost:3000/saveData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const result = await response.text();
            console.log(result);
        } catch (err) {
            console.error('Error saving data:', err);
        }
    }
}