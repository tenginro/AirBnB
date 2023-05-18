# HereBnB

HereBnB is an AirBnb clone project.
Check out [HereBnB] (https://herebnb.onrender.com/)

##Index

[MVP Feature List](https://github.com/tenginro/AirBnB/wiki/Feature-Doc) |
[Database Scheme](https://github.com/tenginro/AirBnB/wiki/Database-schema) |
[Backend Routes & Data Structure](https://github.com/tenginro/AirBnB/wiki/API-doc) |

## Technologies Used

<img src="https://img.shields.io/badge/Python-3.9-blue?style=for-the-badge&logo=python&logoColor=white" /><img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" /><img src="https://img.shields.io/badge/Render-41B883?style=for-the-badge&logo=render&logoColor=white)" />

## Home Page/Spots

![Screenshot 2023-05-10 at 16 35 12](https://github.com/tenginro/AirBnB/assets/108156588/f3dee54b-c6de-49c4-b29a-4c298d443fd9)

## Spot Detail page with reviews

![Screenshot 2023-05-10 at 16 18 59](https://github.com/tenginro/AirBnB/assets/108156588/b7f60722-28d4-44e5-a565-c485e0c96bd6)

## Getting started

To launch the full application locally, please perform the following steps:

1. Clone this repository:

   `https://github.com/tenginro/AirBnB.git`

2. Install dependencies into the Backed and the Frontend by making a terminal for each one and then run the following:
   - cd into backend folder, run `npm install`
   - create an .env file in the backend folder with PORT=8000,DB_FILE=db/dev.db
   - run `npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all` to seed data
   - run `npm start` in the backend folder
   - cd into frontend folder, run `npm install`
   - add `"proxy": "http://localhost:8000"` at the end of the package.json file in the frontend folder
   - run `npm start` in the frontend folder

# Features

## Spots

- Logged-in Users can create a Spot
- Users can read/view other Spots
- Logged-in Users can update their Spots
- Logged-in Users can delete their Spots

## Reviews

- Logged-in Users can create a Review
- Users can read/view other Reviews
- Logged-in Users can update their Reviews
- Logged-in Users can delete their Reviews

## Bookings

- Logged-in Users can create a Booking
- Users can read/view dates that are booked
- Logged-in Users can update their Bookings
- Logged-in Users can delete their Bookings
