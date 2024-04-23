import {app} from '../firebaseConfig'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const useStorage = (file, setProgress) => {
  let url = '';
  let error = null;


    const storage = getStorage(app);
    const storageRef = ref(storage, `gs://chat-2bf5c.appspot.com/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const { bytesTransferred, totalBytes } = snapshot;
        const uploadProgress = Math.round((bytesTransferred / totalBytes) * 100);
        // setProgress(uploadProgress);
        console.log(uploadProgress)
      },
      (err) => {
        console.log('err1', err);
      },
      async () => {
        try {
          // Make the file public after upload
          // await makePublic(uploadTask.snapshot.ref);
          const downloadURL = await getDownloadURL(storageRef);
          url = downloadURL;
        } catch (err) {
          console.log("err2",err)
        }
      }
    );


  return { url, error };
};

export default useStorage;
