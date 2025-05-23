import { NextApiRequest, NextApiResponse } from "next";

export const visitors = new Set();

export default function handler(req, res) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "unknown";

  visitors.add(ip);
  res.status(200).json({ count: visitors.size });
}
