import { collection, getDocs, getDoc, query, where, doc } from 'firebase/firestore';
import { firestore } from './config';

export async function fetchEvents(email) {
    const dbCollection = collection(firestore, 'Events')
    const dbQuery = query(dbCollection, where('email', "==", email))
    const querySnapshot = await getDocs(dbQuery);

    return processQuerySnapshot(querySnapshot)
}

function processQuerySnapshot(querySnapshot) {
    const data = [];

    querySnapshot.forEach((doc) => {
        data.push({
            ...doc.data(),
            id: doc.id
        });
    });
    return data;
}

export async function fetchEventById(id) {
    const docRef = doc(firestore, "Events", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return {
            id: docSnap.id,  
            ...docSnap.data()
        };
    } else {
        console.log("No such document!");
    }

}

export async function getFavouriteEvents(email) {
    const dbCollection = collection(firestore, 'Events')
    const dbQuery = query(dbCollection, where('favourite', '==', true), where('email', '==', email)
    );
    const querySnapshot = await getDocs(dbQuery);

    return processQuerySnapshot(querySnapshot)

   

}