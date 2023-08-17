const submitBtn = document.getElementById("SubmitBtn"); // Note the case-sensitive ID
const enrolledData = document.getElementById("enrolledData");

submitBtn.addEventListener("click", function () {
    // Get values from the form fields
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const website = document.getElementById("website").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const dob = document.getElementById("dob").value;
    const address = document.getElementById("address").value;
    const skills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(skills => skills.id);
    const photo = document.getElementById("photo").value;

    const userData = {
        name,
        email,
        website,
        gender,
        dob,
        address,
        skills,
        photo
    };
    
    // Retrieve previously saved data from local storage
    const savedData = localStorage.getItem("enrolledStudents");
    let enrolledStudents = savedData ? JSON.parse(savedData) : [];

    // Add current user data to the array
    enrolledStudents.push(userData);

    // Store the updated array back in local storage
    localStorage.setItem("enrolledStudents", JSON.stringify(enrolledStudents));

    // Clear form fields
    document.getElementById("RegistrationForm").reset();

    // Display enrolled students
    displayEnrolledStudents();
});

function displayEnrolledStudents() {
    enrolledData.innerHTML = "";

    const savedData = localStorage.getItem("enrolledStudents");
    if (savedData) {
        const enrolledStudents = JSON.parse(savedData);
        enrolledStudents.forEach(userData => {
            const newRow = document.createElement("tr");
            const imageCell = document.createElement("td");
            const imageElement = document.createElement("img");
            imageCell.innerHTML=`<strong>photo:</strong><br>`
            imageElement.src = userData.photo;
            imageElement.alt = "Student Photo";
            imageCell.appendChild(imageElement);

            const descriptionCell = document.createElement("td");
            descriptionCell.innerHTML = `
            <strong>Name:</strong> ${userData.name}<br>
            <strong>Email:</strong> ${userData.email}<br>
            <strong>Website:</strong> ${userData.website}<br>
            <strong>Gender:</strong> ${userData.gender}<br>
            <strong>Date of Birth:</strong> ${userData.dob}<br>
            <strong>Address:</strong> ${userData.address}<br>
            <strong>Skills:</strong> ${userData.skills.join(", ")}<br>
        `;

            newRow.appendChild(imageCell);
            newRow.appendChild(descriptionCell);
            enrolledData.appendChild(newRow);
        });
    }
}

displayEnrolledStudents();
