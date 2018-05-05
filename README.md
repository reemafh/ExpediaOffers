# Expedia Coding Exercise

## Development Prerequisites:
	•	Visual Studio 2017 (15.3.2 or above)
	•	Asp.NET Core 2.0
	•	Node.js version 6 or later
	•	Run dotnet new –install  Microsoft.AspNetCore.SpaTemplates::* to install angular SPA template
	•	Angular-Cli (npm install –g @angular/cli@latest)
  
## Why using angular asp.net core SPA template:
	•	Angular & asp.net core in one project
	•	Webpack dev middleware
	•	Hot module replacing
	•	Avoid cross-origin resource sharing configration
  
> **The reason I picked .net + angular is that I’m .net developer so this the framework I’m familiar with and recently moved to angular4 for front end development.** 

## Work process and Project structure:

1. **Server Side - ASP.NET Core Web API:**

	* ExpediaController has one restful api of type get that accepts parameter of type SearchCriteria and returns the matching hotel deals.
  
	* I decided to pass the query parameters in one object SearchCriteria and specify the binding source [fromQuery] (I decided to do this to keep my code clean as there are many query parameters to be passed)
	*	The query params are being extracted from search criteria object using system.reflection library and then passed to expedia web api.
  
2. **Client Side - Angular 4:**
	*	All the code exists in the app component (root angular component) including html design and typescript logic (no nested components)
	*	I’ve added an angular service (ExpediaService) : this service is responsible for the backend call for web api and retrieving the matching deals.
	*	The service is consumed by the app component using dependency injection ( this is the best practice when we want to integrate with a third party ,moreover, it keeps code clean and modular and prepares my app component for unit testing in the future)
	*	The html design is done using bootstrap 
	*	The css exists in app.component.css file
  
> **Note: Usually I develop angular projects using angular –cli on visual studio code (more lightweight tool and makes use of angular-cli commands)**
