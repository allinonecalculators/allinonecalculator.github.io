# Deploying SmartCalc on GitHub Pages (100% Free Hosting)

This guide walks you through deploying **SmartCalc** to **GitHub Pages** with zero hosting costs, free SSL certificate (HTTPS), and automated CI/CD deployment on every git push.

---

## 📋 What You Need
- A free GitHub account ([github.com](https://github.com)).
- Your project code (already built, tested, and versioned on your machine).

---

## 🚀 Step 1: Create a New GitHub Repository

1. Open your browser and go to [https://github.com/new](https://github.com/new).
2. Enter a repository name (e.g., `smartcalc` or `AllinoneCalculator`).
3. Choose **Public** (GitHub Pages is 100% free for public repositories).
4. **Important:** Leave "Add a README file", "Add .gitignore", and "Choose a license" **UNCHECKED** (we already have all of them in our project).
5. Click **Create repository**.

---

## 🚀 Step 2: Push Your Code to GitHub

Copy your GitHub repository URL (e.g., `https://github.com/<your-username>/smartcalc.git`).

In your terminal or PowerShell, run the following commands from your project directory (`c:\Yash\Antigravity\AllinoneCalculator`):

```bash
# 1. Add your GitHub repository as remote origin (replace with your actual GitHub URL)
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git

# 2. Ensure your branch is named main
git branch -M main

# 3. Push your code to GitHub
git push -u origin main
```

*(If prompted, sign in to your GitHub account using your browser or personal access token).*

---

## 🚀 Step 3: Enable GitHub Pages in 2 Clicks

Once your code is pushed to GitHub:

1. Go to your repository on [GitHub.com](https://github.com).
2. Click on the **Settings** tab at the top right of the repository.
3. In the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - In the **Source** dropdown, select **GitHub Actions** (NOT "Deploy from a branch").
5. That's it!

---

## 🚀 Step 4: Watch It Deploy Automatically!

1. Click on the **Actions** tab at the top of your repository.
2. You will see a workflow named **"Deploy SmartCalc to GitHub Pages"** running automatically:
   - ✅ Installs dependencies (`npm ci`)
   - ✅ Runs automated unit tests (`npm run test`)
   - ✅ Compiles static export (`npm run build`)
   - ✅ Deploys to GitHub Pages
3. When the workflow completes (takes ~1-2 minutes), click on the run to see your live URL:
   ```
   https://<your-username>.github.io/<your-repo-name>/
   ```
   *Or directly on your custom domain if configured.*

---

## 🌐 Free Custom Domain Setup (Optional)

If you own a custom domain (such as `smartcalc.io`):
1. In your GitHub repository, go to **Settings** > **Pages**.
2. Under **Custom domain**, type your domain (e.g. `smartcalc.io`) and click **Save**.
3. Check the box **Enforce HTTPS** (GitHub provides a free SSL certificate automatically).
4. In your domain registrar (GoDaddy, Namecheap, Cloudflare, Google Domains), add standard GitHub Pages DNS records:
   - **Apex domain (`@`):**
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **Subdomain (`www`):** CNAME pointing to `<your-username>.github.io`.

---

## 🛠️ Summary of Built-in Deployment Safeguards

Your project already includes the following production configurations:
- **`.nojekyll`**: Tells GitHub Pages to serve Next.js `_next/` static JavaScript chunks without 404 errors.
- **`output: 'export'`**: Zero server dependencies; pure client-side static HTML.
- **Trailing Slashes**: Enforces clean URL routing on static hosting (`/finance/sip-calculator/index.html`).
- **Automated CI/CD**: Pushing any code update to `main` automatically tests, builds, and deploys without manual intervention.

