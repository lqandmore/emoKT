import { type ConfigModel } from "./types";

export function useConfig() {
  const configOriginData: ConfigModel[] = [
    {
      name: "系统班",
      image: "/src/assets/home/live.png",
      tag: "",
      sort: 0,
      sortKey: "live"
    },
    {
      name: "视频课",
      image: "/src/assets/home/video.png",
      tag: "",
      sort: 0,
      sortKey: "video"
    },
    {
      name: "题库",
      image: "/src/assets/home/questions.png",
      tag: "",
      sort: 0,
      sortKey: "questions"
    },
    {
      name: "答疑",
      image: "/src/assets/home/forum.png",
      tag: "",
      sort: 0,
      sortKey: "forum"
    },
    {
      name: "公开课",
      image: "/src/assets/home/openLive.png",
      tag: "",
      sort: 0,
      sortKey: "openLive"
    },
    {
      name: "万人模考",
      image: "/src/assets/home/mock.png",
      tag: "",
      sort: 0,
      sortKey: "mock"
    },
    {
      name: "提问",
      image: "/src/assets/home/quiz.png",
      tag: "",
      sort: 0,
      sortKey: "quiz"
    },
    {
      name: "就业",
      image: "/src/assets/home/employ.png",
      tag: "",
      sort: 0,
      sortKey: "employ"
    }
  ];
  return {
    configOriginData
  };
}
