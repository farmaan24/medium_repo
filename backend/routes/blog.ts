import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { decode, sign, verify } from 'hono/jwt'


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables:{
        userId : string,
    }
}>();

blogRouter.use("/*", async (c, next) => {
    // extract the user id
    const token = c.req.header("authorization") || "" ;
    const jwt = token.split(" ")[1];
    console.log(token);
    const user = await verify(jwt,c.env.JWT_SECRET);
    if(user){
       c.set('userId',user.id as string);
       await next();
    }else {
        c.status(403);
        return c.json({
            message : "you are not logged in"
        })
    }
   
})

blogRouter.post('/post', async(c) => {
    const body = await c.req.json();
    const userId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
    const blog = await prisma.post.create({
        data :{
            title : body.title,
            content : body.content,
            authorId : userId
        }   
    })
      
    return c.json({
        id : blog.id
    })
})

blogRouter.put('/update', async(c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      
    const blog = await prisma.post.update({
        where :{
            id : body.id
        },
        data :{
            title : body.title,
            content : body.content
        }
    })
    return  c.json({
        id : blog.id
    })
    
})



//  todo : add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany({
        select :{
            content : true,
            title : true,
            id : true,
            author : {
                select:{
                    name:true
                }
            }
        }
    });
    
    return c.json({
        blogs
    })
})


blogRouter.get('/:id', async(c) => {
    const id = await c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    try{
    const blog = await prisma.post.findFirst({
        where :{
            id : id
        },
        select : { 
            title : true,
            content : true,
            author : { 
            select :  {
                name : true,
            }
        }
        }
    })
    return  c.json({
        blog
    })
    }catch(e){
        c.status(411);
        return c.text("ERROR WHILE FETCHING");
    }
})
