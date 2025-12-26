# Basic Node.js Docker App

A basic Node.js Express application with TypeScript, containerized with Docker.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/) (for containerization)
- [Docker Compose](https://docs.docker.com/compose/) (optional)

## Project Structure

```
├── src/
│   └── index.ts        # Main application entry point
├── dist/               # Compiled JavaScript (generated)
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── Dockerfile          # Docker image configuration
├── .dockerignore       # Files to exclude from Docker build
└── .gitignore          # Files to exclude from Git
```

## Getting Started

### Local Development

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run in development mode:**

   ```bash
   npm run dev
   ```

3. **Build for production:**

   ```bash
   npm run build
   ```

4. **Run production build:**
   ```bash
   npm start
   ```

The server will start at `http://localhost:3000`

## Docker Setup

### Step 1: Create a Dockerfile

The `Dockerfile` is a blueprint that tells Docker how to build your application image.

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

| Instruction                     | What it does                                                             |
| ------------------------------- | ------------------------------------------------------------------------ |
| `FROM node:20-alpine`           | Uses Node.js 20 on Alpine Linux (small, lightweight base image)          |
| `WORKDIR /app`                  | Sets `/app` as the working directory inside the container                |
| `COPY package*.json ./`         | Copies `package.json` and `package-lock.json` first (for better caching) |
| `RUN npm install`               | Installs dependencies                                                    |
| `COPY . .`                      | Copies the rest of your source code                                      |
| `RUN npm run build`             | Compiles TypeScript to JavaScript in the `dist/` folder                  |
| `EXPOSE 3000`                   | Documents that the app listens on port 3000                              |
| `CMD ["node", "dist/index.js"]` | The command to run when the container starts                             |

### Step 2: Create a .dockerignore file

Similar to `.gitignore`, this prevents unnecessary files from being copied into the image:

```
node_modules
dist
.git
.gitignore
*.md
.env*
```

- `node_modules` - Will be installed fresh inside the container
- `dist` - Will be built inside the container
- `.git`, `.env*` - Not needed in the image

### Step 3: Build the Docker image

```bash
docker build -t basic-nodejs-app .
```

- `docker build` - Creates an image from the Dockerfile
- `-t basic-nodejs-app` - Tags/names the image
- `.` - Use the current directory as build context

### Step 4: Run the container

```bash
docker run -p 3000:3000 basic-nodejs-app
```

- `docker run` - Creates and starts a container from the image
- `-p 3000:3000` - Maps host port 3000 → container port 3000
- Your app will be accessible at `http://localhost:3000`

## Docker Compose (Optional)

For easier container management, create a `docker-compose.yml`:

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
```

Then run:

```bash
docker-compose up
```

## API Endpoints

| Method | Endpoint  | Description     |
| ------ | --------- | --------------- |
| GET    | `/`       | Welcome message |
| GET    | `/health` | Health check    |

## License

ISC
