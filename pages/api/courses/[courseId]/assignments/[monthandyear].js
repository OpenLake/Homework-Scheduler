import { dbConnect } from '../../../../../lib/db';
import isAuth from '../../../../../middlewares/api/isAuth';
import catchErrors from '../../../../../helpers/api/catchErrors';
import { Assignment, Course, User } from '../../../../../models';
import CustomError from '../../../../../helpers/api/CustomError';
import { format } from 'date-fns';

const countAssignments = assignments => {
	return assignments.reduce((acc, assignment) => {
		const dueDate = new Date(assignment._doc.dueDate);
		const day = format(dueDate, 'dd');
		if (!acc[day]) {
			acc[day] = 1;
		} else {
			acc[day] += 1;
		}
		return acc;
	}, {});
};

const filterAssignments = (assignments, monthandyear) => {
	return assignments.filter(assignment => {
		const dueDate = new Date(assignment._doc.dueDate);
		const monthAndYear = format(dueDate, 'MM-yyyy');
		return monthAndYear === monthandyear;
	});
};

const getAllCourses = students => {
	const courses = [];

	students.forEach(student => {
		student.courses.forEach(course => {
			courses.push(course.toString());
		});
	});

	return [...new Set(courses)];
};

const handler = async (req, res) => {
	if (req.method !== 'GET') {
		throw new CustomError('Method not allowed', 405);
	}

	await dbConnect();
	await isAuth(req, res);

	const { courseId, monthandyear } = req.query;

	const allPromises = Promise.all([
		Course.findById(courseId),
		User.find({ courses: { $in: [courseId] } }),
	]);

	const [course, students] = await allPromises;

	if (!course) {
		throw new CustomError('Course not found', 404);
	}

	// Get all the courses of the students
	const courses = getAllCourses(students);

	// TODO: filter by given month and year directly in the query
	const assignments = await Assignment.find({
		course: { $in: courses },
		assignedTo: { $eq: [] },
	});

	// INFO: This is a hack to get the assignments in the given month and year
	const filteredAssignments = filterAssignments(assignments, monthandyear);

	const assignmentCount = countAssignments(filteredAssignments);

	res.json(assignmentCount);
};

export default catchErrors(handler);
