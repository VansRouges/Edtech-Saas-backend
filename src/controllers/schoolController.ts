import { createSchoolInDB, fetchSchoolByCacIdFromDB } from '../models/schoolModel';
import { Request, Response } from 'express';

interface School {
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

export async function createSchool(req: Request, res: Response): Promise<void> {
    try {
        const { name, address, numberOfTeachers, curriculum, founder, numberOfStudents, gender, proprietor, proprietorEducation, admittance, email, cacId, foundingYear, moeRegistrationId, status, userId }: School = req.body;

        if (!['hybrid', 'day', 'boarding'].includes(admittance)) {
            res.status(400).json({ error: 'Invalid admittance type' });
            return;
        }

        if (!['girls', 'boys', 'mixed'].includes(gender)) {
            res.status(400).json({ error: 'Invalid gender type' });
            return;
        }

        const newSchool = await createSchoolInDB({
            name,
            address,
            numberOfTeachers,
            curriculum,
            founder,
            numberOfStudents,
            gender,
            proprietor,
            proprietorEducation,
            admittance,
            email,
            cacId,
            foundingYear,
            moeRegistrationId,
            status,
            userId
        });

        res.status(201).json(newSchool);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
}

export async function getSchoolByCacId(req: Request, res: Response): Promise<void> {
    try {
        const { userId } = req.params;
        const school = await fetchSchoolByCacIdFromDB(userId);

        if (!school) {
            res.status(404).json({ error: 'School not found' });
            return;
        }

        res.status(200).json(school);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
}
