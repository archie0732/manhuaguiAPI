import { load } from "cheerio";
import logger from "../utils/logger";
import type { SearchManhuaAPI } from "./manga.interfce";

export const searchManhuByKeyWord = async (keyword: string, page?: number) => {
  const url = `https://www.manhuagui.com/s/${keyword}_p${page ?? 1}.html`;

  const res = await fetch(url);

  if (!res.ok) {
    logger.error(`[Archie Manhuagui]Search API fetch error, status: ${res.status}`);
    throw new Error(`[Archie Manhuagui]Search API fetch error, status: ${res.status}`);
  }

  const html = await res.text();

  const $ = load(html);

  const manhuaResult: SearchManhuaAPI[] = [];

  $(".book-result")
    .find("li.cf")
    .each((_, element) => {
      const title = $(element).find("dt").find("a").attr("title") ?? "";
      const id = $(element).find("dt").find("a").attr("href")?.split("/")[2] ?? "";
      const thumb = $(element).find("img").attr("src") ?? "";
      const author = $(element).find("dd.tags").eq(2).text().split("：").pop() ?? "";
      const status = $(element).find("span.red").eq(0).text() ?? "";
      const time = $(element).find("span.red").eq(1).text() ?? "";
      const chapter = $(element).find("a.blue").text() ?? "";

      manhuaResult.push({
        author,
        id,
        thumb,
        title,
        upadte: {
          chapter,
          status: status === "连载中",
        },
      });
    });

  console.log(manhuaResult.length);

  return manhuaResult;
};
