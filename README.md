# DreamTeam - Writer's Book & Documentation Portal

A 90s-themed retro web portal for the DreamTeam comic series documentation, character bibles, scripts, and production materials.

## 🚀 Quick Start with Docker

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

### Running the Application

1. **Clone the repository** (if you've pushed to GitHub):
   ```bash
   git clone https://github.com/YOUR_USERNAME/DreamTeam.git
   cd DreamTeam
   ```

2. **Build and run with Docker Compose**:
   ```bash
   docker-compose up -d
   ```

3. **Access the application**:
   Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

4. **Stop the application**:
   ```bash
   docker-compose down
   ```

### Alternative Docker Commands

**Build the image manually**:
```bash
docker build -t dreamteam-hub .
```

**Run without Docker Compose**:
```bash
docker run -d -p 8080:80 --name dreamteam-hub dreamteam-hub
```

**Stop and remove container**:
```bash
docker stop dreamteam-hub
docker rm dreamteam-hub
```

## 📁 Project Structure

```
DreamTeam/
├── web/                          # Web application files
│   ├── index.html               # Main landing page
│   ├── assets/                  # CSS, JS, images
│   └── pages/                   # Additional web pages
├── docs/                        # Documentation
│   ├── bible/                   # Writer's book and canon
│   ├── characters/              # Character documentation
│   ├── setting/                 # World building
│   └── ...
├── scripts/                     # Comic scripts
├── outline/                     # Series and issue outlines
├── production/                  # Production plans
├── pitch/                       # Project pitches
├── legal/                       # Templates and agreements
├── Dockerfile                   # Docker configuration
├── docker-compose.yml           # Docker Compose setup
└── README.md                    # This file
```

## 🐙 GitHub Setup

### Initialize Git Repository (First Time)

1. **Initialize the repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: DreamTeam documentation portal"
   ```

2. **Create a new repository on GitHub**:
   - Go to [github.com/new](https://github.com/new)
   - Name it `DreamTeam` (or your preferred name)
   - Don't initialize with README (we already have one)
   - Click "Create repository"

3. **Connect your local repository to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/DreamTeam.git
   git branch -M main
   git push -u origin main
   ```

### Making Updates

After making changes to your project:

```bash
git add .
git commit -m "Description of your changes"
git push
```

### Cloning on Another Machine

To get the same environment on a different computer:

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/DreamTeam.git
cd DreamTeam

# Run with Docker
docker-compose up -d
```

That's it! The Docker setup ensures you have the exact same environment everywhere.

## 🛠️ Development

### Local Development with Live Reload

The `docker-compose.yml` file includes volume mounts that allow you to edit files locally and see changes immediately without rebuilding the container.

Simply edit files in your local directories:
- `web/`
- `docs/`
- `scripts/`
- etc.

Refresh your browser to see the changes!

### Rebuilding After Major Changes

If you modify the Dockerfile or add new dependencies:

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 🌐 Features

- **90s Retro Theme**: Toggle between modern and retro modes
- **Document Viewer**: Browse all documentation in a clean interface
- **Navigation System**: Easy access to all project materials
- **Guestbook**: Interactive retro guestbook feature
- **Responsive Design**: Works on desktop and mobile devices
- **Print Support**: Print documentation to PDF

## 📦 What's Included

- **Writer's Book**: Complete series bible and canon
- **Character Bible**: Detailed character profiles
- **World Setting**: Location and world-building docs
- **Series Outline**: Complete arc planning
- **Script Samples**: Comic script examples
- **Production Plans**: Workflow and submission info
- **Legal Templates**: Collaboration agreements

## 🔧 Configuration

### Changing the Port

Edit `docker-compose.yml` and modify the ports section:
```yaml
ports:
  - "YOUR_PORT:80"  # Change YOUR_PORT to desired port
```

### Production Deployment

For production, you may want to:

1. Remove volume mounts in `docker-compose.yml`
2. Use a production-grade web server configuration
3. Set up HTTPS with SSL certificates
4. Use environment variables for configuration

## 📝 License

[Add your license information here]

## 🤝 Contributing

[Add contribution guidelines here]

## 📧 Contact

[Add contact information here]

---

**Best viewed in Netscape 3.0!** 🌐✨
