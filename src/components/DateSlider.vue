<template>
  <v-card max-width="400" class="mx-auto pa-4">
    <!-- Slider Header -->
    <v-card-title class="justify-center"> Pilih Tanggal </v-card-title>

    <!-- Sliders for Day, Month, Year -->
    <v-container>
      <v-row justify="center">
        <v-col cols="3">
          <!-- Slider for Days -->
          <div class="slider-container">
            <v-slider
              v-model="selectedDate"
              :max="31"
              :min="1"
              step="1"
              vertical
              class="mb-4 custom-slider"
              ticks
              tick-size="4"
              thumb-size="0"
              hide-details
              show-value
              v-slot:prepend-label="{ modelValue, index }"
            >
              <template #prepend-label="{ modelValue, index }">
                <span :class="{ 'text-black': isMiddle(index), 'text-grey': !isMiddle(index) }">{{
                  modelValue
                }}</span>
              </template>
            </v-slider>
          </div>
        </v-col>

        <v-col cols="3">
          <!-- Slider for Months -->
          <div class="slider-container">
            <v-slider
              v-model="selectedMonth"
              :max="12"
              :min="1"
              step="1"
              vertical
              class="mb-4 custom-slider"
              ticks
              tick-size="4"
              thumb-size="0"
              hide-details
              show-value
              v-slot:prepend-label="{ modelValue, index }"
            >
              <template #prepend-label="{ modelValue, index }">
                <span :class="{ 'text-black': isMiddle(index), 'text-grey': !isMiddle(index) }">{{
                  months[modelValue - 1]
                }}</span>
              </template>
            </v-slider>
          </div>
        </v-col>

        <v-col cols="3">
          <!-- Slider for Years -->
          <div class="slider-container">
            <v-slider
              v-model="selectedYear"
              :max="yearRange.max"
              :min="yearRange.min"
              step="1"
              vertical
              class="mb-4 custom-slider"
              ticks
              tick-size="4"
              thumb-size="0"
              hide-details
              show-value
              v-slot:prepend-label="{ modelValue, index }"
            >
              <template #prepend-label="{ modelValue, index }">
                <span :class="{ 'text-black': isMiddle(index), 'text-grey': !isMiddle(index) }">{{
                  modelValue
                }}</span>
              </template>
            </v-slider>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Card Actions with Close and OK Buttons -->
    <v-card-actions class="justify-end">
      <v-btn text @click="closeDialog">Close</v-btn>
      <v-btn text color="primary" @click="saveDate">OK</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import moment from 'moment'

// Initialize with today's date using Moment.js
const today = moment()

const selectedDate = ref(today.date()) // Default to today's date
const selectedMonth = ref(today.month() + 1) // Default to current month (add 1 since Moment.js months start at 0)
const selectedYear = ref(today.year()) // Default to current year

const savedDate = ref({ date: null, month: null, year: null }) // State to save the selected date

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const yearRange = {
  min: 1900, // Minimum year
  max: 2100 // Maximum year
}

// Function to determine if the label should be styled as the middle one
const isMiddle = (index) => index === 1 // Assuming index 1 is always the middle for display

// Handle saving the selected date
const saveDate = () => {
  savedDate.value = {
    date: selectedDate.value,
    month: selectedMonth.value,
    year: selectedYear.value
  }
  console.log('Saved Date:', savedDate.value)
}

// Close the dialog (implement your close logic)
const closeDialog = () => {
  console.log('Dialog closed')
}
</script>

<style scoped>
/* Custom styling for sliders */
.slider-container {
  position: relative;
  height: 100px; /* Adjust to show only three labels */
  overflow: hidden;
}

.custom-slider {
  position: absolute;
  top: -20px; /* Center the middle label */
}

.text-black {
  color: black;
}

.text-grey {
  color: grey;
  opacity: 0.6; /* Slightly dim to differentiate from active */
}
</style>
