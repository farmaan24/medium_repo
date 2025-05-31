import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/Blogskeleton";
import { Loader } from "../components/loader";
import { useBlogs } from "../hooks"

export const All_Blogs = ()=>{
const {loading,blogs} = useBlogs();

  if(loading){
    return <div>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>

    </div>
  }
   return <div>
        <Appbar />
        <div  className="flex justify-center">
            <div>
                {blogs.map((blog,index) => <BlogCard
                    key ={index}
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd Feb 2024"}
                ></BlogCard>)}
            </div>
        </div>
    </div>
}