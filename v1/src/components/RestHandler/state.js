/*
	@changelog: 
		2019-09-24	bugfix: if result post object had no id it throwed a error, it's now prevent by if cause

*/

export default {
	state: {
		responses : [],
		posts : [],
	},
	mutations: {
		addResponse( state, responseObj ) {
			const resultData = responseObj.response.data.result
			
			// if response has posts, 
			// add them to posts []
			// TODO:2250 add every post only once (filter by id)
			if( Array.isArray( resultData ) ){
				resultData.forEach( post => {
					if( post && post.id && post.slug && post.type ){
						state.posts.push( post )
					}
				})
			}
			
			// add response to responses []
			state.responses.push( responseObj );
		},
	}
}
