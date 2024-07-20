import Trending from "../components/HomePage/Trending"
import Categories from "../components/HomePage/Categories"
export default function HomePage(){
    return (
      <div className=" overflow-hidden px-4 mt block font ">
      <Trending />
      <Categories  />
    </div>
      
    )
}