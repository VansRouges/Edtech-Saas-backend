import { Request, Response } from 'express';
import { createAssignmentInDB, AssignmentData, fetchAssignmentsFromDB } from '../models/assignmentModel';
import { syncUserToPermitAssigment } from '../middlewares/permitMiddleware';

// Create a new assignment
export async function createAssignment(req: Request<{}, {}, AssignmentData>, res: Response): Promise<void> {
    try {
        const { title, subject, teacher, className, dueDate, creatorEmail }: AssignmentData = req.body;

        const isPermitted = await syncUserToPermitAssigment(creatorEmail);
        if (!isPermitted) {
            res.status(403).json({ error: 'Not authorized' });
            return;
        }

        const newAssignment = await createAssignmentInDB({ 
            title,
            subject,
            teacher,
            className,
            dueDate,
            creatorEmail
        });
        res.status(201).json(newAssignment);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }   
}

// Fetch all assignments
export async function fetchAssignments(req: Request, res: Response): Promise<void> {
    try {
        const assignments = await fetchAssignmentsFromDB();
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
}