

document.getElementById("sidebar-toggle").addEventListener("click", function() {
    document.getElementById("sidebar").classList.toggle("sidebar-open");
});


function fetchStudentList() {
    fetch('/students')
      .then(response => response.json())
      .then(data => {
        const students = data.students;
        const tableBody = document.getElementById('studentsTableBody');
  
        
        tableBody.innerHTML = '';
  
        
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
  
  
  function deleteStudent(idno) {
    fetch(`/students/${idno}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
      
      alert(data.message);
      
      
      fetchStudentList();
    })
    .catch(error => {
      console.error("Error deleting student:", error);
      
      alert("An error occurred while deleting the student.");
    });
  }
  
  function openUpdateModal(idno) {
    
    fetch(`/students/${idno}`)
      .then(response => response.json())
      .then(student => {
        
        document.getElementById('updateIdno').value = student.idno;
        document.getElementById('updateFirstName').value = student.firstName;
        document.getElementById('updateLastName').value = student.lastName;
        document.getElementById('updateCourse').value = student.course;
        document.getElementById('updateLevel').value = student.level;
        
        
        document.getElementById('updateStudentModal').style.display = "block";
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
        alert('Failed to fetch student data');
      });
  }
  
  
  document.getElementsByClassName("close")[0].addEventListener("click", function() {
    document.getElementById('updateStudentModal').style.display = "none";
  });
  
