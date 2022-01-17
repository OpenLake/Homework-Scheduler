import { dbConnect } from '../../../../../lib/db';
import isAuth from '../../../../../middlewares/api/isAuth';
import catchErrors from '../../../../../helpers/api/catchErrors';
import { Assignment, Course, User } from '../../../../../models';
import CustomError from '../../../../../helpers/api/CustomError';
import {
	format,
	startOfMonth,
	endOfMonth,
	parse,
	getDaysInMonth,
} from 'date-fns';

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

	const daysInMonth = getDaysInMonth(
		parse(monthandyear, 'MM-yyyy', new Date()),
	);

	// Get all the courses of the students
	const courses = getAllCourses(students);

	const assignments = await Assignment.find({
		course: { $in: courses },
		assignedTo: { $eq: [] },
		dueDate: {
			$gte: startOfMonth(parse(monthandyear, 'MM-yyyy', new Date())),
			$lte: endOfMonth(parse(monthandyear, 'MM-yyyy', new Date())),
		},
	});

	const course_day_counts = {};

	for (let course of courses) {
		const day_count = Array(daysInMonth).fill(0);

		const course_assignments = assignments.filter(
			assignment => assignment.course.toString() === course,
		);

		course_assignments.forEach(assignment => {
			const dueDate = new Date(assignment._doc.dueDate);
			const day = format(dueDate, 'dd');
			day_count[parseInt(day) - 1] += 1;
		});

		course_day_counts[course] = day_count;
	}

	const comparsion_array = Array(daysInMonth).fill(0);

	for (let student of students) {
		const day_count = Array(daysInMonth).fill(0);

		for (let course of student.courses) {
			const course_day_count = course_day_counts[course.toString()];

			for (let i = 0; i < course_day_count.length; i++) {
				day_count[i] += course_day_count[i];
			}
		}

		for (let i = 0; i < day_count.length; i++) {
			comparsion_array[i] = Math.max(comparsion_array[i], day_count[i]);
		}
	}

	res.json(comparsion_array);
};

export default catchErrors(handler);
