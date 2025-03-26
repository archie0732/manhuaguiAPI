import { load } from "cheerio";
import { baseURL, errorThumb } from "../utils/const";

interface Update {
  time: string;
  chapter: string;
  url: string;
  status: boolean;
}

export class ArchieMangaAPI {
  title: string = "";
  id: string = "";
  url: string = "";
  thumb: string = "";
  author: string = "";
  update: Update = {
    time: "",
    chapter: "",
    url: "",
    status: true,
  };
  tag: string = "";
  descruption: string = "";

  constructor(html: string, id: string) {
    this.url = baseURL(id);
    this.id = id;

    const $ = load(html);
    this.title = $("h1").text();
    this.thumb = $(".thumb").find("img").attr("src") ?? errorThumb;
    const status = $(".thumb").find("i").text();
    const chapter = $("dd").eq(0).text();
    const updateTime = $("dd").eq(1).text();
    this.author = $("dd").eq(2).text();
    this.tag = $("dd").eq(3).text();
    const chapterurl = $("dd").eq(3).find("a.blue").attr("href") ?? "";
    this.descruption = $(".book-intro").find("p").text();

    this.update = {
      chapter,
      url: chapterurl,
      status: status === "完結" ? false : true,
      time: updateTime,
    };
  }
}

export interface SearchManhuaAPI {
  title: string;
  id: string;

  thumb: string;
  author: string;
  upadte: {
    status: boolean;
    chapter: string;
  };
}
