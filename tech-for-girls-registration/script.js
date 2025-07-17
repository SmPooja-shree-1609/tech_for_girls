let count = 0;
let counterText = document.getElementById('counterText');
let whatsappBtn = document.getElementById('whatsappShare');
let submitBtn = document.getElementById('submitBtn');
let form = document.getElementById('registrationForm');
let message = document.getElementById('message');

if(localStorage.getItem("submitted")) {
    disableForm();
}

whatsappBtn.onclick = () => {
    if(count < 5){
        count++;
        counterText.textContent = `Click count: ${count}/5`;
        window.open(`https://wa.me/?text=Hey%20Buddy%2C%20Join%20Tech%20For%20Girls%20Community`);
        if(count == 5){
            counterText.textContent = "Sharing complete. Please continue.";
        }
    }
};

form.onsubmit = async (e) => {
    e.preventDefault();
    if(count < 5){
        alert("Please complete sharing on WhatsApp (5/5) before submitting.");
        return;
    }

    // Form data
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    let college = document.getElementById('college').value;
    let screenshot = document.getElementById('screenshot').files[0];

    // Upload file to Google Drive (or use direct Google Sheets script if using blob)
    // Here we just simulate
    let screenshotLink = screenshot ? screenshot.name : "";

    // Send to Google Sheets
    await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
        method: "POST",
        body: JSON.stringify({name, phone, email, college, screenshotLink}),
        headers: {"Content-Type": "application/json"}
    });

    localStorage.setItem("submitted", true);
    disableForm();
    message.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
};

function disableForm(){
    document.querySelectorAll('input, button').forEach(el => el.disabled = true);
}
