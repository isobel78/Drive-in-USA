import { staticTheaters, Theater } from "../data/theaters";
import { db, collection, getDocs, query, orderBy } from "../firebase";

export type { Theater };

export async function getTheatersFromMap(): Promise<Theater[]> {
  try {
    const theatersCollection = collection(db, 'theaters');
    const q = query(theatersCollection, orderBy('name', 'asc'));
    const snapshot = await getDocs(q);
    
    const firestoreTheaters = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Theater[];

    // Merge static theaters with those from Firestore
    // We use a Map to avoid duplicates if a theater exists in both
    const theaterMap = new Map<string, Theater>();
    
    staticTheaters.forEach(t => theaterMap.set(t.name, t));
    firestoreTheaters.forEach(t => theaterMap.set(t.name, t));

    return Array.from(theaterMap.values());
  } catch (error) {
    console.error("Error fetching theaters from Firestore:", error);
    return staticTheaters;
  }
}
