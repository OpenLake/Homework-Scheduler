import { useRouter } from 'next/router';

import isAuth from '../../middlewares/isAuth';
import webRoutes from '../../helpers/webRoutes';

import { Assignment, Submission } from '../../models/';

import { format } from 'date-fns';
import {
	Container,
	List,
	ListItemButton,
	ListItemText,
	ListItemAvatar,
	Avatar,
	Typography,
	Icon,
	Divider,
} from '@mui/material';

import CollapsibleList from '../../components/Utils/CollapsibleList';

const TodoItem = ({ todo }) => {
	const router = useRouter();

	const onClick = () => {
		router.push(`/courses/${todo.course._id}/assignments/${todo._id}`);
	};

	return (
		<ListItemButton onClick={onClick}>
			<ListItemAvatar>
				<Avatar>
					<Icon>assignment</Icon>
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={todo.title} secondary={todo.course.name} />
			<Typography variant="body1" color="secondary">
				{format(new Date(todo.dueDate), 'MMM dd, yyyy')}
			</Typography>
		</ListItemButton>
	);
};

const Todo = props => {
	const todos = JSON.parse(props.todos);

	return (
		<Container sx={{ mt: 2 }}>
			<Typography variant="h4" gutterBottom>
				{'Upcoming Assignments'}
			</Typography>
			<Divider />
			<List>
				<CollapsibleList
					title="Missing"
					titleColor="error"
					list={todos.missing}
					listItem={todo => <TodoItem todo={todo} key={todo._id} />}
					showCount
				/>
				<CollapsibleList
					title="This Week"
					list={todos.thisWeek}
					listItem={todo => <TodoItem todo={todo} key={todo._id} />}
					showCount
				/>
				<CollapsibleList
					title="Next Week"
					list={todos.nextWeek}
					listItem={todo => <TodoItem todo={todo} key={todo._id} />}
					showCount
				/>
				<CollapsibleList
					title="Later"
					list={todos.later}
					listItem={todo => <TodoItem todo={todo} key={todo._id} />}
					showCount
				/>
			</List>
		</Container>
	);
};

export const getServerSideProps = isAuth(async (ctx, user) => {
	const [assignments, submissions] = await Promise.all([
		Assignment.find({
			course: { $in: user.courses },
		}).populate('course'),
		Submission.find({
			submittedBy: user._id,
		}),
	]);

	const todos = assignments.filter(assignment => {
		const submission = submissions.find(submission => {
			return (
				submission._doc.assignment.toString() === assignment._doc._id.toString()
			);
		});
		return !submission;
	});

	const category_wise_todos = todos.reduce(
		(acc, todo) => {
			const dueDate = new Date(todo.dueDate);
			const today = new Date();
			const diff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
			if (dueDate < today) {
				acc.missing.push(todo);
			} else if (diff <= 7) {
				acc.thisWeek.push(todo);
			} else if (diff <= 14) {
				acc.nextWeek.push(todo);
			} else {
				acc.later.push(todo);
			}
			return acc;
		},
		{
			missing: [],
			thisWeek: [],
			nextWeek: [],
			later: [],
		},
	);

	return {
		props: { todos: JSON.stringify(category_wise_todos) },
	};
}, webRoutes.todo);

export default Todo;
