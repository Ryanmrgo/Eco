# 🌿🐝 Eco Hive

A Smart & Cute Way to Save the Planet

## 💡 Overview

Eco Hive is a fun and eco-friendly platform designed to help people take care of the environment together. Just like a real beehive, everyone plays a role! 🐝✨

The app encourages users to report waste, recycle properly, and earn rewards for helping keep the city clean. With a mix of smart technology and community power, Eco Hive makes sustainability simple, engaging, and rewarding.

## 🌎 What Makes Eco Hive Special?

- 🌱 **Eco-Friendly Actions Made Easy**
  Report trash, learn recycling tips, and make a real impact in your area.
- 📍 **Smart Location Tracking**
  Easily mark where waste is found using maps for faster cleanup.
- 🤖 **AI Assistant Buddy**
  Get help from a friendly chatbot that guides you on waste sorting and eco habits.
- 🎁 **Reward System**
  Earn points for your actions and redeem them for vouchers, discounts, or goodies!
- 📸 **AI Waste Detection**
  Upload images and let AI estimate waste type and quantity.

## 🐝 Why “Eco Hive”?

Because teamwork makes the dream work!
Eco Hive brings people together like a hive — small actions from many users create a big environmental impact. 💚

## 🎯 Goal

To build cleaner, smarter cities by encouraging people to care for their environment in a fun and interactive way.

## 🚀 Vision

A world where technology and community work hand-in-hand to create a greener, healthier future.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Environment setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in your real values in `.env.local` – in particular `MONGODB_URI`:
   ```
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net
   ```
   * Use a [MongoDB Atlas](https://www.mongodb.com/atlas) SRV connection string.
   * If no database name is included in the URI the app defaults to `quickcart`.
   * The app will throw a clear startup error if `MONGODB_URI` is not set.

> ⚠️ **Never commit `.env` or `.env.local`.** They are listed in `.gitignore`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
