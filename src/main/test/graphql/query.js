var {GraphQLObjectType, GraphQLString} = require("graphql");
var {movieType} = require("./movieType");

var queryType = new GraphQLObjectType({
    name : "Query",
    fields:{
        hello :{
            type : GraphQLString,
            resolve : ()=>{
                return "GrapHQL xin chào";
            }
        },
        movie : {
            type : movieType,
            args : 
        }
    }
});

exports.queryType = queryType;