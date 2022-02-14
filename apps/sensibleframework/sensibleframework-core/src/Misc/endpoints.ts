import { DefaultResponse, Endpoint } from "sensible-core";
import { PublicUserType } from "..";
import { SkillType } from "./types";

export interface SkillsEndpoint extends Endpoint {
  method: "GET";
  body: {};
  response: { skills: SkillType };
}
export interface SitemapEndpoint extends Endpoint {
  method: "GET";
  body: {};
  response: { skills: SkillType[]; users: PublicUserType[] };
}
export interface WauEndpoint extends Endpoint {
  method: "GET";
  body: {};
  response: { wau: number };
}

export interface MiscEndpoints {
  skills: SkillsEndpoint;
  sitemap: SitemapEndpoint;
  wau: WauEndpoint;
}
