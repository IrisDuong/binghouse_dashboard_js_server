const {GraphQLString,GraphQLObjectType,GraphQLID,GraphQLInt} = require("graphql")
movieType = new GraphQLObjectType({
    name : "Movie",
    fields : {
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        year : {type : GraphQLInt}
    }
});
exports.movieType = movieType;