export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
  status: "completed" | "developing" | "planning";
}

export const projects: Project[] = [
  {
    id: 2,
    title: "Fingerecho's Blog",
    description:
      "心若有所向往，何惧道阻且长。记录技术分享和生活感悟的个人博客。",
    tags: ["技术分享", "Blog", "Markdown"],
    image: "https://picsum.photos/800/600?random=3",
    link: "https://fingerecho.com",
    status: "completed",
  },
  {
    id: 3,
    title: "KCSystemConsole(克铖操作控制台)",
    description: "打造一款轻量、现代、高效的 Windows 系统监控与操作工具。",
    tags: ["监控", "AI Agent", "实时数据"],
    image: "https://picsum.photos/800/600?random=4",
    link: "https://github.com/fingerecho/KCSystemConsole/tree/master",
    status: "completed",
  },
  {
    id: 4,
    title: "trackingsite(知识图谱项目)",
    description:
      "开源、隐私友好的网站访问统计分析工具，提供详细的访问数据和洞察。",
    tags: ["数据分析", "统计", "开源"],
    image: "https://picsum.photos/800/600?random=5",
    link: "https://github.com/fingerecho/trackingsite/tree/master",
    status: "completed",
  },
];
