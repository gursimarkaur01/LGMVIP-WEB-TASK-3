const submitBtn = document.getElementById("submitBtn");
const displayArea = document.getElementById("displayArea");
const localStorage = [];
const enrolledData = document.getElementById("enrolledData");

function displayEnrolledStudents(){
    enrolledData.innerHTML="";

    const savedUserData = localStorage.getItem("userData");
    if(savedUserData){
        const userData = JSON.parse(savedUserData);
        const newRow = document.createElement("tr");
        const imageCell = document.createElement("td");
        const imageElement = document.createElement("img");
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
            <strong>Skills:</strong> ${userData.skills.join(", ")}
        `;

        newRow.appendChild(imageCell);
        newRow.appendChild(descriptionCell);
        enrolledData.appendChild(newRow);
    }
}

/*
function displayUserData(userData) {
    const displayHTML = `
            <h2>Enrolled Student Information</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Website:</strong> ${website}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Date of Birth:</strong> ${dob}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Skills:</strong> ${skills.join(", ")}</p>
            <p><strong>Photo:</strong> ${photo}</p>
        `;
    displayArea.innerHTML = displayHTML;
}*/
submitBtn.addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const website = document.getElementById("website").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const dob = document.getElementById("dob").value;
    const address = document.getElementById("address").value;
    const skills = Array.from(document.querySelectorAll('input[name="skill"]:checked')).map(skill => skill.value);
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
    localStorage.setItem("userData", JSON.stringify(userData));
    displayEnrolledStudents();
});

displayEnrolledStudents();
/*function displayUserData(userData){
    const displayHTML = `
            <h2>Enrolled Student Information</h2>
            <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Website:</strong> ${website}</p>
                <p><strong>Gender:</strong> ${gender}</p>
                <p><strong>Date of Birth:</strong> ${dob}</p>
                <p><strong>Address:</strong> ${address}</p>
                <p><strong>Skills:</strong> ${skills.join(", ")}</p>
                <p><strong>Photo:</strong> ${photo}</p>
            `;
    displayArea.innerHTML = displayHTML;
}*/
const savedUserData = localStorage.getItem("userData");
if (savedUserData) {
    const userData = JSON.parse(savedUserData);
    displayUserData(userData);
    //submitBtn.click();
}

function displayRegistrations() {
    const enrolledTable = document.getElementById("enrolledTable");
    enrolledTable.innerHTML = ""; // Clear the entire table
}