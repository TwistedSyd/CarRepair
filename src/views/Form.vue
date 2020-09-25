<template>
  <div>
  <div v-if="!displayAppointment">
  <h1>Appointment Form</h1>
  <form style="display: inline-grid;" class="appointment-form" @submit.prevent="makeAppointment">
    <label>First Name</label>
    <input v-model="clientData.firstName" type="text" required>
    <label>Last Name</label>
    <input v-model="clientData.lastName" type="text" required>
    <label>Email</label>
    <input v-model="clientData.email" type="email" disabled>
    <label>Phone Number Format: 123-456-7890</label>
    <input v-model="clientData.number" type="tel" required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
    <label>Year (1900-2021)</label>
    <input v-model="clientData.year" type="number" required min="1900" max="2021">
    <label>Make</label>
    <input v-model="clientData.make" type="text" required>
    <label>Model</label>
    <input v-model="clientData.model" type="text" required>
    <label>Repair Required</label>
    <textarea v-model="clientData.repair" required></textarea>
    <label>Preferred Appointment Time</label>
    <input v-model="clientData.time" type="datetime-local" required>
    <input type="submit" value="Send">
  </form>
  </div>
  </div>
</template>

<script>
import emailjs from 'emailjs-com'
const db = require('../firebaseConfig.js')

export default {
  data () {
    return {
      rating: 0,
      displayAppointment: false,
      validLink: true,
      clientData: {
        firstName: '',
        lastName: '',
        email: '',
        number: '',
        year: '',
        make: '',
        model: '',
        repair: '',
        time: '',
        IP: '',
        key: '',
        rating: ''
      },
      emailParamsCustomer: {
        from_name: 'The Repair Shop',
        to_email: '',
        message: ''
      },
      emailParamsShop: {
        from_name: 'Appointments',
        to_email: 'konczsydney@gmail.com',
        message: ''
      }
    }
  },
  created () {
    var getURL = window.location.href
    if (!getURL.match(/http:\/\/localhost:8080\/#\/form\?key=.{5}$/)) {
      alert('URL invalid, please use the link found in your email.')
      this.$router.push({ path: '/' })
    } else {
      var urlParams = new URLSearchParams(getURL)
      var key = urlParams.get('http://localhost:8080/#/form?key')
      this.clientData.key = key
      var exists = db.appointments.doc(this.clientData.key)
      exists.get()
        .then((doc) => {
          if (doc.exists) {
            this.validLink = true
            this.clientData.email = doc.data().email
            if (doc.data().time) {
              this.clientData.firstName = doc.data().firstName
              this.clientData.lastName = doc.data().lastName
              this.clientData.number = doc.data().number
              this.clientData.year = doc.data().year
              this.clientData.make = doc.data().make
              this.clientData.model = doc.data().model
              this.clientData.repair = doc.data().repair
              this.clientData.time = doc.data().time
              if (doc.data().rating) {
                this.clientData.rating = doc.data().rating
              }
              this.$router.push({ name: 'Thank You', params: this.clientData })
            }
          } else {
            this.validLink = false
            alert('We could not find your appointment.')
            this.$router.push({ path: '/' })
          }
        })
        .catch((error) => {
          alert('Error getting document:', error)
        })
      fetch('https://api.ipify.org?format=json')
        .then(async response => {
          const data = await response.json()
          if (!response.ok) {
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
          }
          this.clientData.IP = data.ip
        })
        .catch(error => {
          alert('There was an error getting the IP address', error)
        })
    }
  },
  methods: {
    sendEmail () {
      emailjs.send('contact-service', 'template_confirm', this.emailParamsCustomer, 'user_7q5WgpVx96QQVsQEccy8S')
        .then((result) => {
          alert('You have been sent an email with your appointment information.')
          this.$router.push('thank-you')
        }, (error) => {
          alert('Could not send to email to confirm appointment. ERROR: ' + error)
          this.$router.push('/')
        })
      emailjs.send('contact-service', 'template_confirm', this.emailParamsShop, 'user_7q5WgpVx96QQVsQEccy8S')
        .then((result) => {
          console.log('Shop email sent.')
        }, (error) => {
          alert('Could not send to email to shop. ERROR: ' + error)
        })
    },
    getMessage () {
      Object.keys(this.clientData).forEach((key) => {
        this.emailParamsShop.message += key + ': ' + this.clientData[key] + '\n'
        if (key !== 'IP' && key !== 'key') {
          this.emailParamsCustomer.message += key + ': ' + this.clientData[key] + '\n'
        }
      })
      this.emailParamsCustomer.to_email = this.clientData.email
      this.sendEmail()
    },
    makeAppointment () {
      db.appointments.doc(this.clientData.key).update({
        email: this.clientData.email,
        firstName: this.clientData.firstName,
        lastName: this.clientData.lastName,
        number: this.clientData.number,
        year: this.clientData.year,
        make: this.clientData.make,
        model: this.clientData.model,
        repair: this.clientData.repair,
        time: this.clientData.time,
        key: this.clientData.key,
        ip: this.clientData.IP
      })
      this.getMessage()
    }
  }
}
</script>
