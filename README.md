# simple-app-nest-angular-chart.js

Assume a scenario when a customer support team wants to manage a customer database and provide rain forecast in upcoming days.

- The web-based application developed with Nest (a node JS framework) for the server-side and Angular JS for the client-side.
- Chart JS is used for data visualization. 
- The application supports create/update'delete records for customers and generate forecasting report based on location using OpenWeatherMap API. 
- DockerFile has been added and the application can run as a docker container.
- Swagger has been added for Nest API documentation.


To run the nest js app in watch mode:
npm run start:dev

To start the angular app:
ng serve

To run the app as a docker container:
docker-compose up
