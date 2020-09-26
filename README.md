# Car Repair App
A car repair app with the following features: 

The user requests an appointment and provides their email address.  The website sends an activation email to their email account.

The user clicks a link in an activation email, which takes them to a form where they enter their first name, last name, phone number, year, make, model, repair required, and preferred appointment date/time.  

Once this form is submitted they should be presented with a success screen and a confirmation email should be sent to the user. A "Car Repair Appointment" email should be delivered to repairs@example.com with the user's information, their car repair request information, appointment date/time, and the IP address used to fill out the form.

If the user clicks the activation email link or tries to fill out the form again, the user should be presented with their already submitted data (except the ip address), with an opportunity to rate their experience on a scale of 1-5.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
To begin, navigate to http://localhost:8080/#/

### Run your tests
```
npm test
```
# Notes

I'm not yet familiar with testing frameworks, such as Jest and Mocha. I'm currently learning more about testing frameworks and would like more exposure to them. I've included a basic unit test for the Home component to show my current understanding of how testing works. 

Database: Firebase/Firestore  
Email Service: EmailJS
