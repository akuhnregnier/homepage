import React from "react";
import type { IconType } from "react-icons";
import { GoCalendar, GoEye, GoLink, GoStarFill } from "react-icons/go";
import type { Root } from "remark-gemoji";
import type { Processor } from "unified";

const IconRow = ({ Icon, Item }: { Icon: IconType; Item: React.ReactNode }) => (
  <div className="m-2 flex">
    <Icon className="mr-1 mt-1" />
    {Item}
  </div>
);

interface GithubRepoProps {
  name: string;
  description: string;
  url: string;
  id: string;
  updatedAt: string;
  createdAt: string;
  stargazerCount: number;
  watchers: {
    totalCount: number;
  };
}

const replaceGithubEmojis = async (processor: Processor<Root, Root, Root, String>, text: string) => {
  const matches = Array.from(text.matchAll(/:([a-z0-9_]+):/g));
  for (const match of matches) {
    text = text.replace(match[0], (await processor.process(match[0])).toString());
  }
  return text;
};

const GithubRepo = async (repo: GithubRepoProps) => {
  const remarkGemoji = (await import("remark-gemoji")).default;
  const remarkParse = (await import("remark-parse")).default;
  const remarkStringify = (await import("remark-stringify")).default;
  const unified = await import("unified").then((m) => m.unified);

  const processor = unified().use(remarkParse).use(remarkGemoji).use(remarkStringify);
  return (
    <div
      key={repo.id}
      className="m-7 max-w-xl rounded-lg bg-gray-100 p-5 hover:bg-gray-50 dark:bg-gray-900 hover:dark:bg-gray-800"
    >
      <h1 className="mb-3 text-3xl text-gray-900 dark:text-white">{await replaceGithubEmojis(processor, repo.name)}</h1>
      <h2 className="text-lg">{await replaceGithubEmojis(processor, repo.description)}</h2>
      <div className="flex max-w-full flex-wrap items-end justify-self-end">
        <IconRow
          Icon={GoLink}
          Item={
            <a
              href={repo.url}
              target="_blank"
              className="text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
            >
              {repo.url}
            </a>
          }
        />
        <IconRow Icon={GoCalendar} Item={<p>{new Date(repo.updatedAt).toLocaleDateString()}</p>} />
        <IconRow Icon={GoCalendar} Item={<p>{new Date(repo.createdAt).toLocaleDateString()}</p>} />
        <IconRow Icon={GoStarFill} Item={<p>{repo.stargazerCount}</p>} />
        <IconRow Icon={GoEye} Item={<p>{repo.watchers.totalCount}</p>} />
      </div>
    </div>
  );
};

export const GithubRepos = async () => {
  const { data } = await fetch(process.env.GITHUB_GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
query {
  user(login: "akuhnregnier") {
    pinnedItems(first: 6) {
      totalCount
      edges {
        node {
          ... on Repository {
            name
            description
            descriptionHTML
            shortDescriptionHTML
            id
            url
            labels(first: 10) {
              nodes {
                id
                color
                createdAt
                description
                isDefault
                name
                url
                updatedAt
                resourcePath
                repository {
                  id
                }
              }
            }
            languages(first: 10) {
              nodes {
                id
                color
                name
              }
            }
            primaryLanguage {
              id
            }
            openGraphImageUrl
            createdAt
            pushedAt
            updatedAt
            stargazerCount
            watchers {
              totalCount
            }
          }
        }
      }
    }
  }
}`,
    }),
    next: { revalidate: 200 },
  }).then((res) => res.json());

  return (
    <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-0 lg:grid-cols-2">
      {data.user.pinnedItems.edges.map((edge: any) => edge.node).map((repo: GithubRepoProps) => GithubRepo(repo))}
    </div>
  );
};
