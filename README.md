# ASP.NET Core Web API: Extra Points Project

Based on the Microsoft Learn tutorial "Tutorial: Create a controller-based web API with ASP.NET Core".

## Projects

- **TodoApi**: controller-based Web API (in-memory database) with a JavaScript client in `wwwroot`
- **BookStoreApi**: controller-based Web API using MongoDB

## Requirements

- .NET 10 SDK
- MongoDB Community Server (for BookStoreApi)

## Run TodoApi

    cd TodoApi
    dotnet run

Open the address printed in the terminal (for example http://localhost:5098/) to use the web page.
API endpoint: `/api/TodoItems`

## Run BookStoreApi

Start MongoDB first (on macOS: `brew services start mongodb-community`). The database is called `Bookstore`, with a `Books` collection.

    cd BookStoreApi
    dotnet run

API endpoint: `/api/books`

Test requests are in each project's `.http` file.