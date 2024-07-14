const { buildParamPaging, buildResponsePaging } = require( "../../helper/BuildData.helper" );
const Service = require( "../models/Service.model")

exports.index = async ( req, res ) =>
{
	// destructure page and limit and set default values
	try
	{
		const condition = {};
		const paging = buildParamPaging( req.query );
		// execute query with page and limit values
		const services = await Service.find()
			.where( condition )
			.limit( paging.page_size )
			.skip( ( paging.page - 1 ) * paging.page_size )
			.exec();

		// get total documents in the Posts collection
		const count = await Service.count().where(condition);

		// return response with posts, total pages, and current page
		const meta = buildResponsePaging( paging.page, paging.page_size, count )
		const status = 200;
		const data = {
			services
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
		const service = await Service.findOne( { _id: req.params.id } )
		return res.status( 200 ).json( { data: service, status: 200 } );
	} catch {
		res.status( 404 )
		res.send( { error: "Category doesn't exist!" } )
	}
};

exports.store = async ( req, res ) =>
{
	let data = req.body;
	const category = new Category( data );
	await category.save();
	return res.status( 200 ).json( { data: category, status: 200 } );
};

exports.update = async ( req, res ) =>
{
	try
	{
		const category = await Category.findOne( { _id: req.params.id } )

		if ( req.body.name )
		{
			category.name = req.body.name;
		}

		await category.save();
		return res.status( 200 ).json( { data: category, status: 200 } );
	} catch {
		res.status( 404 )
		res.send( { error: "Category doesn't exist!" } )
	}
};

exports.delete = async ( req, res ) =>
{
	try
	{
		await Category.deleteOne( { _id: req.params.id } )
		return res.status( 200 ).json( { data: [], status: 200 } );
	} catch {
		res.status( 404 )
		res.send( { error: "Menu doesn't exist!" } )
	}
};
