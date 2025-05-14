# Threads - A Modern Social Media Application

A full-stack social media application built with Next.js 14, featuring real-time interactions, user authentication, and dynamic content management.

## 🚀 Features

- **Modern Authentication**: Secure user authentication powered by Clerk
- **Real-time Interactions**: Dynamic social media features for user engagement
- **Responsive Design**: Beautiful UI that adapts to all screen sizes
- **File Upload**: Secure file storage using Uploadthing (AWS S3 alternative)
- **Database**: MongoDB with Mongoose ODM for efficient data management
- **Type Safety**: Built with TypeScript for enhanced development experience
- **Styling**: Tailwind CSS and Radix UI components

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Authentication**: Clerk
- **Database**: MongoDB + Mongoose (ODM)
- **File Storage**: Uploadthing
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form + Zod
- **Development**: ESLint, PostCSS

## 🏗️ Project Structure

```
├── app/              # Next.js app directory (pages and API routes)
├── components/       # Reusable React components
├── lib/             # Utility functions and configurations
├── constants/       # Application constants
├── public/          # Static assets
└── middleware.ts    # Next.js middleware for authentication
```

## 🚀 Getting Started

1. **Clone the repository**

    ```bash
    git clone [repository-url]
    cd threads
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**
   Create a `.env.local` file with the following variables:

    ```
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    MONGODB_URI=mongodb://localhost:27017/threads
    UPLOADTHING_SECRET=your_uploadthing_secret
    UPLOADTHING_APP_ID=your_uploadthing_app_id
    CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
    ```

The application uses Clerk webhooks to handle user events. Make sure to:

4. **Set up a webhook endpoint in your Clerk dashboard pointing to:**

    ```
    https://your-domain.com/api/webhook/clerk
    ```
    
5. **Start MongoDB with Docker**

    ```bash
    # Start MongoDB container
    docker-compose up -d

    # To stop the container
    docker-compose down
    ```

    This will start MongoDB with mock data for testing:

    - 3 pre-configured users
    - Database automatically initialized
    - Data persisted in a Docker volume

5. **Run the development server**

    ```bash
    npm run dev
    ```

## Scripts

- `npm run dev` - Start development server

## 🎯 What I Learned

- Dynamic layouts for different screen sizes
- Exploring file storage services like Uploadthing (AWS S3 alternative)
- MongoDB + Mongoose (ODM) integration
- Modern authentication flows with Clerk
- Type-safe form handling with React Hook Form and Zod
- Building responsive and accessible UI components with Radix UI


2. Configure the following events:

    - `user.created`
    - `user.updated`
    - `user.deleted`

3. Copy the webhook signing secret to your `.env.local` file as `CLERK_WEBHOOK_SECRET`

