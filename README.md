# Husanu

This project has been made with the purpose of making appointments for Consulting Services and also has a blog section where the admin can add articles.

## Requirements

For this project you will need:

- Node v12.18.0
- Yarn

## Project setup

To install the necessary libraries and dependencies you can use:

```
yarn install
```

To run this project in dev mode:

```
yarn dev
```

To build the project for production:

```
yarn build
```

## Key features

In this project you can find features like:

- Authentication system with JWT
- Multilanguage support with state that persists on page reload using i18n
- Advanced calendar with custom rules
- Blog comment section with replies
- Consuming REST API using Axios
- Routing using Vue Router
- State Management using Vuex
- Form Validation
- Custom reusable components made with Vue.JS & SCSS
- Admin Panel for easy platform management
- Responsive design

...and many more!

## Demos

### Home Page

#### Welcome Screen

Simple and elegant welcome screen for clients with multilanguage component pinned in header that adds selected language in link.
![Welcome Screen](screenshots/homepage-multilanguage.png)

#### Our Services

Section of services provided by the company. Every category from the left changes the details on the right when selected.
![Our Services](screenshots/our-services.png)

#### How it Works

Steps added by the company showing their protocol in consulting. Every step is a custom reusable component.
![How it Works](screenshots/how-it-works.png)

### Insurances Page

#### Personal Insurances

Categories and subcategories of personal insurances that has a detailed description, using specific components for maintaining same pattern across the platform.
![Personal Insurances](screenshots/personal-insurances.png)

#### Company Insurances

##### Top advantages

Section about company insurances that displays top advantages.
![Company Insurances](screenshots/company-insurances.png)

##### What Includes

Slider of different types of company insurances that displays perks for each insurance.
![What Includes](screenshots/what-includes.png)

### Blog Page

List of articles available on platform. It is paginated for optimizing loading time and persists on page reload. List can also be filtered by categories of articles.
![Blog Page](screenshots/blog.png)

### Article Page

The page which contains the details about the article. It also has a comment section with reply possibility at the end of article.
![Article Page](screenshots/atricle.png)
![Comment Section](screenshots/comments.png)

### Appointment Page

Section where you can create a new appointment that is required to confirm it through email. It uses a complex calendar that can have certain disabled days according to rules and exception you make in the admin panel.
![Appointment Page](screenshots/appointment.png)

### ADMIN Section

#### Employees Section

Page for managing employees. You can change privileges, give blog access for posting new articles or manage comments and also see accounts confirmed via email.
![Employees Section](screenshots/admin-employees.png)

#### Bookings Section

You can assign bookings to employees and also add or remove rules and exeptions in the calendar.

##### Bookings Assignments

![Bookings Section](screenshots/admin-bookings.png)

##### Bookings Rules

![Bookings Rules](screenshots/admin-booking-rules.png)

##### Bookings Exceptions

![Bookings Exceptions](screenshots/admin-booking-exception.png)

#### Blog Section

You can manage every article available on the platform. You can add new categories, you can add new arcicles and you can as well manage which comments should be approved on platform.
![Blog Section](screenshots/admin-blog.png)
