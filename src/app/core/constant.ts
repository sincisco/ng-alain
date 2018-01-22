import {IOrgGrade} from "../models/orgGrade";


export const SERVERAPI = "http://10.34.12.104:8080/bdp_web/";
export const saikuAPI = "http://10.2.72.201:8080/saiku_ui";
export const hdfsMonitor = "http://10.2.72.160:50070/dfshealth.html";
export const hmrMonitor = "http://10.2.72.160:8088/cluster";
export const hbaseMonitor = "http://10.2.72.160:60010/master-status";
export const hsparkMonitor = "http://10.2.72.160:8080/spark";
export const hkylinMonitor = "http://10.2.72.160:7070/kylin";

export const REGIONS = [
  {no: "beijing", name: "北京市"},
  {no: "shanghai", name: "上海市"},
  {no: "tianjing", name: "天津"},
  {no: "chongqing", name: "重庆"},
  {no: "zhejiang", name: "浙江省"},
  {no: "jiangsu", name: "江苏省"},
  {no: "guangdong", name: "广东省"},
  {no: "fujiang", name: "福建"},
  {no: "hunan", name: "湖南"},
  {no: "hubei", name: "湖北"},
  {no: "liaoning", name: "辽宁"},
  {no: "jilin", name: "吉林"},
  {no: "hebei", name: "河北"},
  {no: "henan", name: "河南"},
  {no: "shandong", name: "山东"},
  {no: "shangxi", name: "陕西"},
  {no: "gansu", name: "甘肃"},
  {no: "xinjiang", name: "新疆"},
  {no: "qinghai", name: "青海"},
  {no: "shanxi", name: "山西"},
  {no: "sichuan", name: "四川"},
  {no: "guizhou", name: "贵州"},
  {no: "anhui", name: "安徽省"},
  {no: "jiangxi", name: "江西"},
  {no: "yunnan", name: "云南"},
  {no: "xizang", name: "西藏"},
  {no: "guangxi", name: "广西"},
  {no: "ningxia", name: "宁夏"},
  {no: "hainan", name: "海南"},
  {no: "xianggang", name: "香港"},
  {no: "aomeng", name: "澳门"},
  {no: "taiwan", name: "台湾"},
  {no: "neimenggu", name: "内蒙古"},
  {no: "heilongjiang", name: "黑龙江"}
];

