import React from "react";
import Container from "../container/Container";
import  Logo  from "../Logo";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
function Header() {
    const navigate = useNavigate();
  const authentication_status = useSelector(
    (state) => state.action.auth.status
  );
  const navItems = [
    {
        name: "Home",
        slug: "/",
        active: true
    },
    {
        name: "Login",
        slug: "/login",
        active: !authentication_status
    },
    {
        name: "Signup",
        slug: "/signup",
        active: !authentication_status
    },
    {
        name: "All Posts",
        slug: "/all-posts",
        active: authentication_status
    },
    {
        name: "Add Post",
        slug: "/add-post",
        active: authentication_status
    }
]

return (
<header className='py-3 shadow bg-gray-500'>
    <Container>
        <nav className='flex'>
            <div className='mr-4'>
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            <ul className='flex ml-auto'>
                {
                    navItems.map((item) => item.active ? (
                        <li key={item.name}>
                            <button
                            onClick={() => navigate(item.slug)}
                            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                            >
                                {item.name}
                            </button>
                        </li>
                    ) : null)
                }
                {authentication_status && (
                    <li>
                        <Logout />
                    </li>
                )}
            </ul>
        </nav>
    </Container>
</header>
)
}


export default Header;
