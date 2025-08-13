
/**
 * Handles the CSV upload form submission and sends the file to the server.
 */
const form = document.getElementById('csvForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    /**
     * Collects form data and sends a POST request to upload a CSV file.
     * @param {Event} e - Form submit event
     */
    const tableName = document.getElementById('tableName').value.trim();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`http://localhost:3043/api/file/?table=${tableName}`, {
            method: 'POST',
            body: formData
        }); 

        alert("File loaded successfully")
    } catch (error) {
        console.error('Upload error:', error);
        alert("Error uploading file: " + error.message);
    }
});
