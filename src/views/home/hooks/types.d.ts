import { number } from "echarts";
import { type } from "os";

export type Banner = {
  picUrl: string;
  clickType: number; //;
  linkUrl: string;
};

export type LiveModel = {
  id: number; //;
  title: string;
  openLiveStatus: number; //;
  livePicUrl: string;
  startTime: string;
  endTime: string;
  description: string;
  teachName: string;
  teacherUrl: string;
  skuId: number; //;
  subscribeNum: number; //;
  status: number; //;
};

export type Live = {
  courseLiveNewStatus: number; //;
  courseLiveNewDtos: LiveModel[];
};

export type CourseModel = {
  adhref: string;
  adpicture: string;
  authorHeadline: string;
  authorName: string;
  authorPic: string;
  category: number;
  chapterNo: number;
  chapterNum: number;
  courseId: number;
  coverUrl: string;
  createDate: string;
  effectiveTime: number;
  firstLectureId: number;
  id: number;
  keywords: string;
  learningStatus: number;
  lectureId: number;
  lectureNo: number;
  level: number;
  officialCoverUrl: string;
  orderIndex: number;
  partNum: number;
  playerType: number;
  price: number;
  publishCancelTime: string;
  publishState: number;
  publishTime: string;
  qqDescribe: string;
  qqimgurl: string;
  qqkey: string;
  qqtitle: string;
  score: number;
  scoreNum: number;
  series: number;
  skuId: number;
  state: number;
  studentsNum: number;
  subtitle: string;
  summary: string;
  tempprice: number;
  timeProgress: number;
  title: string;
  type: number;
  updateDate: string;
  userid: number;
  videoId: string;
  videoUrl: string;
  watchPartNum: number;
  weixinImgUrl: string;
};

export type Course = {
  title: string;
  courses: CourseModel[];
};

export type TeacherInfo = {
  id: number;
  imageUrl: string;
  name: string;
};

export type GoodsModel = {
  addressMark: number;
  appCoverUrl: string;
  base: number;
  classCourseType: number;
  classTypeId: number;
  costPrice: number;
  courseType: number;
  coverUrl: string;
  description: string;
  disCharge: number;
  disEndDate: number;
  disMaximum: number;
  disPrice: number;
  disStartDate: number;
  disStatus: number;
  discount: number;
  enrollNum: number;
  id: number;
  integralAble: number;
  name: string;
  promotionId: number;
  realPrice: number;
  respStuNum: number;
  showTime: number;
  skuId: number;
  sort: number;
  startDate: number;
  status: number;
  tags: [];
  teacherIds: [];
  teacherList: TeacherInfo[];
  type: number;
};

export type configReSponse = {
  id: number;
  name: string;
  wap: [];
};
export type ConfigModel = {
  name: string;
  image: string;
  tag: string;
  sort: number;
  sortKey: string;
};
