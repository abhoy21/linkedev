# Linkedev

Linkedev is a web application built with Next.js that allows users to search for GitHub profiles based on location. It fetches user details including username, name, followers, repos, stars, and profile URL count using the GitHub API.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Live Demo](#screenshots)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)


## Tech Stack

### Frontend
- Next.js
- Tailwind CSS
- Shadcn UI

## Live Demo
You can check out the live demo [Linkedev](https://linkedev.vercel.app/).

## Installation

### Prerequisites
- Node.js
- npm 

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/abhoy21/linkedev.git
   cd client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env.local` or `.env` file** in the `client` directory and add your GitHub access token:
   ```plaintext
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_access_token
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

The client will be running on `http://localhost:3000`.

## Usage

1. **Open the application** in your browser at `http://localhost:3000`.

2. **Enter a location** in the search input field.

3. **Press Enter or click the search button** to fetch GitHub profiles based on the provided location.

4. **The application will display** a list of GitHub profiles with their username, name, followers, repos, stars, and profile URL.

## Contributing

Contributions are welcome! If you want to contribute to Linkedev, please follow these steps:

1. **Fork the repository**.

2. **Create a new branch**:
   ```bash
   git checkout -b feature-branch
   ```

3. **Make your changes and commit them**:
   ```bash
   git commit -m 'Add some feature'
   ```

4. **Push to the branch**:
   ```bash
   git push origin feature-branch
   ```

5. **Open a pull request**.



