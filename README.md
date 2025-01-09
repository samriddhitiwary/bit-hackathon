# Project Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Key Features](#key-features)
   - [Feature 1: Doctor-Patient Appointment Booking and Management](#doctor-patient-appointment-booking-and-management)
   - [Feature 2: Real-Time Health Monitoring and Record Keeping](#real-time-health-monitoring-and-record-keeping)
   - [Feature 3: GPS Integration for Nearby Hospitals](#gps-integration-for-nearby-hospitals)
   - [Feature 4: Calories Tracking and Alerts](#calories-tracking-and-alerts)
   - [Feature 5: Firebase Google Authentication](#firebase-google-authentication)
   - [Feature 6: Medical Symptom Assistance Chatbot](#medical-symptom-assistance-chatbot)
   - [Feature 7: Widget for Easy Navigation](#widget-for-easy-navigation)
   - [Feature 8: Video Consultations with Jitsi](#video-consultations-with-jitsi)
   - [Feature 9: Responsive Website](#responsive-website)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)

---

## Introduction
A health app is a software program that can be used on a mobile device or in desktop to process health-related data. Entire project is divided into client server architecture and hence created two different project but checked into one git repo
1. frontend
2. backend

---

## Key Features

### Doctor-Patient Appointment Booking and Management
[Explain how appointments can be booked, managed, and updated.]

### Real-Time Health Monitoring and Record Keeping
[Describe health tracking features, including the use of graphs and record uploads.]

### GPS Integration for Nearby Hospitals
[Detail the Google Maps API integration for finding nearby hospitals.]

### Calories Tracking and Alerts
[Explain how users can track calories and receive alerts.]

### Firebase Google Authentication
[Highlight the secure login implementation using Firebase.]

### Medical Symptom Assistance Chatbot
[Describe the chatbot’s role and capabilities.]

### Widget for Easy Navigation
[Outline how the widget simplifies user experience.]

### Video Consultations with Jitsi
[Explain the integration of video consultations using Jitsi.]

---

## Technologies Used
- React.js
- Firebase Authentication
- Google Maps API
- Jitsi (Video Consultations)
- Node.js (Backend)
- Express.js
- CSS/Tailwind CSS/Bootstrap

---

## Installation
In order to run the project in local, developers has to get .env file, which contains many sensitive information like Google Map API Key, Database credentials, Chat GPT API key etc. 
1. Clone the repository:  
   ```bash
   git clone https://github.com/samriddhitiwary/bit-hackathon.git
   ```
   All the code will be cloned in bit-hackathon. Frontend code is checked-in in frontend folder and backend folder is checked into backend folder
2. Start the backend server
    ```bash
    cd ./bit-hackathon/backend
    npm install
    npm start
    ```
    This will start the backend server in 8000 port by default. However, port can be configured in .env file.
       
3. Start the frontend server
     ```bash
     cd ./bit-hackathon/frontend
     npm install
     npm start
     ```
    This will start the frontend server in 3000 port by default. However, port can be configured in .env file.
