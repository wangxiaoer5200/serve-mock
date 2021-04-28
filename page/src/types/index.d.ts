// 基础
export interface BtnConfig {
  create: boolean;
  preview?: boolean;
}
export interface interForm {
  name: string;
  url?: string;
  method?: string;
  status?: number;
  description: string;
}
interface interRuleForm {
  name: any[];
  url: any[];
}

export interface moduleForm {
  id?: number | null;
  name: string;
  pathName: string;
  description: string;
}
interface moduleRuleForm {
  name: any[];
  pathName: any[];
}
