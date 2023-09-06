import { number } from "echarts";
import { type } from "os";

export type Banner = {
  picUrl: string;
  clickType: number; //;
  linkUrl: string;
};

export type LiveItem = {
  id: number; //;
  title: string;
  openLiveStatus: number; //;
  livePicUrl: string;
  startTime: string;
  endTime: string;
  description: string;
  teachName: string;
  teacherUrl: "";
  skuId: number; //;
  subscribeNum: number; //;
  status: number; //;
};

export type Live = {
  courseLiveNewStatus: number; //;
  courseLiveNewDtos: LiveItem[];
};

export type CourseItem = {
  id: number; //;
  skuId: number; //;
  partNum: number; //;
  watchPartNum: number; //;
  title: string;
  coverUrl: string;
  chapterNum: number; //;
  learningStatus: number; //;
  lectureNo: number; //;
  chapterNo: number; //;
  timeProgress: number; //;
  type: string;
  studentsNum: number; //;
  officialCoverUrl: string;
  coverUrl: string;
};

export type Course = {
  title: string;
  courses: CourseItem[];
};

export type TeacherInfo = {
  id: number;
  imageUrl: string;
  name: string;
};

export type GoodsItem = {
  id: number; //主键
  respStuNum: number; //	购买人数
  enrollNum: number; //	期数
  startDate: number; //	开始日期
  tags: number[]; //商品标签 (课程协议13 / 保价协议16)
  showTime: number; //	是否显示日期 0：不显示 1：显示
  coverUrl: string; //封面
  realPrice: number; //	原价格
  disPrice: string; //促销活动折扣价
  discount: number; //	0：无活动；4：分享购；7：抢购；8:拼团
  disMaximum: number; //	专题课上限
  disStatus: number; //	活动状态 0：即将开售；1：开售中 2：已售罄
  courseType: number; //	班型类型，[0:系统班，1:专题课]
  disCharge: number; //	收费类型[0:免费,1:收费]
  integralAble: number; //	积分开启标识[0:否，1:是]由zeroBuy，voucherAble共同控制都为1才为开启
  classCourseType: number; //	课程小类型[1:正课,2:流量课,3:赠送课,4:定金,5:非对啊网课程,6:补款课,7:英语返现课,8:销售裂变课,9:低价课,10:试题课,11:梦课堂/保利威网课,12:加课,…,17:vip题库]
  showTime: number;
  name: string;
  base: number;
  classTypeId: number;
  costPrice: number;
  description: number;
  skuId: number;
  status: number;
  appCoverUrl: string;
  type: number;
  sort: number;
  teacherList: TeacherInfo[];
  disStartDate: number; // 活动开始时间
  disEndDate: number; // 活动结束时间
};

export type ConfigType =
  | "live"
  | "video"
  | "questions"
  | "forum"
  | "openLive"
  | "mock"
  | "quiz"
  | "employ";

export type ConfigSort = {
  name: ConfigType;
  sort: number;
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
  sortKey: ConfigType;
};

