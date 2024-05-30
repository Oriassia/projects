const url = "http://localhost:8001";


document.getElementById("add-user-form").onsubmit = async function (event) {
    event.preventDefault();
    await addUser();
  };

  document.getElementById("delete-user-form").onsubmit = async function (event) {
    event.preventDefault();
    await deleteUser();
  };

  async function addUser() {
    const firstnameValue = document.getElementById("user-first-name-value").value;
    const lastnameValue = document.getElementById("user-last-name-value").value;

    try {
      await axios.post(`${url}/users`, {
        firstname: firstnameValue,
        lastname: lastnameValue,
      });
      alert("user added successfully!");
      document.getElementById("add-user-form").reset();
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. Please try again.");
    }
  }

async function deleteUser(){
    const userInputId = document.getElementById("user-id-value").value;

    try {
      const usersData = await axios.get(`${url}/users`);
      const usersArray = usersData.data;
      const userIdToDelete = usersArray[Number(userInputId)-1].id

      if (userIdToDelete) {
        await axios.delete(`${url}/users/${userIdToDelete}`);
        alert("user deleted successfully!");
        document.getElementById("delete-user-form").reset();
      } else {
        alert("user ID not found.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
}





















//////////////////////
async function addUser(){
    const firstNameValue = document.getElementById("user-first-name-value").value
    const lastNameValue = document.getElementById("user-last-name-value").value
    await axios.post(`${url}/users`,
        {
            firstname: firstNameValue,
            lastname: lastNameValue
        }
    )
}

async function deleteUser(){
    const userIdValue = document.getElementById("user-id-value").value
    const response = await axios.get(`${url}/users`);
    const users = response.data;
    const userId = users[Number(userIdValue)-1].id
    await axios.delete(`${url}/users/${userId}`)
}

async function printUsersTable() {
    try {
        const response = await axios.get(`${url}/users`);
        const users = response.data;

        // Clear the existing table rows
        const usersTableElem = document.getElementById("users-table")
        usersTableElem.innerHTML = "";

        // Create table header
        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Books</th>   
        `;
        // add bocks@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        usersTableElem.appendChild(headerRow);

        // Append user data to the table
        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${users.indexOf(user)+1}</td>
                <td>${user.firstname}</td>
                <td>${user.lastname}</td>
            `;
            usersTableElem.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}