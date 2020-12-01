const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')

// HardCoded data
const customers = [
    {id: '1', name: 'John Doe', email: 'jdoe@gmail.com', age: 35},
    {id: '2', name: 'Jane Pickett', email: 'pickett@gmail.com', age: 19},
    {id: '3', name: 'Cole Smith', email: 'smit@gmail.com', age: 41}

]

// Customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type:GraphQLString},
        name: {type:GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt},
    })
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args) {
                 for(let i = 0; i < customers.length; i++) {
                     if(customers[i].id === args.id) {
                         return customers[i]
                     }
                 }
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args) {
                return customers;
            }
        }
    }

})

module.exports = new GraphQLSchema({
    query: RootQuery
})