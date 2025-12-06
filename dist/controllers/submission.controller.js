"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submissionController = void 0;
const submission_service_1 = require("../services/submission.service");
exports.submissionController = {
    async create(req, res) {
        var _a;
        try {
            const { fileId, submissionText, assignmentId } = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId || !assignmentId) {
                console.log('UserId and assignmentId are required');
                return res.status(400).json({
                    error: 'UserId and assignmentId are required',
                });
            }
            if (!fileId && !submissionText) {
                console.log('Either fileId or submissionText is required');
                return res.status(400).json({
                    error: 'Either fileId or submissionText is required',
                });
            }
            const submission = await submission_service_1.submissionService.create({
                fileId,
                submissionText,
                studentId: userId,
                assignmentId,
            });
            res.status(201).json(submission);
        }
        catch (error) {
            console.error('Error creating submission:', error);
            res.status(500).json({ error: 'Failed to create submission' });
        }
    },
    async findAll(req, res) {
        try {
            const submissions = await submission_service_1.submissionService.findAll();
            res.json(submissions);
        }
        catch (error) {
            console.error('Error fetching submissions:', error);
            res.status(500).json({ error: 'Failed to fetch submissions' });
        }
    },
    async findById(req, res) {
        try {
            const { id } = req.params;
            const submission = await submission_service_1.submissionService.findById(id);
            if (!submission) {
                return res.status(404).json({ error: 'Submission not found' });
            }
            res.json(submission);
        }
        catch (error) {
            console.error('Error fetching submission:', error);
            res.status(500).json({ error: 'Failed to fetch submission' });
        }
    },
    async findByStudentId(req, res) {
        try {
            const { id } = req.params;
            const submissions = await submission_service_1.submissionService.findByStudentId(id);
            res.json(submissions);
        }
        catch (error) {
            console.error('Error fetching student submissions:', error);
            res.status(500).json({ error: 'Failed to fetch student submissions' });
        }
    },
    async findByAssignmentId(req, res) {
        try {
            const { assignmentId } = req.params;
            const submissions = await submission_service_1.submissionService.findByAssignmentId(assignmentId);
            res.json(submissions);
        }
        catch (error) {
            console.error('Error fetching assignment submissions:', error);
            res.status(500).json({ error: 'Failed to fetch assignment submissions' });
        }
    },
    async findByAssignmentAndStudentId(req, res) {
        var _a;
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const { assignmentId } = req.params;
            const submissions = await submission_service_1.submissionService.findByAssignmentIdAndStudentId(assignmentId, userId);
            console.log(submissions);
            res.json(submissions);
        }
        catch (error) {
            console.error('Error fetching assignment submissions:', error);
            res.status(500).json({ error: 'Failed to fetch assignment submissions' });
        }
    },
    async grade(req, res) {
        try {
            const { id } = req.params;
            const { grade, feedback } = req.body;
            if (grade === undefined) {
                return res.status(400).json({ error: 'Grade is required' });
            }
            const existingSubmission = await submission_service_1.submissionService.findById(id);
            if (!existingSubmission) {
                return res.status(404).json({ error: 'Submission not found' });
            }
            const submission = await submission_service_1.submissionService.grade(id, {
                grade,
                feedback,
            });
            res.json(submission);
        }
        catch (error) {
            console.error('Error grading submission:', error);
            res.status(500).json({ error: 'Failed to grade submission' });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const { fileId, submissionText, grade, feedback } = req.body;
            const existingSubmission = await submission_service_1.submissionService.findById(id);
            if (!existingSubmission) {
                return res.status(404).json({ error: 'Submission not found' });
            }
            const submission = await submission_service_1.submissionService.update(id, {
                fileId,
                submissionText,
                grade,
                feedback,
            });
            res.json(submission);
        }
        catch (error) {
            console.error('Error updating submission:', error);
            res.status(500).json({ error: 'Failed to update submission' });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const existingSubmission = await submission_service_1.submissionService.findById(id);
            if (!existingSubmission) {
                return res.status(404).json({ error: 'Submission not found' });
            }
            await submission_service_1.submissionService.delete(id);
            res.status(204).send();
        }
        catch (error) {
            console.error('Error deleting submission:', error);
            res.status(500).json({ error: 'Failed to delete submission' });
        }
    },
};
