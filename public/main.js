

document.getElementById("sidebar-toggle").addEventListener("click", function() {
    document.getElementById("sidebar").classList.toggle("sidebar-open");
});

// Function to fetch the student list from the server
function fetchStudentList() {
    fetch('/students')
      .then(response => response.json())
      .then(data => {
        const students = data.students;
        const tableBody = document.getElementById('studentsTableBody');
  
        // Clear existing rows
        tableBody.innerHTML = '';
  
        // Populate table with student data
        students.forEach(student => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${student.idno}</td>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.course}</td>
            <td>${student.level}</td>
            <td>
              <button onclick="deleteStudent('${student.idno}')">Delete</button>
              <button onclick="openUpdateModal('${student.idno}')">Update</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching student list:', error);
      });
  }
  
  // Function to handle student deletion
  function deleteStudent(idno) {
    fetch(`/students/${idno}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
      // Display success message
      alert(data.message);
      
      // Refresh student list
      fetchStudentList();
    })
    .catch(error => {
      console.error("Error deleting student:", error);
      // Display error message
      alert("An error occurred while deleting the student.");
    });
  }
  
  function openUpdateModal(idno) {
    // Fetch student data from server based on idno
    fetch(`/students/${idno}`)
      .then(response => response.json())
      .then(student => {
        // Pre-fill form fields with student data
        document.getElementById('updateIdno').value = student.idno;
        document.getElementById('updateFirstName').value = student.firstName;
        document.getElementById('updateLastName').value = student.lastName;
        document.getElementById('updateCourse').value = student.course;
        document.getElementById('updateLevel').value = student.level;
        
        // Open the modal
        document.getElementById('updateStudentModal').style.display = "block";
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
        alert('Failed to fetch student data');
      });
  }
  
  // Close modal when clicking on the close button
  document.getElementsByClassName("close")[0].addEventListener("click", function() {
    document.getElementById('updateStudentModal').style.display = "none";
  });
  
