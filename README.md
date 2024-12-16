# Cloud File Storage System

A simple cloud-based file storage system that allows users to upload, download, and manage their files on AWS S3.

## Tech Stack
- Node.js
- AWS S3
- JWT Authentication

## Features
- User authentication
- File upload and download
- File listing and management

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/cloud-file-storage-system.git
    ```

2. Install dependencies:
    ```bash
    cd cloud-file-storage-system/backend
    npm install
    ```

3. Create a `.env` file in the backend directory with your AWS keys and JWT secret:
    ```env
    JWT_SECRET=your_jwt_secret_key
    AWS_ACCESS_KEY_ID=your_aws_access_key
    AWS_SECRET_ACCESS_KEY=your_aws_secret_key
    ```

4. Run the server:
    ```bash
    node server.js
    ```

5. Open the `frontend/index.html` in your browser to interact with the cloud storage system.

## License
MIT
