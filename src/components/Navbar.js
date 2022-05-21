import { Menu, Container, Button } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Image } from "semantic-ui-react";

export const Navbar = () => {
  const router = useRouter();
  return (
    <Menu
      inverted
      borderless
      style={{ padding: ".3rem", marginBottom: "20px" }}
      attached
    >
      <Container>
        <Menu.Item name="home">
          <Link href="/">
            <Image src="https://i.ibb.co/fCyXWj7/Captura.png" />
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button
              
              size="mini"
              primary
              onClick={() => router.push("/tasks/new")}
            >
              New User
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
