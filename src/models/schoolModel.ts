import { database, ID, Permission, Role, Query } from '../config/appwrite';
import { DATABASE_ID, SCHOOL_COLLECTION_ID } from '../config/environment';

type AdmittanceType = 'hybrid' | 'day' | 'boarding';
type GenderType = 'girls' | 'boys' | 'mixed';

export interface SchoolData {
  name: string;
  address: string;
  numberOfTeachers: number;
  curriculum: string;
  founder: string;
  numberOfStudents: number;
  gender: 'girls' | 'boys' | 'mixed';
  proprietor: string;
  proprietorEducation: string;
  admittance: 'hybrid' | 'day' | 'boarding';
  email: string;
  cacId: string;
  foundingYear: number;
  moeRegistrationId: string;
  status: 'pending' | 'approved' | 'rejected';
  userId: string;
}

// Create a new school
export async function createSchoolInDB(data: SchoolData) {
    return await database.createDocument(
      DATABASE_ID,
      SCHOOL_COLLECTION_ID,
      ID.unique(),
      data,
      [
        Permission.read(Role.any()),  // Public read permission
      ]
    );
}

// Fetch a school by cacId
export async function fetchSchoolByCacIdFromDB(userId: string) {
  const response = await database.listDocuments(DATABASE_ID, SCHOOL_COLLECTION_ID, [
    Query.equal('userId', userId),
  ]);
  return response.documents.length > 0 ? response.documents[0] : null;
}
