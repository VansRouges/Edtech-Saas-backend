import {
    createStudentInDB,
    fetchStudentsFromDB,
    StudentData
} from '../models/studentModel';
import { Request, Response } from 'express';
import { syncUserToPermit } from '../middlewares/permitMiddleware';


export async function createStudent(req: Request, res: Response): Promise<void> {
    try {
        const { firstName, lastName, gender, className, gpa, creatorEmail }: StudentData = req.body;

        if (!['girls', 'boys'].includes(gender)) {
            res.status(400).json({ error: 'Invalid gender type' });
            return;
        }

        const isPermitted = await syncUserToPermit(creatorEmail);
        if (!isPermitted) {
            res.status(403).json({ error: 'Not authorized' });
            return;
        }

        const newStudent = await createStudentInDB({ 
            firstName,
            lastName,
            gender,
            className,
            gpa,
            creatorEmail
        });
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }   
}

// Fetch all students
export async function fetchStudents(req: Request, res: Response): Promise<void> {
    try {
        const students = await fetchStudentsFromDB();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
}