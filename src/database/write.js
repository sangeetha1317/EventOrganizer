
import { firestore } from './config';
import { doc, collection, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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

export async function updateEventFavourite(id, data) {
  try {
      const docRef = doc(firestore, 'Events', id);
      await updateDoc(docRef, data)
      return true;
  } catch (e) {
    console.log('error', e)
      return false;
  }
}

export async function editEvent(id, data) {
  try {
    const docRef = doc(firestore, 'Events', id);
    await updateDoc(docRef, data);
    return true;
  } catch (error) {
    console.error('Error updating event:', error);
    console.error('Error stack:', error.stack);
    return false;
  }
}

export async function deleteEvent(id) {
  try {
    const docRef = doc(firestore, 'Events', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting event:', error);
    return false;
  }
}