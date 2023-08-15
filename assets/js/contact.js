function sendMail(contactForm) {
    emailjs.send("service_ychndgu", "template_qcpo4di", {
        "from_name": contactForm.fullName.value,
        "message": contactForm.message.value,
        "from_email": contactForm.email.value
    })
    .then(function(response) {
        console.log("Email sent successfully:", response);
        // Hide the form
        document.getElementById("contactForm").style.display = "none";
        // Show the thank-you message
        document.getElementById("thankYouMessage").style.display = "block";
    }, function(error) {
        console.log("Email sending failed:", error);
    });
    return false;
}