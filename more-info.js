document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the current investigator being edited
    let investigator = JSON.parse(localStorage.getItem("currentInvestigator")) || null;
    const summaryContainer = document.getElementById('investigatorSummary');
    const additionalForm = document.getElementById('additionalForm');

    if (investigator) {
        summaryContainer.innerHTML = `
            <h2>Basic Investigator Info</h2>
            <p><strong>Name:</strong> ${investigator.name}</p>
            <p><strong>Occupation:</strong> ${investigator.occupation}</p>
            <p><strong>Age:</strong> ${investigator.age}</p>
            <p><strong>Pronoun:</strong> ${investigator.pronoun}</p>
            <p><strong>Birthplace:</strong> ${investigator.birthplace}</p>
            <p><strong>Residence:</strong> ${investigator.residence}</p>
        `;
    } else {
        alert("No investigator found! Redirecting...");
        window.location.href = "home.html";
        return;
    }

    additionalForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Gather additional stats
        const formData = new FormData(additionalForm);
        const additionalInfo = {
            strength: formData.get('strength'),
            dexterity: formData.get('dexterity'),
            intelligence: formData.get('intelligence'),
            constitution: formData.get('constitution'),
            charisma: formData.get('charisma'),
            luck: formData.get('luck')
        };

        // Attach stats to the investigator
        investigator.stats = additionalInfo;

        // Retrieve existing investigators list
        let investigators = JSON.parse(localStorage.getItem("investigators")) || [];

        // Find and update the investigator in the list
        let updatedInvestigators = investigators.map(inv => 
            inv.name === investigator.name ? investigator : inv
        );

        // Save updated list back to localStorage
        localStorage.setItem("investigators", JSON.stringify(updatedInvestigators));

        // Clear current investigator from localStorage (not needed anymore)
        localStorage.removeItem("currentInvestigator");

        // Redirect back to home.html
        alert("Investigator saved successfully!");
        window.location.href = "home.html";
    });
    window.location.href = "home.html";
});
