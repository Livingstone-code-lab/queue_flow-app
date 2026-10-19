import { Link } from "react-router-dom";

export default function NavBar({}) {
   return (
       <div>
          <Link to="/customerview">Customer</Link>
          <Link to="/staffview">Staff</Link>
       </div>
   );  
}
  