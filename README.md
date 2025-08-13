# CrudClinic

Expertsoft is a RESTful API and web application for managing bills, transaction, clients and related data. Built with Node.js, Express, and PostgreSQL, it provides endpoints for CRUD operations and CSV data import, along with a simple frontend for user interaction.

## Autor

   Juan Esteban Sepulveda
   Bernes Lee
   sepesteban01@gmail.com

## Features

- Bill creation, listing, and deletion
- Bill management (API structure in place)
- CSV file upload for bulk data import
- PostgreSQL database integration
- Modular code structure (controllers, models, routes)
- JSDoc documentation throughout the codebase
- Simple frontend for patients and appointments

## Project Structure

```
ExpertSoft/
├── app.js                # Main server file
├── package.json          # Project dependencies and scripts
├── .env                  # Environment variables
├── app/
│   ├── controllers/      # Route handler logic
│   ├── models/           # Database queries
│   ├── routes/           # Express routers
├── config/
│   └── db_conn.js        # PostgreSQL connection setup
├── DB/                   # SQL schema, views, and ERD
├── docs/                 # Documentation and sample CSV files
├── public/
│   ├── index.html        # Main page
│   ├── uploadCSV.html    # CSV upload page
│   └── js/               # Frontend scripts
└── uploads/              # Folder where csv will be temporally stored
```

## Setup Instructions

1. **Clone the repository**
   ```
   git clone <repo-url>
   cd ExpertSoft
   ```
2. **Install dependencies**
   ```
   npm install
   ```
3. **Configure environment variables**
   - Copy `.env.example` (if available) to `.env` and set your PostgreSQL credentials:
     ```
     Example:
     DB_HOST=localhost
     DB_PORT=5432
     DB_USER=youruser
     DB_PASSWORD=yourpassword
     DB_NAME=yourdbname
     PORT=3042
     ```
4. **Set up the database**
   - Use the SQL files in `DB/` to create tables, views, and procedures in your PostgreSQL database.
5. **Start the server**
   ```
   npm start
   ```
6. **Access the app**
   - Frontend: [http://localhost:3043](http://localhost:3043)
   - API endpoints: `/api/bills`, `/api/file`, etc.

## API Endpoints

- `POST /api/bills` - Register a new bill
- `GET /api/bills` - List all bills
- `GET /api/patients/email/:email` - Get patient by email -- Not implemented
- `GET /api/bills/:id` - Get appointment by ID -- Not implemented
- `DELETE /api/bills/:id` - Delete bill
- `POST /api/file` - Upload CSV file for bulk import (requires `table` query param)

## Frontend

- Simple HTML pages for login, registration, appointment management, and CSV upload
- JavaScript files in `public/js/` handle form submissions and API requests

## CSV Import

- Upload CSV files via `/uploadCSV.html` to import data into specified tables
- Sample CSV files are available in `docs/files/`

## Documentation

- JSDoc comments are present throughout the codebase for better IDE support
- SQL schema and ERD diagrams are available in the `DB/` folder

## Contributing

Pull requests and suggestions are welcome! Please follow best practices and add JSDoc comments to new code.

## License

This project is for educational purposes. See the repository for license details.
