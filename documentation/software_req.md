# Software Requirements

## Vision

The vision of this product is to give the user the ability to generate dream images and tie together their sleep experience with documentation and track key sleep pattern recognition. This product avoids the generic basics of a sleep app and furthers the experience with suggestions on patterns, habits, and even generating an image to provide an even more immersive experience. There are a lot of dream apps out there on the market that claim to fix sleep or other unrealistic goals as their marketing tactic. But our app is here to provide a one of a kind authentic experience and easy to use experience for all friends and families.

## Scope (In/Out)

Our Product Will:

- Generate Images based on text content.
- Track Sleep Patterns.
- Authenticated accounts.
- Provide help and tips for app functionality and usage.

Our Product Will Not:
- Our app will provide any data beyond sleep.
- Our will not be an alarm app. 

## Minimum Viable Product

MVP functionality is to have a functioning call to the OpenAI image generator and be able to track sleep patterns.

## What are your stretch goals?

The stretch goal to implement the Google Sleep API, rather than just relying on the calendar for data.

## Stretch

What stretch goals are you going to aim 
for?

Definitely implementing the Google Sleep API is going to be the goal once we have a clear set goal on what we want to implement.

## Functional Requirements

List the functionality of your product. This will consist of tasks such as the following:

An admin can create and delete user accounts

A user can update their profile information

An admin can search all of the accounts in the database.

Both users and admins can create, update, delete and read dream images and track their sleep.

Both admins and users can utilize the calendar portion of the application.

All users can authenticate their account through an external party.

## Data Flow

The Data will flow through a user authentication screen. From there the user will be able to create the application user name and password. Whether they are a default user or an admin is determined by credentials. From there the user accesses the home screen which there they will be greeted by an overall HOW TO UTILIZE THE APP. There is a menu tab at the bottom of the screen which includes, DREAM, CALENDAR, AND ACCOUNT the app will also have a FAQ section to help guide new users. The dream section will include an image generation based on prompts, and the calendar will feed off this data and the user will be able to interact with that. The account section will have user settings and account details.

## Non Functional Requirements


Accessibility We will also make sure to make the application accessbile for everyone because everyone may not dream but everyone sure does sleep.

Security - We will be using clerk io to control our authentication and user management. We wanted to have users have their own separate accounts to save, store and view their content they create. This makes security an important step to be able to offer users a secure experience of their own and ability to save their creations. 

Usability - This app is meant to be a simple and fun way to record dreams, memories, daydreams and use a new technology to create media and art. The UI will have clearly marked directions and navigation to guide the user on how to use the application. This is an interesting way to tie in journaling, art creation, dreams, memories, and be able to keep those memories and be able to share with family and friends. 




