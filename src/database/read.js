import { collection, getDocs, query, where } from 'firebase/firestore';
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