export const CITIES = {
  beijing: ["东城区", "西城区", "海淀区", "朝阳区", "丰台区", "石景山区", "通州区", "顺义区", "房山区",
    "大兴区", "昌平区", "怀柔区", "平谷区", "门头沟区", "延庆县", "密云县"],
  shanghai: ["浦东新区", "徐汇区", "长宁区", "普陀区", "闸北区", "虹口区", "杨浦区", "黄浦区",
    "卢湾区", "静安区", "宝山区", "闵行区", "嘉定区", "金山区", "松江区", "青浦区", "南汇区", "奉贤区",
    "崇明县"],
  tianjing: ["河东", "南开", "河西", "河北", "和平", "红桥", "东丽", "津南", "西青", "北辰",
    "塘沽", "汉沽", "大港", "蓟县", "宝坻", "宁河", "静海", "武清"],
  chongqing: ["渝中区", "大渡口区", "江北区", "沙坪坝区", "九龙坡区", "南岸区", "北碚区", "万盛区",
    "双桥区", "渝北区", "巴南区", "万州区", "涪陵区", "黔江区", "长寿区", "江津区", "合川区", "永川区",
    "南川区"],
  jiangsu: ["南京市", "无锡市", "常州市", "徐州市", "苏州市", "南通市", "连云港市", "淮安市", "扬州市", "盐城市",
    "镇江市", "泰州市", "宿迁市"],
  zhejiang: ["杭州市", "宁波市", "温州市", "嘉兴市", "湖州市", "绍兴市", "金华市", "衢州市", "舟山市", "台州市", "利水市"],
  guangdong: ["广州市", "韶关市", "深圳市", "珠海市", "汕头市", "佛山市", "江门市", "湛江市", "茂名市", "肇庆市",
    "惠州市", "梅州市", "汕尾市", "河源市", "阳江市", "清远市", "东莞市", "中山市", "潮州市", "揭阳市"],
  fujiang: ["福州市", "厦门市", "莆田市", "三明市", "泉州市", "漳州市", "南平市", "龙岩市", "宁德市"],
  hunan: ["长沙市", "株洲市", "湘潭市", "衡阳市", "邵阳市", "岳阳市", "常德市", "张家界市", "益阳市", "郴州市",
    "永州市", "怀化市", "娄底市", "湘西土家苗族自治区"],
  hubei: ["武汉市", "襄阳市", "黄石市", "十堰市", "宜昌市", "鄂州市", "荆门市", "孝感市", "荆州市", "黄冈市", "咸宁市",
    "随州市", "恩施土家族苗族自治州"],
  liaoning: ["沈阳市", "大连市", "鞍山市", "抚顺市", "本溪市", "丹东市", "锦州市", "营口市", "阜新市", "辽阳市", "盘锦市", "铁岭市", "朝阳市", "葫芦岛"],
  jilin: ["长春市", "吉林市", "四平市", "辽源市", "通化市", "白山市", "松原市", "白城市", "延边朝鲜族自治区"],
  heilongjiang: ["哈尔滨市", "齐齐哈尔市", "鸡西市", "牡丹江市", "佳木斯市", "大庆市", "伊春市", "黑河市", "大兴安岭"],
  hebei: ["石家庄市", "保定市", "唐山市", "邯郸市", "承德市", "廊坊市", "衡水市", "秦皇岛市", "张家口市"],
  henan: ["郑州市", "洛阳市", "商丘市", "安阳市", "南阳市", "开封市", "平顶山市", "焦作市", "新乡市", "鹤壁市",
    "许昌市", "漯河市", "三门峡市", "信阳市", "周口市", "驻马店市", "济源市"],
  shandong: ["济南市", "青岛市", "菏泽市", "淄博市", "枣庄市", "东营市", "烟台市", "潍坊市", "济宁市", "泰安市", "威海市", "日照市", "滨州市", "德州市", "聊城市", "临沂市"],
  shangxi: ["西安市", "宝鸡市", "咸阳市", "渭南市", "铜川市", "延安市", "榆林市", "汉中市", "安康市", "商洛市"],
  gansu: ["兰州市", "嘉峪关市", "金昌市", "金川市", "白银市", "天水市", "武威市", "张掖市", "酒泉市", "平凉市",
    "庆阳市", "定西市", "陇南市", "临夏市", "合作市"],
  qinghai: ["西宁市", "海东地区", "海北藏族自治州", "黄南藏族自治州", "海南藏族自治州", "果洛藏族自治州",
    "玉树藏族自治州", "海西蒙古族藏族自治州"],
  xinjiang: ["乌鲁木齐市", "奎屯市", "石河子市", "昌吉市", "吐鲁番市", "库尔勒市", "阿克苏市", "喀什市", "伊宁市",
    "克拉玛依市", "塔城市", "哈密市", "和田市", "阿勒泰市", "阿图什市", "博乐市"],
  shanxi: ["太原市", "大同市", "阳泉市", "长治市", "晋城市", "朔州市", "晋中市", "运城市", "忻州市", "临汾市", "吕梁市"],
  sichuan: ["成都市", "自贡市", "攀枝花市", "泸州市", "德阳市", "绵阳市", "广元市", "遂宁市", "内江市", "乐山市",
    "南充市", "眉山市", "宜宾市", "广安市", "达州市", "雅安市", "巴中市", "资阳市", "阿坝藏族羌族自治州", "甘孜藏族自治州",
    "凉山彝族自治州"],
  guizhou: ["贵阳市", "六盘水市", "遵义市", "安顺市", "黔南布依族苗族自治州", "黔西南布依族苗族自治州",
    "黔东南苗族侗族自治州", "铜仁市", "毕节市"],
  anhui: ["合肥市", "芜湖市", "安庆市", "马鞍山市", "阜阳市", "六安市", "滁州市", "宿州市", "蚌埠市", "巢湖市",
    "淮南市", "宣城市", "亳州市", "淮北市", "铜陵市", "黄山市", "池州市"],
  jiangxi: ["南昌市", "九江市", "景德镇市", "萍乡市", "新余市", "鹰潭市", "赣州市", "宜春市", "上饶市", "吉安市",
    "抚州市"],
  yunnan: ["昆明市", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市", "普洱市", "临沧市", "楚雄彝族自治州",
    "大理白族自治州", "红河哈尼族彝族自治州", "文山壮族苗族自治州", "西双版纳傣族自治州", "德宏傣族景颇族自治州",
    "怒江傈僳族自治州", "迪庆藏族自治州"],
  neimenggu: ["呼和浩特市", "包头市", "乌海市", "赤峰市", "通辽市", "鄂尔多斯市", "呼伦贝尔市", "巴彦淖尔市",
    "乌兰察布市"],
  guangxi: ["南宁市", "柳州市", "桂林市", "梧州市", "北海市", "防城港市", "钦州市", "贵港市", "玉林市", "百色市",
    "贺州市", "河池市", "崇左市"],
  xizang: ["拉萨", "昌都地区", "林芝地区", "山南地区", "日喀则地区", "那曲地区", "阿里地区"],
  ningxia: ["银川市", "石嘴山市", "吴忠市", "固原市", "中卫市"],
  hainan: ["海口市", "三亚市"],
  xianggang: ["中西区", "湾仔区", "东区", "南区", "九龙城区", "油尖旺区", "观塘区", "黄大仙区",
    "深水埗区", "北区", "大埔区", "沙田区", "西贡区", "元朗区", "屯门区", "荃湾区", "葵青区", "离岛区"],
  taiwan: ["台北市", "高雄市", "基隆市", "台中市", "台南市", "新竹市", "嘉义市"],
  aomeng: ["澳门半岛", "氹仔岛", "路环岛"]
};

export const ORGGRADES: IOrgGrade[] = [
  {no: "1", name: "总行"},
  {no: "2", name: "分行"},
  {no: "3", name: "支行"},
  {no: "4", name: "网点"}
];
