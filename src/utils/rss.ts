import type { BlogPost } from "../types/blog";
import { rssConfig } from "@/config/rss";
import { XMLParser } from "fast-xml-parser";


// 使用 RSS2JSON API 转换 RSS 为 JSON
export const fetchBlogPosts_old = async (): Promise<BlogPost[]> => {
  try {
    if (!rssConfig.url) {
      throw new Error("RSS URL is not defined");
    }

    // 使用 RSS2JSON 服务
    //const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssConfig.url)}`;
    const apiUrl = `https://rss.jacobbennett.com/rss2json?rss_url=${encodeURIComponent(rssConfig.url)}`;
    //const apiUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssConfig.url)}`)}`;
    //const apiUrl = `https://rss.jacobbennett.com/rss2json?url=${encodeURIComponent(rssConfig.url)}`;
    //const apiUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent('https://blog.johntime.top/rss.xml')}`;
    const response = await fetch(apiUrl, {
      headers: {
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== "ok") {
      throw new Error("Failed to fetch RSS feed");
    }

    return data.items.map(
      (item: any): BlogPost => ({
        title: item.title,
        link: item.link,
        date: new Date(item.pubDate),
        description: item.content || item.description,
        category: item.category || "默认分类",
      }),
    );
  } catch (error) {
    console.error("获取博客文章失败:", error);
    return [];
  }
};


export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    if (!rssConfig.url) {
      throw new Error("RSS URL is not defined");
    }

    // 直接请求 RSS XML（支持相对路径 /rss.xml）
    // const response = await fetch(rssConfig.url, {
    //   headers: { "Cache-Control": "no-cache", Pragma: "no-cache" }
    // });
    const response = await fetch(rssConfig.url);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const xmlText = await response.text();

    // 解析 XML
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      parseTagValue: true,
      trimValues: true
    });
    const json = parser.parse(xmlText);

    // 兼容 RSS 2.0 / Atom
    const items = json.rss?.channel?.item
      || json.feed?.entry
      || [];

    return items.map((item: any): BlogPost => ({
      title: item.title || item["title.#text"] || "",
      link: item.link?.["@_href"] || item.link || item.guid || "",
      date: new Date(item.pubDate || item.updated || item.published || Date.now()),
      description: item.content || item["content:encoded"] || item.description || item.summary || "",
      category: item.category || "默认分类",
    }));
  } catch (error) {
    console.error("获取博客文章失败:", error);
    return [];
  }
};
