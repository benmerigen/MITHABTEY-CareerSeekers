# MITHABTEY - CareerSeekers

A capstone project developed by Daniel Maman and Ben Avner Merigen as part of the final year of our Software Engineering degree at Braude College of Engineering.

## Project Overview

**MITHABTEY - CareerSeekers** is a web-based platform designed to help users discover job opportunities that align with their personality traits. This project was initially conceived to assist members of the Facebook group "Mithabtey Miktzoa," which has 40,000 members, in finding suitable career paths by utilizing a **Genetic Algorithm** to match character traits with jobs. Users answer the **RAMAK questionnaire**, and based on their responses, the algorithm suggests the best-matched jobs.

Visit the live website here: **[mithabtey-careerseekers.onrender.com](https://mithabtey-careerseekers.onrender.com/)**.

This project spanned two semesters, with the first focusing on research and the second on development.

## Features

- **RAMAK Questionnaire**: Users fill out the questionnaire to determine their personality traits.
- **Genetic Algorithm**: Matches users' personality traits with jobs in our database.
- **Admin Panel**: Administrators can add, delete, or modify jobs.
- **User Authentication**: Registration and login system.
- **Job Search**: Search functionality that allows users to find jobs by field.
- **Job Suggestions**: Personalized job recommendations based on traits.
- **Profile Management**: Users can edit their profiles and save job listings.
- **Notifications**: Users are notified when new jobs matching their traits are available.

## Tech Stack

- **Frontend**: React.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, MongoDB, JWT for authentication
- **Hosting**: Deployed on Render

## Research Process

During the research phase of the project, we analyzed various job search platforms like **Truity** and **CareerExplorer**, both internationally and in Israel, and identified that most platforms fail to incorporate personality traits when matching users with jobs. We decided to use the **RAMAK questionnaire** due to its accuracy and relevance to the Israeli job market, as recommended by occupational psychologist **Ra'anan Hess**.

We also explored various personality trait models, including the **Big Five** and the **Holland Code (RIASEC)**. However, we selected the RAMAK questionnaire for its modern approach to matching work domains with personality traits.

## Future Improvements

- **Course Integration**: Connect users to relevant online courses for skill development.
- **Mentorship**: Integrate mentorship programs for career advice and guidance.
- **Advanced Analytics**: Provide users with feedback on their job search activity and career progress over time.

## Documentation

For a detailed explanation of the project, including the **User Guide** and **Maintenance Guide**, please refer to the [full project documentation](https://docs.google.com/document/d/e/2PACX-1vSm_E2YrwwV3mTLDtL7RYLfZG3Zpe28KjU9sEvL6o273UzoaMAnx4pkGrSuJP6XEM_PM9Rip4VN80ij/pub).


## Job Pages

### Home Page
This page serves as the landing page for your site, which is part of the project for the Facebook group "מתחבטי מקצוע."  From this page the user can navigate to all pages in the project.  In this page, the user also can read about the Facebook group and its manager.
![Home](https://github.com/user-attachments/assets/17982283-18f2-45ce-92b7-b9a77fa08e70)


### Searching Job By Traits Page
In this page users can explore job opportunities by inserting traits to filter them, and see the percentage of matching between traits that the user inserted to the job`s traits. In addition, the user can view the job details.
![Searching Job By Traits Page](https://github.com/user-attachments/assets/a13d9c82-bf78-408b-87b1-c02268854414)


### Information of jobs that are characterized by RAMAK questionnaire Page
In this page the user can view information about professions that exist in the system for the RAMAK questionnaire. The user can make a comparison between the different fields that this questionnaire has and see details for a specific job.
![Information of jobs that are characterized by RAMAK questionnaire Page](https://github.com/user-attachments/assets/28ecb65a-df44-45d7-906a-b7894c3a9161)


### Admin Panel Page
Admin landing page. In this page the admin can choose whether to navigate to add a job, delete a job, manage users permission or update a profession.
![Admin Panel Page](https://github.com/user-attachments/assets/47e21c8f-322d-4457-9b42-704a7333f3bf)


### Users Permissions Page
On this page, the main administrator (Irit only) can update user permissions.
The permissions for the users are for the benefit of providing help to the main administrator in order to add / delete / edit professions.
![Admin Panel Page](https://github.com/user-attachments/assets/fede49ba-255c-44a8-be45-b9f17771946f)



### The Most 3 Suit Jobs Page
On this page, users view the three jobs that best suit them after filling out the RAMAK questionnaire.

![The most 3 suit jobs Page](https://github.com/user-attachments/assets/335f97e1-3450-41b3-aede-447610fcba88)


### RAMAK Questionnaire Page
In this page, the user fills in their answers to the questionnaire. After completing all questions, a calculation is made that describes their traits and the three jobs that best suit them.
![RAMAK questionnaire Page](https://github.com/user-attachments/assets/3a77be94-3ab6-4278-a50b-ae88908eddad)





