import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const linkClassName =
  "text-purple-700 underline decoration-purple-300 underline-offset-2 hover:text-purple-900";

const components: Components = {
  h1: ({ children }) => <p className="font-semibold">{children}</p>,
  h2: ({ children }) => <p className="font-semibold">{children}</p>,
  h3: ({ children }) => <p className="font-semibold">{children}</p>,
  ul: ({ children }) => (
    <ul className="list-disc space-y-2 pl-5">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal space-y-2 pl-5">{children}</ol>
  ),
  li: ({ children }) => <li className="space-y-1">{children}</li>,
  a: ({ href, children }) => {
    // Client-side navigation keeps the open conversation alive.
    if (href?.startsWith("/") && !href.startsWith("//"))
      return (
        <Link href={href} className={linkClassName}>
          {children}
        </Link>
      );
    return (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className={linkClassName}
      >
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-purple-200 pl-3 text-gray-600">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded-sm bg-gray-100 px-1 py-0.5 text-xs">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="overflow-x-auto rounded-sm bg-gray-100 p-3">{children}</pre>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-xs">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-gray-300 px-2 py-2 font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-gray-200 px-2 py-2 align-top">{children}</td>
  ),
};

export default function ChatMessage({ content }: { content: string }) {
  return (
    <div className="space-y-3 text-sm leading-relaxed [overflow-wrap:anywhere]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        disallowedElements={["img", "input"]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
