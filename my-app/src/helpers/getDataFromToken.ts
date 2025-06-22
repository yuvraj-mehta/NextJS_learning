import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";

    const decodedToken: { id: string } = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as { id: string };

    return decodedToken.id;
  } catch (error) {
    console.error("Error extracting data from token:", error);
    return null;
  }
};
