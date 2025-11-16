# Vercel Deployment Guide for MERN-Shop

## Prerequisites
- GitHub account
- Vercel account (free tier works)
- MongoDB Atlas account (for production database)

---

## Part 1: Deploy Backend (API) to Vercel

### Step 1: Prepare Backend Repository
1. Create a **separate** GitHub repository for backend only:
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial backend commit"
   git branch -M main
   git remote add origin <your-backend-repo-url>
   git push -u origin main
   ```

### Step 2: Set Up MongoDB Atlas (Production Database)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Go to **Database Access** → Add Database User (username/password)
4. Go to **Network Access** → Add IP Address → **Allow Access from Anywhere** (0.0.0.0/0)
5. Get connection string:
   - Click **Connect** → **Connect your application**
   - Copy connection string (looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/`)
   - Replace `<password>` with your actual password
   - Add database name: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mern-shop`

### Step 3: Deploy Backend to Vercel
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **Add New** → **Project**
4. Import your **backend repository**
5. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (or leave blank)
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty

### Step 4: Add Environment Variables in Vercel
In Vercel project settings → **Environment Variables**, add:

```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mern-shop
ORIGIN=https://your-frontend-url.vercel.app
EMAIL=your-email@gmail.com
PASSWORD=your-app-password
LOGIN_TOKEN_EXPIRATION=30d
OTP_EXPIRATION_TIME=120000
PASSWORD_RESET_TOKEN_EXPIRATION=2m
COOKIE_EXPIRATION_DAYS=30
SECRET_KEY=your-super-secret-key-here
PRODUCTION=true
NODE_ENV=production
```

### Step 5: Deploy
- Click **Deploy**
- Wait for deployment to complete
- Copy your backend URL (e.g., `https://your-backend.vercel.app`)

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Update Frontend Environment Variables
Update `frontend/.env`:
```env
VITE_APP_BASE_URL=https://your-backend.vercel.app
```

### Step 2: Update Backend CORS Origin
Go back to Vercel backend → **Settings** → **Environment Variables**
Update `ORIGIN` with your frontend URL once deployed.

### Step 3: Build Frontend Locally (Test)
```bash
cd frontend
npm run build
```
Make sure build succeeds without errors.

### Step 4: Create Frontend Repository
```bash
cd frontend
git init
git add .
git commit -m "Initial frontend commit"
git branch -M main
git remote add origin <your-frontend-repo-url>
git push -u origin main
```

### Step 5: Deploy Frontend to Vercel
1. In Vercel, click **Add New** → **Project**
2. Import your **frontend repository**
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (or leave blank)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 6: Add Frontend Environment Variables
In Vercel project settings → **Environment Variables**:
```env
VITE_APP_BASE_URL=https://your-backend.vercel.app
```

### Step 7: Deploy
- Click **Deploy**
- Wait for deployment
- Your app will be live at `https://your-app.vercel.app`

---

## Part 3: Update CORS & Final Configuration

### Update Backend ORIGIN
1. Go to Vercel backend project
2. **Settings** → **Environment Variables**
3. Update `ORIGIN` variable with your frontend URL:
   ```
   ORIGIN=https://your-frontend.vercel.app
   ```
4. **Redeploy** backend (go to Deployments → click ⋯ → Redeploy)

---

## Part 4: Seed Production Database (Optional)

### Option 1: Seed via Local Connection
```bash
cd backend
# Update .env with production MongoDB URL temporarily
node seedBrandsCategories.js
node addProducts.js
```

### Option 2: Create Admin User via API
Use Postman or Thunder Client to make POST request to:
```
POST https://your-backend.vercel.app/auth/signup
Body:
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123"
}
```

Then manually update the user in MongoDB Atlas:
- Go to MongoDB Atlas → Browse Collections
- Find your user → Edit
- Set `isVerified: true` and `isAdmin: true`

---

## Alternative: Deploy Both in One Repository (Monorepo)

If you want to deploy both from one repo:

### Structure:
```
mern-shop/
├── backend/
│   ├── vercel.json
│   └── ...
└── frontend/
    └── ...
```

### Deploy:
1. **Backend**: 
   - Root Directory: `backend`
   - Keep vercel.json in backend folder

2. **Frontend**:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

---

## Troubleshooting

### Backend Issues:
- **CORS Error**: Check `ORIGIN` env variable matches frontend URL
- **Database Connection**: Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- **Cookie Issues**: Ensure `PRODUCTION=true` and frontend uses HTTPS

### Frontend Issues:
- **API Not Working**: Check `VITE_APP_BASE_URL` is correct
- **Build Fails**: Run `npm run build` locally to see errors
- **Environment Variables**: Must start with `VITE_` prefix

### General:
- Check Vercel **Functions** logs for backend errors
- Check browser console for frontend errors
- Redeploy after changing environment variables

---

## Post-Deployment Checklist
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Database seeded with brands, categories, products
- [ ] Admin user created and verified
- [ ] Test login/signup
- [ ] Test adding products to cart
- [ ] Test checkout flow
- [ ] Test admin dashboard

---

## Custom Domain (Optional)
1. Go to Vercel project → **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Update `ORIGIN` in backend environment variables

---

## Important Notes
- Vercel free tier has limitations on execution time (10s for hobby, 60s for pro)
- Use MongoDB Atlas free tier (512MB) for testing
- Keep `.env` files secure and never commit them
- Use strong SECRET_KEY for production
- Enable 2FA on Gmail for app passwords
