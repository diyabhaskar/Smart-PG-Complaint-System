async function addComplaint(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const issue = document.getElementById("issue").value.trim();
    const category = document.getElementById("category").value;
    const dataContainer = document.getElementById("data");

    if (!name || !issue || !category) {
        alert("Please fill all fields");
        return;
    }

    const complaintData = { name, issue, category };

    try {
        const response = await fetch('/api/complaints', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(complaintData)
        });

        if (response.ok) {
            const now = new Date();
            const dateTimeString = now.toLocaleDateString() + " | " + now.toLocaleTimeString();

            const complaintHTML = `
                <div id="success-message" style="color: #111212; font-weight: bold; margin-bottom: 10px; text-align: center;">
                    ✅ Complaint registered successfully!
                </div>
                <div class="card" id="temp-card">
                    <h3>Complaint Received</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Category:</strong> ${category}</p>
                    <p><strong>Issue:</strong> ${issue}</p>
                    <p><strong>Date & Time:</strong> ${dateTimeString}</p>
                </div>
            `;

            dataContainer.innerHTML = complaintHTML;

            document.getElementById("name").value = "";
            document.getElementById("issue").value = "";
            document.getElementById("category").selectedIndex = 0;

            setTimeout(() => {
                dataContainer.innerHTML = "";
            }, 5000);

        } else {
            const errData = await response.json();
            alert("Server error: " + (errData.error || "Unknown error"));
        }

    } catch (error) {
        console.error("Connection Error:", error);
        alert("Failed to connect to the server.");
    }
}
