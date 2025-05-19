# X/Twitter Clone - Social Media Platform

A full-stack, responsive Twitter/X clone built with **Next.js 15**, replicating core social media functionalities such as user authentication, post creation, likes, comments, and real-time chat. This project showcases a modern, scalable web application with a sleek, X-inspired UI, leveraging **server-side rendering**, **TypeScript**, and a robust tech stack for performance and developer experience.

## ✨ Features

- **Secure Authentication**: User registration and login with Lucia Auth and OAuth support via Arctic.
- **Dynamic Feed**: Create, like, and comment on posts in real-time.
- **Rich Text Posts**: Compose posts with a rich text editor powered by Tiptap.
- **Image Uploads**: Upload and crop images using UploadThing and Cropper.js.
- **Real-Time Chat**: Integrated chat functionality with Stream Chat.
- **Responsive Design**: Mobile and desktop-friendly UI with theme support (light/dark) via Next Themes.
- **Performance**: Optimized with Next.js SSR, ISR, and Turbopack for faster development.
- **Developer-Friendly**: Type-safe code with TypeScript, linting with ESLint, and automated formatting with Prettier.

## 🛠 Tech Stack

- **Frontend**:
  - Next.js 15 (React 19)
  - Tailwind CSS + Tailwind Animate
  - Radix UI (Dialog, Dropdown, Tabs, Toast, Tooltip)
  - Lucide React (icons)
  - Tiptap (rich text editor)
  - Tanstack React Query (data fetching)
- **Backend**:
  - Prisma (ORM)
  - Lucia Auth + Arctic (authentication)
  - UploadThing (file uploads)
  - Stream Chat (real-time messaging)
- **Validation & Utilities**:
  - Zod (schema validation)
  - React Hook Form
  - Class Variance Authority (styling utilities)
- **Development Tools**:
  - TypeScript
  - ESLint + Prettier (code quality)
  - Husky + Lint-Staged (Git hooks)
  - Commitizen (standardized commits)
  - Turbopack (Next.js dev server)

## 📸 Screenshots

<!-- Add screenshots of your app here -->

- _Home Feed_: (Coming soon)
- _User Profile_: (Coming soon)
- _Chat Interface_: (Coming soon)

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- A PostgreSQL database (or other Prisma-compatible DB)
- API keys for UploadThing, Stream Chat, and any OAuth providers (if used)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/social-media-clone.git
   cd social-media-clone
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up environment variables:
   ```bash
   POSTGRES_URL=
   POSTGRES_URL_NON_POOLING=
   POSTGRES_USER=
   POSTGRES_HOST=
   POSTGRES_PASSWORD=
   POSTGRES_DATABASE=
   POSTGRES_URL_NO_SSL=
   POSTGRES_PRISMA_URL=
   UPLOADTHING_APP_ID=
   UPLOADTHING_TOKEN=
   NEXT_PUBLIC_STREAM_KEY=
   STREAM_SECRET=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```
4. Run database migrations:
   ```bash
   pnpm prisma generate
   pnpm prisma migrate dev
   ```
5. Start the development server:
   ```bash
   pnpm run dev
   ```

## 🌟 Acknowledgements

```text
- Inspired by the simplicity and power of X/Twitter.
- Built with the amazing Next.js ecosystem and open-source libraries.
```
