

const conf = {
    appwriteUrl: String(import.meta.env.REACT_APP_APPWRITE_URL),
    appwriteProject: String(import.meta.env.REACT_APP_APPWRITE_PROJECT_ID),
    appwriteDatabase: String(import.meta.env.REACT_APP_APPWRITE_DATABASE_ID),
    appwriteCollection: String(import.meta.env.REACT_APP_APPWRITE_COLLECTION_ID),
    appwriteBucket: String(import.meta.env.REACT_APP_APPWRITE_BUCKET_ID),
}

export default conf;