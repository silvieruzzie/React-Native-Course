import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';


export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform:'com.sil.Aora',
    projectId:'67015895000ff2a2004e',
    databaseId:'67015cfa0033e8494599',
    userCollectionId:'67015d13002bc8373b0d',
    videoCollectionId:'67015d3c000ebf648c7c',
    storageId: '67015f0900075d961e6d',
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(projectId) // Your project ID
    .setPlatform(platform) // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export async function createUser(email, password, username) {
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
      );
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    const newUser = await databases.createDocument(
        config.databaseId, 
        config.userCollectionId, 
        ID.unique(), 
        {
            accountId: newAccount.$id,
            email: email,
            username: username,
            avatar: avatarUrl
        }
    )
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function signIn(email, password) {
    try {
        // Check for existing sessions
        const sessions = await account.listSessions();

        // If there are active sessions, log them out
        if (sessions.total > 0) {
            // Loop through each session and delete it
            for (const session of sessions.sessions) {
                await account.deleteSession(session.$id); // Log out of each session
            }
            console.log("All active sessions have been terminated.");
        }

        // Create a new session
        const newSession = await account.createEmailPasswordSession(email, password);
        return newSession;
    } catch (error) {
      throw new Error(error);
    }
  }



export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if(!currentAccount) throw Error

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )
    if(!currentUser) throw Error;
    return currentUser.documents[0]
  } catch (error) {
    console.log(error)
  }
}

export const getAllPosts = async () => {
  try {
    const posts= await databases.listDocuments(
      databaseId,
      videoCollectionId
    )

    return posts.documents;
  } catch (error) {
      throw new Error(error);
  }
}

export const getLatestPosts = async () => {
    try {
      const posts= await databases.listDocuments(
        databaseId,
        videoCollectionId,
        [Query.orderDesc('$createdAt', Query.limit(7))]
      )
  
      return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
  }
  
export const getUserPosts = async (query) => {
try {
    const posts= await databases.listDocuments(
    databaseId,
    videoCollectionId,
    [Query.search('title', query)]
    )

    return posts.documents;
} catch (error) {
    throw new Error(error);
}
}

export const searchPosts = async (userId) => {
    try {
      const posts= await databases.listDocuments(
        databaseId,
        videoCollectionId,
        [Query.equal('creator', userId)]
      )
  
      return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
  }
  
  export async function signOut() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }
  