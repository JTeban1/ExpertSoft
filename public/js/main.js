// Load All Bills button
const loadAllAppointmentsBtn = document.getElementById('loadAllAppointmentsBtn');
if (loadAllAppointmentsBtn) {
    loadAllAppointmentsBtn.addEventListener('click', function () {
        renderBills();
    });
}
// Search by Client ID
const searchPatientForm = document.getElementById('searchPatientForm');
if (searchPatientForm) {
    searchPatientForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const clientId = document.getElementById('search_patient_id').value;
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';
        try {
            const response = await fetch(`http://localhost:3043/api/bills/client/${clientId}`);
            if (!response.ok) throw new Error('No clients found');
            const bills = await response.json();
            if (bills.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="12" class="text-center">No bills found for this client.</td></tr>';
            } else {
                bills.forEach(bill => {
                    tableBody.innerHTML += `<tr>
                        <td>${bill.id_bill}</td>
                        <td>${bill.bill_quarter.substring(0, 7)}</td>
                        <td>${bill.amount_billed}</td>
                        <td>${bill.amount_paid}</td>
                        <td>${bill.client_name}</td>
                        <td>${bill.payment_method_name}</td>
                        <td>${bill.id_transaction}</td>
                        <td>
                        <td><button class="btn btn-warning edit-btn" data-id="${bill.id_appointment}">Edit</button></td>
                        <td><button class="btn btn-danger delete-btn" data-id="${bill.id_appointment}">Delete</button></td>
                    </tr>`;
                });
            }
            // Hide modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('searchPatientModal'));
            if (modal) modal.hide();
        } catch (error) {
            tableBody.innerHTML = `<tr><td colspan="12" class="text-center text-danger">${error.message}</td></tr>`;
        }
    });
}

// Search by Appointment ID
const searchAppointmentForm = document.getElementById('searchAppointmentForm');
if (searchAppointmentForm) {
    searchAppointmentForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const appointmentId = document.getElementById('search_appointment_id').value;
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';
        try {
            const response = await fetch(`http://localhost:3042/api/appointments/${appointmentId}`);
            if (!response.ok) throw new Error('Appointment not found');
            const app = await response.json();
            if (!app || !app.id_appointment) {
                tableBody.innerHTML = '<tr><td colspan="12" class="text-center">No appointment found with this ID.</td></tr>';
            } else {
                tableBody.innerHTML = `<tr>
                        <td>${app.id_appointment}</td>
                        <td>${app.appointment_date.substring(0, 10)}</td>
                        <td>${app.appointment_time.substring(0, 5)}</td>
                        <td>${app.reason}</td>
                        <td>${app.description}</td>
                        <td>${app.location_name}</td>
                        <td>${app.payment_method_name}</td>
                        <td>${app.appointment_status}</td>
                        <td>${app.patient_name}</td>
                        <td>${app.medic_name}</td>
                        <td><button class="btn btn-warning edit-btn" data-id="${app.id_appointment}">Edit</button></td>
                        <td><button class="btn btn-danger delete-btn" data-id="${app.id_appointment}">Delete</button></td>
                    </tr>`;
            }
            // Hide modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('searchAppointmentModal'));
            if (modal) modal.hide();
        } catch (error) {
            tableBody.innerHTML = `<tr><td colspan="12" class="text-center text-danger">${error.message}</td></tr>`;
        }
    });
}

/**
 * Insert Bill.
 */
const billForm = document.getElementById('appointmentForm');

if (billForm) {
    billForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Validate required fields
        const requiredFields = [
            'bill_quarter', 'amount_billed', 'amount_paid', 'id_client',
            'id_payment_method', 'id_transaction'
        ];
        let hasEmpty = false;
        requiredFields.forEach(field => {
            const el = billForm.querySelector(`[name="${field}"]`);
            if (!el || el.value.trim() === '') {
                hasEmpty = true;
                el && el.classList.add('is-invalid');
            } else {
                el.classList.remove('is-invalid');
            }
        });
        if (hasEmpty) {
            alert('Please fill in all fields.');
            return;
        }

        const formData = new FormData(billForm);
        let data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        try {
            const response = await fetch('http://localhost:3043/api/bills', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Optionally close the modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('appointmentModal'));
            if (modal) modal.hide();

            billForm.reset();

            // Refresh appointments table
            renderBills();
        } catch (error) {
            console.error('Error while creating bill:', error);
        }
    });
}


/**
 * Fetches and renders appointments in the table body.
 * @async
 * @returns {Promise<void>}
 */
