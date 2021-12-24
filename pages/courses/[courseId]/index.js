const Index = props => {
	return <div>{props.courseId}</div>;
};

export const getServerSideProps = async ctx => {
	const courseId = ctx.query.courseId;
	return {
		props: {
			courseId,
		},
	};
};

export default Index;
