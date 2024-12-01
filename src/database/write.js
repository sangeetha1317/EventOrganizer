
import { firestore } from './config';
import { collection, addDoc } from 'firebase/firestore';

export async function addEvent(data) {
    try{
    const dbCollection = collection(firestore, 'Events');
    const eventsRef = await addDoc(dbCollection, data);
    return eventsRef.id;
  } catch (error) {
    console.error('Error Adding events', error);
    return null;
  }
}