async function renderBills() {
    const response = await fetch(`api/bills`);
    const appointments = await response.json();

    const tableBody = document.getElementById('tableBody');

    appointments.forEach(bill => {
        tableBody.innerHTML += `
            <tr>
                <td>${bill.id_bill}</td>
                <td>${bill.bill_quarter.substring(0, 7)}</td>
                <td>${bill.amount_billed}</td>
                <td>${bill.amount_paid}</td>
                <td>${bill.client_name}</td>
                <td>${bill.payment_method_name}</td>
                <td>${bill.id_transaction}</td>
                <td>
                    <button class="btn btn-warning edit-btn" data-id="${bill.id_bill}">Edit</button>
                </td>
                <td>
                    <button class="btn btn-danger delete-btn" data-id="${bill.id_bill}">Delete</button>
                </td>
            </tr>
        `
    });
    // Handle Edit button click
    document.addEventListener('click', async function (e) {
        if (e.target.classList.contains('edit-btn')) {
            const id = e.target.getAttribute('data-id');
            // Fetch appointment data
            const response = await fetch(`http://localhost:3043/api/bills/${id}`);
            const bill = await response.json();
            // Prefill modal form
            document.getElementById('edit_id_bill').value = bill.id_bill;
            document.getElementById('edit_bill_quarter').value = bill.bill_quarter.substring(0, 7);
            document.getElementById('edit_amount_billed').value = bill.amount_billed;
            document.getElementById('edit_amount_paid').value = bill.amount_paid;;
            // Prefill selects for location, payment method, status with integer IDs
            const paymentMethodSelect = document.getElementById('edit_payment_method_name');
            if (paymentMethodSelect) {
                Array.from(paymentMethodSelect.options).forEach(opt => {
                    opt.selected = (opt.value == bill.id_payment_method);
                });
            }
            const patientInput = document.getElementById('edit_id_client');
            if (patientInput) patientInput.value = bill.id_client !== undefined ? bill.id_client : '';
            const medicInput = document.getElementById('edit_id_transaction');
            if (medicInput) medicInput.value = bill.id_transaction !== undefined ? bill.id_transaction : '';
            // Show modal
            const modal = new bootstrap.Modal(document.getElementById('editAppointmentModal'));
            modal.show();
        }
    });

    // Handle Edit form submit
    const editBillForm = document.getElementById('editAppointmentForm');
    if (editBillForm) {
        editBillForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const requiredFields = [
                'edit_bill_quarter', 'edit_amount_billed', 'edit_amount_paid', 'edit_id_client',
                'edit_payment_method_name', 'edit_id_transaction'
            ];
            let hasEmpty = false;
            requiredFields.forEach(field => {
                const el = document.getElementById(field);
                if (!el || el.value.trim() === '') {
                    hasEmpty = true;
                    el && el.classList.add('is-invalid');
                } else {
                    el.classList.remove('is-invalid');
                }
            });
            if (hasEmpty) {
                alert('Please fill in all fields.');
                return;
            }
            const id = document.getElementById('edit_id_bill').value;
            let data = {
                bill_quarter: document.getElementById('edit_bill_quarter').value,
                amount_billed: document.getElementById('edit_amount_billed').value,
                amount_paid: document.getElementById('edit_amount_paid').value,
                id_client: document.getElementById('edit_id_client').value,
                id_payment_method: document.getElementById('edit_payment_method_name').value,
                id_transaction: document.getElementById('edit_id_transaction').value,
            };
            // Convert empty string to null for integer fields
            if (data.id_client === "") data.id_client = null;
            if (data.id_payment_method === "") data.id_payment_method = null;
            if (data.id_transaction === "") data.id_transaction = null;
            try {
                const response = await fetch(`http://localhost:3043/api/bills/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                if (!response.ok) throw new Error('Failed to update bill', Error);
                // Hide modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('editAppointmentModal'));
                if (modal) modal.hide();
                renderBills();
            } catch (error) {
                console.error('Error updating bill:', error);
            }
        });
    }

    // Handle Delete button click
    let deleteId = null;
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) {
            deleteId = e.target.getAttribute('data-id');
            const modal = new bootstrap.Modal(document.getElementById('deleteAppointmentModal'));
            modal.show();
        }
    });

    // Handle Delete confirmation
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', async function () {
            if (!deleteId) return;
            try {
                const response = await fetch(`http://localhost:3043/api/bills/${deleteId}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error('Failed to delete bill');
                // Hide modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('deleteAppointmentModal'));
                if (modal) modal.hide();
                renderBills();
            } catch (error) {
                console.error('Error deleting bill:', error);
            }
        });
    }
}

renderBills();