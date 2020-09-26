<template>
  <div>
  <div v-if="!displayAppointment && !emailSent">
  <h1>Car Repair Appointment Contact</h1>
  <form class="contact-form" @submit.prevent="checkAppointments">
    <label>Email</label>
    <input v-model="emailParams.to_email" type="email" name="user_email" required>
    <input type="submit" value="Send">
  </form>
  </div>
  <div v-if="emailSent && !displayAppointment">
    <h2>You should have an email with a link to make an appointment</h2>
  </div>
  </div>
</template>

<script>
import emailjs from 'emailjs-com'
const db = require('../firebaseConfig.js')

export default {
  name: 'Home',
  created () {
    /* Get appointments from database and store. */
    this.ref.onSnapshot((querySnapshot) => {
      this.appintments = []
      querySnapshot.forEach((doc) => {
        this.appointments.push({
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          email: doc.data().email,
          number: doc.data().number,
          year: doc.data().year,
          make: doc.data().make,
          model: doc.data().model,
          repair: doc.data().repair,
          time: doc.data().time,
          rating: doc.data().rating,
          key: doc.data().key
        })
      })
    })
  },
  data () {
    return {
      appointments: [],
      existing: {},
      userKey: '',
      displayAppointment: false,
      emailSent: false,
      ref: db.appointments,
      emailParams: {
        from_name: 'The Repair Shop',
        to_email: '',
        message: 'http://localhost:8080/#/form?key='
      }
    }
  },
  methods: {
    /* Generates random key for user */
    getKey (length) {
      var result = ''
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      var charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      this.userKey = result
      return result
    },
    /* Sends email via EmailJS to user with unique key */
    sendEmail () {
      this.emailParams.message += this.userKey
      emailjs.send('contact-service', 'template_appointment', this.emailParams, 'user_7q5WgpVx96QQVsQEccy8S')
        .then((result) => {
          alert('You have been sent an email with next steps.')
          this.$router.push({ path: 'thank-you' })
        })
        .catch((error) => {
          alert('Could not send to email address provided. ERROR: ' + error)
          location.reload()
        })
    },
    /* Adds user into database with unique key */
    addUser () {
      this.getKey(5)
      db.appointments.doc(this.userKey).set({
        email: this.emailParams.to_email,
        key: this.userKey
      })
      this.sendEmail()
    },
    /* Checks to see if the user already has an appointment or confirmation email */
    checkAppointments () {
      this.appointments.forEach((appointment, index) => {
        if ((appointment.time) && (this.emailParams.to_email === appointment.email)) {
          appointment.time = appointment.time.toLocaleString()
          this.existing = this.appointments[index]
          this.displayAppointment = true
          this.$router.push({ name: 'Thank You', params: this.existing })
        } else if (this.emailParams.to_email === appointment.email && (!appointment.time)) {
          this.emailSent = true
        }
      })
      if (this.displayAppointment !== true && this.emailSent !== true) {
        this.addUser()
      }
    }
  }
}
</script>
