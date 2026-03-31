import { Theater } from "../types";
import { db, collection, getDocs, query, orderBy, handleFirestoreError, OperationType, doc, updateDoc, deleteDoc } from "../firebase";

export async function getTheatersFromMap(): Promise<Theater[]> {
  const path = 'theaters';
  try {
    const theatersCollection = collection(db, path);
    const q = query(theatersCollection, orderBy('name', 'asc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Theater[];
  } catch (error) {
    if (error instanceof Error && error.message.includes('Missing or insufficient permissions')) {
      handleFirestoreError(error, OperationType.GET, path);
    }
    console.error("Error fetching theaters from Firestore:", error);
    // Return empty array instead of static fallback as requested
    return [];
  }
}

export async function updateTheater(id: string, data: Partial<Theater>): Promise<void> {
  const path = `theaters/${id}`;
  try {
    const theaterRef = doc(db, 'theaters', id);
    await updateDoc(theaterRef, data);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteTheater(id: string): Promise<void> {
  const path = `theaters/${id}`;
  try {
    const theaterRef = doc(db, 'theaters', id);
    await deleteDoc(theaterRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
