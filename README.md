# Project 2 - DumBass

## How to run the website

From the root of the project, run:

1. \_cd backend
2. _npm i_
3. _npm run dev_

Then open a new terminal, and run:

1. _cd frontend_
2. _npm i_
3. _npm run dev_

## Documentation

### Dataset

Our dataset consists of artists and songs, both of which were sourced from Genius using two dedicated scripts. These scripts are located in the `/backend/server/scripts` directory.

### Pages

The website contains 6 different frontend pages located in the pages folder under components.

- ArtistPage.tsx - Page showing information about an artist.
- ErrorPage.tsx - A not found page the users will be naviagated to if they try to access pages that don't exists.
- FavoritesPage.tsx - Page with all the favorites for the logged in user.
- HomePage.tsx - Home page with top songs and artists and a search bar.
- LoginPage.tsx - Page for login with username and password.
- Registerpage.tsx - Page for register a user with username and password.
- SearchPage.tsx - Page showing search results from the searchbar.
- SongPage.tsx - Page showing information about a song.

### Functionality and technologies

- The explore page contains a search bar with built in filtering where you can choose between searching on songs or artists only.
- List based results of songs and artits with pagination in search page (after user have searched for a query).
- Can see more details by clicking on either a song or artist card. Song card displays lyrics and reviews, and artist card displays artist info and reviews.
- Can sort and filter on search page to show a selection of the data.
- The users can register themselves and log in to their registered account.
- The user can add an review to either a song or artist, and also save their favourites.
- We use the Genius API to get the songs and artist data, and then we use the database to store user information, favorites and reviews/ratings.
- We use Redux and sessionStorage to store information about the user ID of the logged in user to make sure the user get the correct favourites that belongs to them. The Redux' actions and reducers can be found in the 'redux' folder in the frontend.
- We use the MERN stack (MongoDB, Express.js, React, Node.js) in addition to Apollo. Our backend consists of GraphQL, MongoDB Apollo, and JavaScript, while the frontend consists of React, TypeScript, Redux, and Apollo.
- The frontend recieves the data from the backend in GraphQL format using Apollo. The code for this can be found in the 'graphQL'-folder in the frontend.

### Components

We have chosen to use an Atomic Design pattern where we divide our components into the folders atoms, moleculs, organisms and pages based on the component size. The design is a methodology for good design systems with building blocks that promote consistency and scalability.

- **Atoms** - contains the basic building block that are not useful alone. This includes Dropdown and CommonDropdown which are the dropdowns for the searchbar and filter/sort functionality. The folder also contains Button, Inputfield and RatingStars which are components reused multiple times in the application.

- **Molecules** - groups atoms together into larger functionality. Here we have ArtistSongCard, CommonSearchBar, InfoPageTabs and Reviews which all are built up by different atom components.

- **Organisms** - contains components that make up a section of the page. In this folder we have CardView that contains all the artist and song cards, and the Navbar which is displayed at every page on the website.

- **Pages** - The whole application is divided into multiple pages. Our website contains 8 different pages with different functionality as explained above.

### Development and quality assurance

- **Pipeline** - To ensure a protected main branch which is always running, we have implemented a pipeline. This pipeline builds and tests the project before each merge request can be merged.
- **Linting** - Before creating a merge request, we have used ESLint and prettier to ensure a consistent code formatting.

## Commit message template

We used the following commit message template for all commits when contributing to the project.

`<type>`: `<title>`

Explain how the commit addresses the issue

**Co-authored-by:** `<name> <email>`

**Issue:** `#<issueNr>`

--- COMMIT END ---

The `<type>` can be one of the following:

- `feat` (new feature)
- `fix` (bug fix)
- `refactor` (refactoring production code)
- `style` (formatting, missing semicolons, etc; no code change)
- `docs` (changes to documentation)
- `test` (adding or refactoring tests; no production code change)
- `chore` (updating grunt tasks, etc; no production code change)

## Liting

Running ESLint to lint and automatically fix issues in the code in the current directory, and then it runs Prettier to format the code in the same directory.

This should be done before every merge request:

From root:

- 'cd frontend'

```bash
pnpx eslint . --fix && pnpx prettier --write .
```
