import { adminDb } from "@/lib/firebaseAdmin";

interface BaseObject {
    id: string;
    [key: string]: any;
}

export class FirebaseBaseService<O extends BaseObject> {
    protected collectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

    constructor(collectionName: string) {
        this.collectionRef = adminDb.collection(collectionName);
    }

    // GET ALL
    async getAll(): Promise<O[]> {
        const snapshot = await this.collectionRef.get();
        return snapshot.docs.map(
            (doc) =>
                ({
                    id: doc.id,
                    ...doc.data(),
                } as O)
        );
    }

    // GET by ID
    async getById(id: string): Promise<O | null> {
        const docSnap = await this.collectionRef.doc(id).get();
        if (!docSnap.exists) {
            return null;
        }
        return { id: docSnap.id, ...docSnap.data() } as O;
    }

    // CREATE
    async create(data: Partial<O>): Promise<string> {
        const docRef = await this.collectionRef.add(data);
        return docRef.id;
    }

    // UPDATE
    async update(id: string, data: Partial<O>): Promise<void> {
        await this.collectionRef.doc(id).update(data);
    }

    // DELETE
    async delete(id: string): Promise<void> {
        await this.collectionRef.doc(id).delete();
    }
}
