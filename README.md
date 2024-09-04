# Certificate Generator

This project is a Node.js application that generates certificates based on user input. It includes an API endpoint for certificate generation and a web interface to collect user data.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Docker Setup](#docker-setup)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- Generate certificates based on user input.
- Web interface to collect input and validate user data.
- API endpoint to handle certificate generation.
- Responsive and user-friendly UI.
- Dockerized for easy deployment.

## Technologies Used
- Node.js v14.15.2
- Express.js
- Puppeteer (for generating certificates)
- Docker
- HTML, CSS, JavaScript (for frontend)

## Installation

### Prerequisites
- Node.js v14.15.2
- npm
- Docker (if using Docker)

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/certificate-generator.git
    cd certificate-generator
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Run the application:
    ```bash
    node index.js
    ```

## Usage

### Running Locally
- After starting the application, navigate to `http://localhost:3000` in your browser.
- Fill in the form with the required details and submit to generate a certificate.

### Docker Setup
1. Build the Docker image:
    ```bash
    docker build -t certificate-generator .
    ```

2. Run the Docker container:
    ```bash
    docker run -p 3000:3000 certificate-generator
    ```

3. Access the application:
    - Open `http://localhost:3000` in your web browser.

## API Endpoints

### `POST /downloadCertificate`
- **Description**: Generates a certificate based on the provided input.
- **Request Body**:
    ```json
    {
      "organizationName": "Institute Name",
      "title": "Mr.",
      "name": "John Doe",
      "competitionName": "Coding Challenge",
      "eventDate": "2024-09-23T00:00:00Z",
      "eventName": "Hackathon",
      "certificateType": "individual"
    }
    ```
- **Response**: Returns a URL to download the generated certificate.

## Contributing
Contributions are welcome! Please create a pull request or open an issue to discuss your ideas or bugs.
