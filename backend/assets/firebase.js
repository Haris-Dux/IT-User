// firebaseFunctions.js
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import firebaseConfig from "../config/firebase.config.js";

initializeApp(firebaseConfig);

const storage = getStorage();

const uploadFileToFirebase = async (file,folder) => {
    console.log(file)
    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `${folder}/${file.originalname + "       " + dateTime}`);

        const metadata = {
            contentType: file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);

        const downloadURL = await getDownloadURL(snapshot.ref);
        const result = {
            name: file.originalname,
            type: file.mimetype,
            downloadURL: downloadURL
        };
        console.log(result)
        return result;
    } catch (error) {
        throw error;
    }
};

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
};

export { uploadFileToFirebase };
