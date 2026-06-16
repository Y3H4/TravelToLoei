import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(".");
const port = Number(process.env.PORT || 5500);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function resolveRequestPath(url) {
  const requestUrl = new URL(url, `http://localhost:${port}`);
  const pathname = decodeURIComponent(requestUrl.pathname);
  const normalizedPath = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(root, normalizedPath === "/" ? "index.html" : normalizedPath);
  const resolvedPath = resolve(filePath);

  if (!resolvedPath.startsWith(root)) {
    return null;
  }

  if (existsSync(resolvedPath) && statSync(resolvedPath).isDirectory()) {
    return join(resolvedPath, "index.html");
  }

  return resolvedPath;
}

const server = createServer((request, response) => {
  const filePath = resolveRequestPath(request.url || "/");

  if (!filePath || !existsSync(filePath)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("404 Not Found");
    return;
  }

  const extension = extname(filePath).toLowerCase();
  response.writeHead(200, {
    "Content-Type": mimeTypes[extension] || "application/octet-stream",
    "Cache-Control": "no-store",
  });

  createReadStream(filePath).pipe(response);
});

server.listen(port, () => {
  console.log(`Travel to Loei is running at http://localhost:${port}`);
});
