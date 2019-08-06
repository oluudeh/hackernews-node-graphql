const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')
const Vote = require('./resolvers/Vote')

const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link,
    Vote
}

// 1
// moved to schema.graphql

/*let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]*/


// 2
//let idCount = links.length
/*const resolvers = {
    Query: {
        info: () => 'This is the API of a Hackernews Clone',
        //feed: () => links,
        feed: (root, args, context, info) => context.prisma.links(),
        link: (id) => links.filter(l => l.id == id)[0] || null
    },
    Mutation: {
        post: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description
            })
            /*const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link*
        },

        updateLink: (parent, args) => {
            const index = links.findIndex(l => l.id === args.id)
            const link = {
                id: args.id,
                description: args.description,
                url: args.url
            }
            links[index] = link
            return link
        },

        deleteLink: (parent, args) => {
            const index = links.findIndex(l => l.id === args.id)
            delete links[index]
        }
    }

    /*Link: {
        id: (parent) => parent.id,
        url: (parent) => parent.url,
        description: (parent) => parent.description
    }
} */

// 3
const server = new GraphQLServer({
    typeDefs: './src//schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma
        }
    }
})
server.start(() => console.log('Server is running on localhost:4000'))