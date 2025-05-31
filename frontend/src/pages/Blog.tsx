
import { useParams } from "react-router-dom";
import  {useBlog} from "../hooks"
import { FullBlog } from "../components/OneBlog";
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/spinner";
import { BlogSkeleton } from "../components/Blogskeleton";

export const Blog = () =>{
   const { id } = useParams();
   const {loading ,blog} = useBlog({id : id || ""});
  if (loading) {
        return <div>
            <Appbar />
        
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
        </div>
    }
    return <div>
        <FullBlog blog={blog} />
    </div>
}