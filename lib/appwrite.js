import { Client, Account } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform:'com.sil.Aora',
    projectId:'67015895000ff2a2004e',
    databaseId:'67015cfa0033e8494599',
    userCollectionId:'67015d13002bc8373b0d',
    videoCollectionId:'67015d3c000ebf648c7c',
    storageId: '67015f0900075d961e6d',
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.

    const account = new Account(client);

export const createUser = () => {
    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
}

