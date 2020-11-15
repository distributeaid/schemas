import glob from "glob";
import * as path from "path";
import { promises as fs } from "fs";
import { promisify } from "util";
import chalk from "chalk";

const siteUrl = "https://distributeaid.github.io/schemas/";

const writeFile = async (target, data) => {
  await fs.writeFile(target, data, "utf-8");
  console.log(
    chalk.green(target),
    chalk.grey("written"),
    chalk.blue(`(${data.length} bytes)`)
  );
};

const main = async () => {
  const schemas = await promisify(glob)(
    path.resolve(process.cwd(), "schemas", "*.json")
  ).then((schemas) =>
    Promise.all(
      schemas.map((schema) =>
        fs.readFile(schema, "utf-8").then((f) => JSON.parse(f))
      )
    )
  );
  await fs.mkdir(path.resolve(process.cwd(), "gh-pages"), {
    recursive: true,
  });
  // Index
  await writeFile(
    path.resolve(process.cwd(), "gh-pages", "index.html"),
    `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <title>Distribute Aid Domain Schemas</title>
          </head>
          <body>
          <ul>
          ${schemas
            .map(
              (schema) => `<li><a href="${schema.$id}">
              <code>${schema.$id.replace(siteUrl, "")}</code>
            </a>: ${schema.description}</li>`
            )
            .join("")}
            </ul>
          </body>
        </html>`
  );
  // Individual schemas
  await Promise.all(
    schemas.map(async (schema) => {
      const name = schema.$id.replace(siteUrl, "");
      await fs.mkdir(path.resolve(process.cwd(), "gh-pages", name));
      writeFile(
        path.resolve(process.cwd(), "gh-pages", name, "index.html"),
        `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta http-equiv="refresh" content="0; URL=${siteUrl}${name}/schema.json" />
            <title>${schema.$id}</title>
          </head>
          <body>
            <a href="${siteUrl}${name}/schema.json">click here</a> if you are not automatically redirected.
          </body>
        </html>`
      );
      writeFile(
        path.resolve(process.cwd(), "gh-pages", name, `schema.json`),
        JSON.stringify(schema, null, 2)
      );
    })
  );
};

main();
