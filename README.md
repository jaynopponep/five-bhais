# Five Bhais

## Description
In the Five Bhais project, we implemented NextJS, MongoDB Atlas, and Flask in order to demonstrate a restaurant web application that is able to display the menu to all online surfers, but allow only the customers to be able to order food from our website; at the same time, customers can choose to place a reservation to dine-in, order pickup, or place a delivery order. In the future, we will implement the functionality of being able to rank the highest rated dishes, and have a system that helps delivery drivers track their orders and allow them to confirm that their delivery was complete. 

## Setup Instructions
Requirements: [Node.js](https://nodejs.org/en/download/) and [Python](https://www.python.org/downloads/)

### Running the project
#### Frontend
1. Navigate to the `client` directory.
2. Install the frontend dependencies via `npm install`.
3. Run the frontend server via `npm run dev`.

#### Backend
1. Create and activate a python virtual environment. This can be done through the following commands.
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```
2. Download the required python packages using:    
    ```bash
    pip install -r requirements.txt
    ```
3. Run the backend server by first navigating to server directory.
    ```bash
    cd server
    python server.py
    ```

### Technologies Used
Frontend: NextJS </br>
Backend: Flask & MongoDB Atlas, including the pymongo library for building API endpoints

### Contributors:
- [Abdul Andha](https://github.com/Abdul-Andha)
- [Jay Noppone](https://github.com/jaynopponep)
- [Abrar Habib](https://github.com/dddictionary)
- [Meftahul Ahsan](https://github.com/meftahul1)
- [Baljinder Hothi](https://github.com/BaljinderHothi)
