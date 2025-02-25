# **Google Cloud Vision API - Deploying an Image Labeling App on Cloud Run**

## **📖 Introduction**
This guide provides a **step-by-step** tutorial for setting up and deploying an **AI-powered image labeling app** using **Google Cloud Vision API** on **Google Cloud Run**. You will learn how to:

- Set up a **Google Cloud project**
- Enable **Vision API**
- Configure **IAM permissions**
- Build a **Docker container**
- Deploy to **Cloud Run**
- Troubleshoot **common issues**

📌 **GitHub Repository:** [image-labeler-gcp](https://github.com/LukeMel/image-labeler-gcp)

---

## **🔹 Prerequisites**
Before you begin, ensure you have:

1. **A Google Cloud Account** with billing enabled.
2. **Google Cloud SDK installed** ([Install Guide](https://cloud.google.com/sdk/docs/install)).  
   ✅ Check if installed:
   ```sh
   gcloud --version
   ```
3. **Set the active Google Cloud Project:**
   ```sh
   gcloud config set project PROJECT_ID
   ```
   ✅ Verify the active project:
   ```sh
   gcloud config get-value project
   ```
4. **Docker installed** ([Install Guide](https://docs.docker.com/get-docker/)).  
   ✅ Check if installed:
   ```sh
   docker --version
   ```
5. **Node.js installed** ([Download Node.js](https://nodejs.org/)).  
   ✅ Check if installed:
   ```sh
   node --version
   ```
6. **Git installed** (Optional, but recommended: [Install Git](https://git-scm.com/)).  
   ✅ Check if installed:
   ```sh
   git --version
   ```
7. **Basic knowledge of command-line usage.**

---


## **1️⃣ Google Cloud Setup**

### **Step 1: Create a Google Cloud Project**
1. Open **Google Cloud Console**: [Google Cloud Console](https://console.cloud.google.com)
2. Click on the **project selector** (top-left dropdown)
3. Click **New Project**
4. **Enter Details:**
   - **Project Name:** `image-labeler-js`
   - **Billing Account:** Select an active billing account (needed for Cloud Run)
   - **Location:** Leave as default
5. Click **Create**
6. Set the project as the active project:
   ```sh
   gcloud config set project image-labeler-js
   ```
7. Verify the active project:
   ```sh
   gcloud config get-value project
   ```

---

**Get the repo:**
```sh
 git clone https://github.com/LukeMel/image-labeler-gcp.git
 cd image-labeler-gcp
```

**Install dependencies:**
```sh
npm install
```

**Test locally:**
```sh
node app.js
```

**Authenticate Google CLI:**
```sh
 gcloud auth login
```

---


### **Step 2: Enable Google Cloud Vision API**
1. Open the **API Library**: [Google Cloud API Library](https://console.cloud.google.com/apis/library)
2. Search for **Cloud Vision API**
3. Click on it and **Enable**
4. Alternatively, enable it via CLI:
   ```sh
   gcloud services enable vision.googleapis.com
   ```

---

### **Step 3: Create a Service Account for Vision API**
1. Open **IAM & Admin** → **Service Accounts**
2. Click **Create Service Account**
3. **Enter details:**
   - **Name:** `vision-api-sa`
   - **Description:** `Service account for Vision API`
4. Click **Create and Continue**
5. **Assign roles:**
   - **Cloud Vision API User**
   - **Artifact Registry Writer**
6. Click **Done**
7. Retrieve the service account email:
   ```sh
   gcloud iam service-accounts list --format="table(email)"
   ```

---

### **Step 4: Generate and Download Service Account Key**
1. Click on the created service account (`vision-api-sa`)
2. Open the **Keys** tab
3. Click **Add Key** → **Create New Key**
4. Select **JSON**, then **Download**
5. Move the file to your project folder:
   ```sh
   mv ~/Downloads/service-account-key.json ./
   ```
6. Alternatively, generate the key using the command line:
   ```sh
   gcloud iam service-accounts keys create service-account-key.json ^
       --iam-account=vision-api-sa@image-labeler-js.iam.gserviceaccount.com
   ```
   *(For Unix, replace `^` with `\`.)*

---

### **Step 8: Deploy to Cloud Run**
1. **Deploy the service:**
   ```sh
   gcloud run deploy image-labeler-js ^
       --image gcr.io/image-labeler-js/image-labeler-js ^
       --platform managed ^
       --region europe-west4 ^
       --allow-unauthenticated ^
       --memory=2Gi
   ```
2. **Copy the generated URL** and open it in a browser.

---

## **🎯 Final Steps**
1. **Open your Cloud Run URL**
2. **Upload an image**
3. **Check the detected labels**

🎉 **Congratulations! You've successfully deployed an AI-powered image labeler!** 🚀

---

## **4️⃣ Cleaning Up: Deleting the Deployment**

Once you're done with the deployment and want to remove it from Google Cloud, follow these steps:

### **Step 9: Delete the Cloud Run Service**
```sh
 gcloud run services delete image-labeler-js --region=europe-west4
```

✅ This removes the Cloud Run service.

### **Step 10: Delete the Docker Image from Artifact Registry**
```sh
 gcloud artifacts docker images delete gcr.io/image-labeler-js/image-labeler-js --delete-tags
```

✅ This removes the container image.

### **Step 11: Delete the Artifact Registry Repository**
```sh
 gcloud artifacts repositories delete image-labeler-js --location=europe-west4
```

✅ This removes the repository storing the Docker images.

### **Step 12: Remove the Service Account Key**

If you no longer need the service account key file, delete it locally:

```sh
rm service-account-key.json
```

✅ This prevents unnecessary credentials from being stored.

### **Step 13: Optional - Delete the Google Cloud Project**

If this project was created only for testing and is no longer needed, you can **delete the entire project**:

```sh
gcloud projects delete image-labeler-js
```

⚠️ **Warning:** This will delete **everything** in the project permanently!

---

👨‍💻 **Author:** Lukas J. Melhus
