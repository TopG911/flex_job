import express, { Request, Response } from 'express';
import Job from '../models/Job';

const router = express.Router();

// Define TypeScript interfaces for request body
interface JobRequestBody {
  title: string;
  description: string;
  location: string;
  postedBy: string;
}

// Create a new job
router.post('/', async (req: Request<{}, {}, JobRequestBody>, res: Response) => {
  const { title, description, location, postedBy } = req.body;

  try {
    const job = new Job({ title, description, location, postedBy });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all jobs
router.get('/', async (_req: Request, res: Response) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name email');
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
