document.addEventListener("DOMContentLoaded", () => {
    const investigatorList = document.getElementById("investigatorList");
    const addInvestigatorButton = document.getElementById("addInvestigator");

    // Load saved investigators from localStorage
    let investigators = JSON.parse(localStorage.getItem("investigators")) || [];

    // Display investigators in the list
    function renderInvestigators() {
        investigatorList.innerHTML = "";
        if (investigators.length === 0) {
            investigatorList.innerHTML = "<p>No investigators found. Click 'Add New Investigator' to create one.</p>";
            return;
        }

        investigators.forEach((investigator, index) => {
            const investigatorDiv = document.createElement("div");
            investigatorDiv.classList.add("investigator-sheet");
            investigatorDiv.innerHTML = `
                <h2>${investigator.name}</h2>
                <p><strong>Occupation:</strong> ${investigator.occupation}</p>
                <p><strong>Age:</strong> ${investigator.age}</p>
                <button onclick="viewInvestigator(${index})">View</button>
                <button onclick="deleteInvestigator(${index})" class="delete-btn">Delete</button>
            `;
            investigatorList.appendChild(investigatorDiv);
        });
    }

    // Save updated investigators back to localStorage
    function saveInvestigators() {
        localStorage.setItem("investigators", JSON.stringify(investigators));
    }

    // View investigator details
    window.viewInvestigator = function(index) {
        localStorage.setItem("currentInvestigator", JSON.stringify(investigators[index]));
        window.location.href = "more-info.html";
    };

    // Delete an investigator
    window.deleteInvestigator = function(index) {
        if (confirm("Are you sure you want to delete this investigator?")) {
            investigators.splice(index, 1);
            saveInvestigators();
            renderInvestigators();
        }
    };

    // Redirect to the investigator creation page
    addInvestigatorButton.addEventListener("click", () => {
        window.location.href = "basic.html";
    });

    // Initial rendering of the investigator list
    renderInvestigators();
});
