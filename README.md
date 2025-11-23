# Serverless Employee Management System

A web-based employee management system built using AWS serverless architecture.

## Overview

This system allows you to manage employee records through a simple web interface, with data stored in DynamoDB and processed via AWS Lambda functions.

### Features

- Add new employees with validation
- View all employees in a table format
- Serverless architecture
- Real-time data updates
- Form validation for all fields

### Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** AWS Lambda (Python)
- **Database:** Amazon DynamoDB
- **API:** Amazon API Gateway
- **Hosting:** Amazon S3 (Static website)

## Project Structure

```
employee-management/
├── index.html                  # Frontend HTML file and CSS styling
├── script.js                   # Frontend JavaScript
├── lambda/                     # AWS Lambda functions
│   ├── get_employees.py        # GET endpoint handler
│   └── post_employee.py        # POST endpoint handler
└── README.md                   # Project documentation
```

## Setup Instructions

### 1. DynamoDB Setup

1. Create a new DynamoDB table:
   - Table name: `employeeData`
   - Primary key: `employeeid` (String)

### 2. Lambda Functions Setup

1. Create two Lambda functions:
   - `get_employees`: Retrieves all employees
   - `post_employee`: Adds new employee records
2. Use the Python code provided in the `lambda/` directory
3. Configure IAM roles with DynamoDB access

### 3. API Gateway Setup

1. Create a new REST API
2. Set up two endpoints:
   - GET `/employees`
   - POST `/employees`
3. Enable CORS
4. Deploy the API and note the endpoint URL

### 4. Frontend Setup

1. Update `script.js` with your API Gateway endpoint
2. Upload frontend files to S3 bucket
3. Enable static website hosting
4. Configure bucket policy for public access

## Usage

### Adding an Employee

1. Fill in the employee details:
   - Employee ID (alphanumeric)
   - Name (letters only)
   - Department (letters only)
   - Salary (numbers only)
2. Click "Save Employee"
3. Validation errors will display if inputs are incorrect

### Viewing Employees

1. Click "View Employees"
2. Table will display all employee records
3. Empty state handled when no records exist

## API Endpoints

### GET /employees

Returns all employees

Response format:
```json
[
  {
    "employeeid": "EMP101",
    "name": "John Doe",
    "department": "IT",
    "salary": "50000"
  }
]
```

### POST /employees

Adds a new employee

Request format:
```json
{
  "employeeid": "EMP101",
  "name": "John Doe",
  "department": "IT",
  "salary": "50000"
}
```

## Development

### Prerequisites

- AWS Account
- AWS CLI configured
- Basic knowledge of AWS services
- Text editor
- Web browser

### Local Testing

1. Use S3 website endpoint for testing
2. Check browser console for API errors
3. Verify DynamoDB records through AWS Console

## Security Considerations

- API Gateway endpoints are public
- DynamoDB access restricted via IAM
- CORS enabled for frontend domain
- S3 bucket configured for static website hosting

## Troubleshooting

Common issues and solutions:

1. CORS errors
   - Verify API Gateway CORS configuration
   - Check allowed origins

2. API Gateway 500 errors
   - Check Lambda function logs
   - Verify DynamoDB permissions

3. Form validation errors
   - Ensure inputs match required formats
   - Check browser console for JavaScript errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contact

For questions or support, please open an issue in the repository.