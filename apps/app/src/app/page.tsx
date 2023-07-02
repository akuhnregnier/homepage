import { GithubRepos } from "@/components/GithubRepos";
import { Navbar, Pages } from "../components/Navbar";

export default async function Home() {
  return (
    <>
      <Navbar current={Pages.Home} />
      <GithubRepos />
    </>
  );
}
