<a name="readme-top"></a>

<br />
<div align="center">

<h1 align="center">Open Library</h1>


[For the app, click here.](https://open-library-project-2061b.web.app)

  <p align="center">
    This project is one of the the pratical exams of the Angular <a href="https://www.start2impact.it"> start2impact University's </a> course. </br>
    The task was to create an app using the <a href="https://openlibrary.org/developers/api">Open Library</a> service to encourage reading. </br>
    The application, composed of a single text-box, should allow the user to search all books in a specific category. </br>
    Once the list of books is retrieved, the application will only display the title and the list of authors. </br>
    When the user clicks on a book or on a specific button, the application must be able to display the description of the book </br>
    The evaluation is not be based on the design of the application but rather on its "Don’t make me think!" user experience.
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#project-structure">Project Structure</a></li>
        <li><a href="#setting-up">Setting Up</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#flaws">Flaws</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#feedbacks">Feedbacks</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

### Project Structure

```
open-library/
├── src/
│   ├── app/
│   │   ├── components/      # Components
│   │   ├── guards/          # Route Guards
│   │   ├── interceptors/    # Interceptors
│   │   ├── models/          # Models
│   │   ├── services/        # Services
│   ├── environments/        # Environment Configuration
├── angular.json             # Angular Configuration
├── package.json             # Dependences and npm scripts
└── tsconfig.json            # TypeScript Configuration
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Setting up

The project was developed with Angular 19.

<ol>
  <li>
    Clone the repository:
    
    git clone https://github.com/LonneWW/open-library.git
  </li>
  <li>
    Change directory to the project one:
    
    cd open-library
  </li>
  <li>
    Install packages:
    
    npm install
  </li>
  <li>
    Run the development server and try the app:
    
    ng serve
  </li>
</ol>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![ANGULAR][angular-badge]][angular-url]
- [![ANGULAR-MAT][angular-mat-badge]][angular-mat-url]
- [![TS][typescript-badge]][typescript-url]
- [![HTML5][html-badge]][html-url]
- [![SASS][sass-badge]][sass-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

The application is truly simple. </br> 
By selecting a category in the textbox, a list of books composed by title and authors will be displayed. </br>
Clicking on the description icon of a book will display its description, if available. </br>
And...that's really it. </br>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FLAWS -->

## Flaws

Aside of the poor desing and animations I think I could have optimized the code better. </br>
Also the LibraryDataService is a bit too full. Maybe creating more services and writing the code differently was a better way to go.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

- [![Website Portfolio][site-badge]][site-url]
- [![LinkedIn][linkedin-shield]][linkedin-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FEEDBACKS -->

## Feedbacks

If you'd like to spend some of your time to tell me what you think about it or maybe give me some hints to how you would have done things different, I'll be very, very grateful.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[angular-badge]: https://img.shields.io/badge/Angular-white?style=flat&logo=angular&logoColor=purple
[angular-url]: https://angular.dev
[angular-mat-badge]: https://img.shields.io/badge/Angular%20Material-white?logo=angular&logoColor=%2300fbfb
[angular-mat-url]: https://material.angular.io
[typescript-badge]: https://img.shields.io/badge/Typescript-white?style=flat&logo=typescript&logoColor=%233178C6

[typescript-url]: https://angular.dev](https://www.typescriptlang.org
[html-badge]: https://img.shields.io/badge/HTML-white?style=flat&logo=html5&logoColor=%23E34F26
[html-url]: https://html.it
[sass-badge]: https://img.shields.io/badge/SASS-white?style=flat&logo=sass&logoColor=%23CC6699
[sass-url]: https://sass-lang.com
[site-badge]: https://img.shields.io/badge/Website-grey?style=flat
[site-url]: https://lonneww.github.io/portfolio/
[linkedin-shield]: https://img.shields.io/badge/Linkedin-grey?style=flat&logo=linkedin&logoColor=%230A66C2
[linkedin-url]: https://www.linkedin.com/in/samuel-barbieri-100886208/
