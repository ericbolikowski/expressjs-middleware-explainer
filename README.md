# Express Middleware Example

A simple Express.js server that demonstrates middleware usage with name transformation endpoints.

## What it does

This server has two endpoints that transform a `name` query parameter:
- `/uppercase` - converts the name to UPPERCASE
- `/lowercase` - converts the name to lowercase

All requests automatically have their `name` parameter trimmed of whitespace through middleware.

## Quick Start

```bash
npm install
npm run run
```

The server will start on `http://localhost:4135`

## Try it out

- `http://localhost:4135/uppercase?name=john` → `{"name": "JOHN"}`
- `http://localhost:4135/lowercase?name=ALICE` → `{"name": "alice"}`
- `http://localhost:4135/uppercase?name=  spaced  ` → `{"name": "SPACED"}` (whitespace trimmed)

## Request Lifecycle

Here's how requests flow through the application:

```mermaid
flowchart TD
    A["Client Request<br/>GET /uppercase?name=' john '<br/>or<br/>GET /lowercase?name=' alice '"] --> B["Express App<br/>Receives Request"]
    
    B --> C["Trim Middleware<br/>app.use()"]
    
    C --> D{"Check if req.query.name<br/>exists and is string?"}
    
    D -->|Yes| E["Trim whitespace<br/>req.query.name = req.query.name.trim()"]
    D -->|No| F["Skip trimming"]
    
    E --> G["call next()"]
    F --> G
    
    G --> H["Express Router<br/>Route Matching"]
    
    H --> I{"/uppercase or /lowercase?"}
    
    I -->|"/uppercase"| J["Uppercase Handler<br/>app.get('/uppercase', ...)"]
    I -->|"/lowercase"| K["Lowercase Handler<br/>app.get('/lowercase', ...)"]
    
    J --> L["Check if name exists"]
    K --> M["Check if name exists"]
    
    L -->|No name| N["Return 400 Error<br/>{'error': 'Name query parameter is required'}"]
    L -->|Name exists| O["Transform to uppercase<br/>name.toUpperCase()"]
    
    M -->|No name| P["Return 400 Error<br/>{'error': 'Name query parameter is required'}"]
    M -->|Name exists| Q["Transform to lowercase<br/>name.toLowerCase()"]
    
    O --> R["Send JSON Response<br/>{'name': 'JOHN'}"]
    Q --> S["Send JSON Response<br/>{'name': 'alice'}"]
    
    N --> T["HTTP Response to Client"]
    P --> T
    R --> T
    S --> T
    
    T --> U["Client Receives Response"]

    style A fill:#e1f5fe
    style C fill:#fff3e0
    style J fill:#f3e5f5
    style K fill:#f3e5f5
    style T fill:#e8f5e8
    style U fill:#e1f5fe
```

## Key Features

- **Middleware**: Automatically trims whitespace from name parameters
- **Error handling**: Returns helpful error messages for missing parameters
- **Simple API**: Just two endpoints with clear functionality
- **Port 4135**: Configured to run on a specific port for consistency 