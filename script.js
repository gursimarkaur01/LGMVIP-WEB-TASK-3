const submitBtn = document.getElementById("SubmitBtn");
const enrolledData = document.getElementById("enrolledData");

submitBtn.addEventListener("click", function () {
    // Get values from the form fields
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const website = document.getElementById("website").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const dob = document.getElementById("dob").value;
    const address = document.getElementById("address").value;
    const skills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(skill => skill.id);

    const photoInput = document.getElementById("photo");
    const photoFile = photoInput.files[0];
    const photoUrl = photoFile ? URL.createObjectURL(photoFile) : '';

    const userData = {
        name,
        email,
        website,
        gender,
        dob,
        address,
        skills,
        photo: photoUrl
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
        enrolledStudents.forEach((userData, index) => {
            const newRow = document.createElement("tr");
            const imageCell = document.createElement("td");
            const imageElement = document.createElement("img");

            imageCell.innerHTML = `<strong></strong><br>`;
            imageElement.src = userData.photo;
            imageElement.alt = "Student Photo";
            imageElement.className = "student-photo"; 
            imageElement.style.width = "240px"; // Set image width
            imageElement.style.height = "185px"; // Set image height
            imageCell.appendChild(imageElement);

            const descriptionCell = document.createElement("td");
            descriptionCell.className = "description-cell";
            descriptionCell.innerHTML = `
                <strong>Name:</strong> ${userData.name}<br>
                <strong>Email:</strong> ${userData.email}<br>
                <strong>Website:</strong> ${userData.website}<br>
                <strong>Gender:</strong> ${userData.gender}<br>
                <strong>Date of Birth:</strong> ${userData.dob}<br>
                <strong>Address:</strong> ${userData.address}<br>
                <strong>Skills:</strong> ${userData.skills.join(", ")}<br>
                <button class="delete-button" data-index="${index}">Delete</button>
            `;

            newRow.appendChild(imageCell);
            newRow.appendChild(descriptionCell);
            enrolledData.appendChild(newRow);
        });

        const deleteButtons = document.querySelectorAll(".delete-button");
        deleteButtons.forEach(button => {
            button.addEventListener("click", handleDelete);
        });

    }
}
function handleDelete(event) {
    const index = event.target.getAttribute("data-index");
    const savedData = localStorage.getItem("enrolledStudents");
    if (savedData) {
        const enrolledStudents = JSON.parse(savedData);
        enrolledStudents.splice(index, 1); // Remove the selected entry
        localStorage.setItem("enrolledStudents", JSON.stringify(enrolledStudents));
        displayEnrolledStudents(); // Refresh the displayed list
    }
}
displayEnrolledStudents();