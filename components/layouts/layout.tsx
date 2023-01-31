import Footer from "components/footer";
import Header from "components/header";
import { Main } from "next/document";
import { ReactNode } from "react";

interface Props { 
    children?: ReactNode;
}

const Layout = ({children, ...Props}: Props) => { 

    return(
        <>
          <Header></Header>
          <main {...Props}>{children}</main>
          <Footer></Footer>
        </>
    )
}

export default Layout;