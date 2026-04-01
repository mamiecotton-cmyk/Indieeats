# IndieEats 🍽️

> Local catering, worth discovering.

A catering marketplace for independent restaurants — built under Alyra Solutions.

---

## Tech Stack

- **Frontend**: React + Vite
- **Database**: Supabase
- **Hosting**: Vercel
- **Payments** *(coming soon)*: Stripe Connect
- **Delivery** *(coming soon)*: Uber Direct

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/indieeats.git
cd indieeats
npm install
```

### 2. Set up Supabase
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
4. Go to **Settings → API** and copy your Project URL and anon key

### 3. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` and add your Supabase credentials:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run locally
```bash
npm run dev
```
Visit `http://localhost:5173`

---

## Deploy to Vercel

### Option A — Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B — GitHub Integration (recommended)
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy — Vercel auto-deploys on every push to main

### Connect your domain
1. In Vercel → Project Settings → Domains
2. Add `getindieeats.com`
3. Update your DNS at Namecheap to point to Vercel

---

## Viewing Signups

To see who has signed up:
1. Go to your Supabase dashboard
2. Click **Table Editor**
3. View `restaurant_signups` and `customer_waitlist` tables

---

## Project Structure

```
indieeats/
├── src/
│   ├── components/
│   │   └── IndieEats.jsx      # Main landing page
│   ├── lib/
│   │   └── supabase.js        # Supabase client
│   ├── App.jsx
│   └── main.jsx
├── supabase/
│   └── schema.sql             # Database tables — run in Supabase SQL editor
├── public/
│   └── favicon.svg
├── .env.example               # Copy to .env and fill in your keys
├── vercel.json                # Vercel routing config
├── vite.config.js
└── README.md
```

---

## Roadmap

- [x] Landing page with restaurant + customer signups
- [ ] Restaurant dashboard (menu management, order tracking)
- [ ] Customer browse + search
- [ ] Stripe Connect payments
- [ ] Uber Direct delivery integration
- [ ] Reviews + ratings

---

*Built by Alyra Solutions · getindieeats.com*
