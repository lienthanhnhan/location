# NestJS Location API

This is a simple RESTful API project built with NestJS that allows users to manage locations. It provides endpoints for creating, updating, and deleting locations.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:lienthanhnhan/location.git
   ```

2. Navigate to the project directory:

   ```bash
   cd location
   ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Copy the .env.example file and rename it to .env and then update the .env file with your database configuration:

    ```bash
    cp .env.example .env
    ```

5. Run migration:

   ```bash
   npm migration:run
   ```

## Usage

1. Start the server:

   ```bash
   npm run start:dev
   ```

2. The server should now be running at `http://localhost:3000`.

## API Endpoints

The following endpoints are available:

- `POST /location`: Create new location.
- `PUT /location/:id`: Update an available location.
- `DELETE /location/:id`: Remove created location data along with any related references.

For detailed information on each endpoint, including request and response formats, refer to the Swagger documentation at `http://localhost:3000/api`.

## Testing

To run the tests, use the following command:

```bash
npm test
```

## License

This project is licensed under the [MIT License](LICENSE).
```
Feel free to customize this README.md file according to your project's specific requirements and features. You can add more sections, provide additional information, or adjust the instructions as needed.
```