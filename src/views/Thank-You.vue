<template>
  <div>
    <div v-if="!displayAppointment">
    <h2>Thank you for your request.</h2>
    </div>
    <div v-if="displayAppointment">
      <h2>You have already scheduled an appointment!</h2>
      <h3>First Name: {{this.existing.firstName}}</h3>
      <h3>Last Name: {{this.existing.lastName}}</h3>
      <h3>Email: {{this.existing.email}}</h3>
      <h3>Phone Number: {{this.existing.number}}</h3>
      <h3>Year: {{this.existing.year}}</h3>
      <h3>Make: {{this.existing.make}}</h3>
      <h3>Model: {{this.existing.model}}</h3>
      <h3>Repair: {{this.existing.repair}}</h3>
      <h3>Date & Time: {{this.existing.time}}</h3>
      <br>
      <div v-if="rated">
        <h2>Thanks for your feedback.</h2>
      </div>
      <div v-if="!rated">
        <h2>Have a good experience? Let us know!</h2>
        <form class="rating-form" @submit.prevent="updateRating">
        <select v-model="rating">
          <option value=1>1</option>
          <option value=2>2</option>
          <option value=3>3</option>
          <option value=4>4</option>
          <option value=5>5</option>
        </select>
        <input type="submit" value="Rate Us">
        </form>
      </div>
  </div>
  </div>
</template>

<script>
const db = require('../firebaseConfig.js')

export default {
  created () {
    this.existing = this.$route.params
    if (this.existing.time) {
      this.displayAppointment = true
      if (this.existing.rating) {
        this.rated = true
      }
    }
  },
  data () {
    return {
      displayAppointment: false,
      existing: {},
      rating: 0,
      rated: false
    }
  },
  methods: {
    updateRating () {
      db.appointments.doc(this.existing.key).update({
        rating: this.rating
      })
      this.rated = true
    }
  }
}
</script>
