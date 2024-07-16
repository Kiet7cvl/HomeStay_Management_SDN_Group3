const Vote = require( "../models/Vote.model" );
const RoomController = require( "./Room.controller" );

exports.index = async ( req, res ) =>
{
	// destructure page and limit and set default values
	const page = req.query.page || 1; const page_size = req.query.page_size  || 10;

	try
	{
		const condition = {};
		if ( req.query.user_id ) condition.user_id = req.query.user_id;
		if ( req.query.room_id ) condition.room_id = req.query.room_id;
		if ( req.query.vote_number ) condition.vote_number = req.query.vote_number;

		// execute query with page and limit values
		const votes = await Vote.find()
			.where( condition )
			.limit( page_size )
			.skip( ( page - 1 ) * page_size )
			.populate( [ 'user', 'room' ] )
			.exec();

		// get total documents in the Posts collection
		const count = await Vote.count().where(condition);

		// return response with posts, total pages, and current page
		const meta = {
			total_page: Math.ceil( count / page_size ),
			total: count,
			current_page: parseInt( page ),
			page_size: parseInt( page_size )
		}
		const status = 200;
		const data = {
			votes: votes
		}
		res.json( {
			data,
			meta,
			status
		} );
	} catch ( err )
	{
		console.error( err.message );
	}
};

exports.show = async ( req, res ) =>
{
	try
	{
		const vote = await Vote.findOne( { room: req.params.id } )
		return res.status( 200 ).json( { data: vote, status: 200 } );
	} catch {
		res.status( 404 )
		res.send( { error: "Vote doesn't exist!" } )
	}
};

exports.getCommentByRoomId = async ( req, res ) =>
	{
		try
		{
			const vote = await Vote.find( { room_id: req.params.id } ).populate('user')
			return res.status( 200 ).json( { data: vote, status: 200 } );
		} catch {
			res.status( 404 )
			res.send( { error: "Vote doesn't exist!" } )
		}
	};

exports.store = async ( req, res ) =>
{
	try
	{
		let data = req.body;
		const vote = new Vote( data );
		await vote.save();
		await RoomController.updateVoting(data, 1);
		return res.status( 200 ).json( { data: vote, status: 200 } );
	} catch(e) {
		res.status( 200 )
		res.send( { status: 400, message: e.message || 'Reviews error' } )
	}
};

exports.update = async ( req, res ) =>
{
	try
	{
		const vote = await Vote.findOne( { _id: req.params.id } );

		if ( req.body.vote_content )
		{
			vote.vote_content = req.body.vote_content;
		}
		if ( req.body.vote_number )
		{
			vote.vote_number = req.body.vote_number;
		}
		

		await vote.save();
		await RoomController.updateVoting(vote, 0);
		return res.status( 200 ).json( { data: vote, status: 200 } );
	} catch {
		res.status( 404 )
		res.send( { error: "Review error!" } )
	}
};

exports.delete = async ( req, res ) =>
{
	try
	{
		const vote = await Vote.findOne( { _id: req.params.id } );
		await Vote.deleteOne( { _id: req.params.id } );
		await RoomController.updateVoting({room_id: vote.room_id, vote_number: vote.vote_number}, -1);
		return res.status( 200 ).json( { data: [], status: 200 } );
	} catch {
		res.status( 404 )
		res.send( { error: "Menu doesn't exist!" } )
	}
};
