import Head from "next/head";
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => (
  <>
    <Head>
      <title>PHONEBOOK Emanuelle</title>
    </Head>
    <Navbar />
    {children}
  </>
);
