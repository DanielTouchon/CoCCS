document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('investigatorForm');

  form.addEventListener('submit', (event) => {
      event.preventDefault();

      // Gather form data
      const formData = new FormData(form);
      const investigator = {
          name: formData.get('investigatorName'),
          occupation: formData.get('occupation'),
          age: formData.get('age'),
          pronoun: formData.get('pronoun'),
          residence: formData.get('residence'),
          birthplace: formData.get('birthplace')
      };

      // Save to localStorage
      let investigators = JSON.parse(localStorage.getItem("investigators")) || [];
      investigators.push(investigator);
      localStorage.setItem("investigators", JSON.stringify(investigators));
      
      // Save current investigator and redirect
      localStorage.setItem("currentInvestigator", JSON.stringify(investigator));
      window.location.href = 'more-info.html';
  });
});