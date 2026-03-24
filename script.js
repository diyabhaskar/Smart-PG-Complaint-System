async function addComplaint() {
  let name = document.getElementById("name").value.trim();
  let issue = document.getElementById("issue").value.trim();
  let category = document.getElementById("category").value;

  if (!name || !issue || !category) {
    alert("Please fill all fields");
    return;
  }

  let complaintData = { name, issue, category };

  try {
    const response = await fetch('http://localhost:3000/api/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(complaintData)
    });

    if (response.ok) {
      const currentComplaint = {
        ...complaintData,
        date: new Date().toLocaleString()
      };

      // 1. Display the card
      displaySingle(currentComplaint);
      
      // 2. Clear inputs
      document.getElementById("name").value = "";
      document.getElementById("issue").value = "";
      document.getElementById("category").selectedIndex = 0;

      // 3. Create and show the Success Message
      const msg = document.createElement("p");
      msg.innerHTML = "✅ Complaint submitted successfully!";
      msg.style.color = "Black"; 
      msg.style.fontWeight = "bold";
      msg.style.textAlign = "center";
      msg.id = "success-msg";
      document.getElementById("data").prepend(msg);

      // 4. DISAPPEAR LOGIC: Remove everything after 5 seconds
      setTimeout(() => {
        // Remove the success message
        msg.remove();
        // Remove the complaint card
        document.getElementById("data").innerHTML = "";
      }, 5000); // 5000 milliseconds =  5 seconds
      
    }
  } catch (error) {
    console.error("Error submitting:", error);
    alert("Failed to save to database.");
  }
}

function displaySingle(c) {
  let container = document.getElementById("data");
  container.innerHTML = `
    <div class="card">
      <h3>Latest Complaint Submitted</h3>
      <p><strong>Name:</strong> ${c.name}</p>
      <p><strong>Issue:</strong> ${c.issue}</p>
      <p><strong>Category:</strong> ${c.category}</p>
      <p><strong>Date:</strong> ${c.date}</p>
    </div>
  `;
}