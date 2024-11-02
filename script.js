// Simple login function
function login() {
    const username = document.getElementById("username").value.toLowerCase();
    if (username === "patient") {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("patient-screen").style.display = "block";
        loadPatientQueueDetails();
    } else if (username === "receptionist") {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("receptionist-screen").style.display = "block";
    } else {
        alert("Invalid login. Try 'patient' or 'receptionist' as username.");
    }
}

// Go back to login screen
function goBack() {
    document.getElementById("login-screen").style.display = "block";
    document.getElementById("patient-screen").style.display = "none";
    document.getElementById("receptionist-screen").style.display = "none";
}

// Patient options
function rescheduleAppointment() {
    const newDate = prompt("Enter new date (e.g., March 30, 2023):", "March 30, 2023");
    const newTime = prompt("Enter new time (e.g., 2:00 PM):", "2:00 PM");
    if (newDate && newTime) {
        document.getElementById("appointment-date").innerText = newDate;
        document.getElementById("appointment-time").innerText = newTime;
        alert("Appointment rescheduled to " + newDate + " at " + newTime);
        notifyReceptionist("Patient rescheduled appointment to " + newDate + " at " + newTime);
    }
}

function cancelAppointment() {
    if (confirm("Are you sure you want to cancel your appointment?")) {
        document.getElementById("appointment-details").innerHTML = "<p>Your appointment has been canceled.</p>";
        notifyReceptionist("Patient canceled their appointment.");
    }
}

function waitAppointment() {
    alert("You have chosen to wait. We will notify you if any changes occur.");
}

// Receptionist functions
function addAppointment() {
    const patientName = document.getElementById("patientName").value;
    const appointmentDate = document.getElementById("appointmentDate").value;
    const appointmentTime = document.getElementById("appointmentTime").value;
    const queuePosition = document.getElementById("queuePosition").value;
    const estimatedWaitTime = document.getElementById("estimatedWaitTime").value;

    if (patientName && appointmentDate && appointmentTime && queuePosition && estimatedWaitTime) {
        const appointmentList = document.getElementById("appointment-list");
        const listItem = document.createElement("li");
        
        listItem.innerHTML = `${patientName} - ${appointmentDate} at ${appointmentTime} 
            (Queue Position: ${queuePosition}, Estimated Wait: ${estimatedWaitTime} mins)`;
        appointmentList.appendChild(listItem);
        
        updatePatientQueue(queuePosition, estimatedWaitTime);
        alert("Appointment added successfully.");
        document.getElementById("appointment-form").reset();
    } else {
        alert("Please fill in all fields.");
    }
}

function updatePatientQueue(queuePosition, estimatedWaitTime) {
    document.getElementById("queue-position").innerText = queuePosition;
    document.getElementById("wait-time").innerText = estimatedWaitTime + " mins";
    notifyPatient(`Your updated queue position is ${queuePosition}, with an estimated wait time of ${estimatedWaitTime} minutes.`);
}

// Notify receptionist of patient action
function notifyReceptionist(message) {
    console.log("Notification to Receptionist:", message);
}

// Notify patient of receptionist action
function notifyPatient(message) {
    console.log("Notification to Patient:", message);
}

// Load patient queue details (simulate data retrieval)
function loadPatientQueueDetails() {
    // This could fetch real-time data in a fully implemented version
    document.getElementById("queue-position").innerText = "5";
    document.getElementById("wait-time").innerText = "15 mins";
}
