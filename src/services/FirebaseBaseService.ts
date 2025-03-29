import { db } from "@/firebase";
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

interface Object {
    id: string;
    [key: string]: any;
}

interface CreateObject {
    [key: string]: any;
}

interface UpdateObject {
    [key: string]: any;
}

export class FirebaseBaseService<
    O extends Object,
    cO extends CreateObject,
    uO extends UpdateObject
> {
    protected collectionRef: ReturnType<typeof collection>;

    constructor(collectionName: string) {
        this.collectionRef = collection(db, collectionName);
    }

    // GET
    async getAll(): Promise<O[]> {
        try {
            const querySnapshot = await getDocs(this.collectionRef);
            const results: O[] = [];
            querySnapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() } as O);
            });
            return results;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    // GET by id
    async getById(id: string): Promise<O> {
        try {
            const docRef = doc(this.collectionRef, id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() } as O;
            } else {
                throw new Error("Document not found");
            }
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    // POST
    async create(params: cO): Promise<O> {
        try {
            const docRef = await addDoc(this.collectionRef, params);
            const docSnap = await getDoc(docRef);
            return { id: docSnap.id, ...docSnap.data() } as O;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    // PUT
    async update(id: string, params: uO): Promise<O> {
        try {
            const updateFields = Object.entries(params).reduce(
                (acc, [key, value]) => {
                    if (value !== null && value !== undefined) {
                        (acc as any)[key] = value;
                    }
                    return acc;
                },
                {} as uO
            );

            if (Object.keys(updateFields).length === 0) {
                throw new Error("No valid fields to update");
            }

            const docRef = doc(this.collectionRef, id);
            await updateDoc(docRef, updateFields);

            const updatedDoc = await getDoc(docRef);
            return { id: updatedDoc.id, ...updatedDoc.data() } as O;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    // DELETE
    async delete(id: string): Promise<void> {
        try {
            const docRef = doc(this.collectionRef, id);
            await deleteDoc(docRef);
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}
