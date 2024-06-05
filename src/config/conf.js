const conf={
    appwriteUrl:String(process.env.REACT_APP_APPWRITE_URL),
    appwriteProject:String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
    appwriteDatabase:String(process.env.REACT_APP_APPWRITE_DATABASE_ID),
    appwriteCollection:String(process.env.REACT_APP_APPWRITE_COLLECTION_ID),
    appwriteBucket:String(process.env.REACT_APP_APPWRITE_BUCKET_ID),
}

export default conf;