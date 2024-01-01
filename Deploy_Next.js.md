## Deploying to Vercel

1. Install vercel cli
   To deploy your Next.js app to Vercel, you can use the Vercel CLI.
   If you haven't installed the Vercel CLI, you can do so by running:

    ```js
    npm install -g vercel
    ```

2. Login vercel using GitHub

    ```
    vercel login
    ```

    choose Continue with Github

3. Deploy your project by running:

    ```
    vercel
    ```

    - ? Set up and deploy? Y
    - ? Which scope do you want to deploy to? <your account>
    - ? Link to existing project? N
    - ? What’s your project’s name? <your project name, become your deploy link>
    - ? In which directory is your code located? ./
    - Auto-detected Project Settings (Next.js):
    - ? Want to modify these settings? N

4. Building... and you can see your app preview link (if there is no error)

5. To deploy to production run `vercel --prod`. Building... and your production link ready.

6. Go to your Vercel Dashboard > choose related project > settings > Environment Variables and input Key & Value of your .env

7. Go to project page (dashboard), go to bottom on section `Active Branches`, choose `Redeploy` on (···) dropdown menu

8. Check your project, make sure everything running well. To check log (error) you can go to `Logs` page (Runtime Logs) from project dashboard
