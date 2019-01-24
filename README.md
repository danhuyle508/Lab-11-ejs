# Google Books Search App
**Author**: Milo Anderson and Dan-Huy Le
**Version**: 1.0.4

## Overview 

This simple app allows users to search the Google Books API & browse the results. It displays resulting titles, authors, images, and descriptions. The user can choose to update and save the book or delete it from the saved list.

## Getting Started

After you clone the repo, you will need to run "npm install" in your terminal to install the required dependencies. You'll also want to create a .env file and add a PORT number, e.g. "PORT=3000"

## Architecture

The app relies on express.js to route client requests and read query data, superagent.js to communicate with the Google Books API, and EJS to render the results on an html page. It also needs method override to be able to successfully delete books.

## Change Log

01-22-2019 11:30 a.m. - Application performs Google Book API query with user input, and displays the results

01-24-2019 1:03 p.m. - Application saves, updates and deletes.

## Credits & Collaborations

This application borrows heavily from code samples provided by Allie Grampa. David Chambers also provided invaluable assistance. 

### Time Estimates

> Number and name of feature: Display home page
> Estimate of time needed to complete: 1:00
> Start time: 9:00
> Finish time: 10:00
> Actual time needed to complete: 1:00

> Number and name of feature: Search API & display results
> Estimate of time needed to complete: 1:00
> Start time: 10:00
> Finish time: 11:00
> Actual time needed to complete: 1:00

> Number and name of feature: Error handling
> Estimate of time needed to complete: 0:30
> Start time: 11:00
> Finish time: 12:00
> Actual time needed to complete: 1:00

> Number and name of feature: Styling UI
> Estimate of time needed to complete: 1:00
> Start time: 12:00
> Finish time: 1:30
> Actual time needed to complete: 1:30 

Number and name of feature: Form UI
> Estimate of time needed to complete: 1:00
> Start time: 9:15:00
> Finish time: 10:00
> Actual time needed to complete: 45 minutes

Number and name of feature: Update and Deleting 
> Estimate of time needed to complete: 2:00
> Start time: 10:00
> Finish time: 1:05
> Actual time needed to complete: 3 hours 5 minutes  