import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const callbackUrl = searchParams.get("callbackUrl");
    if (callbackUrl) {
      const response = await fetch(callbackUrl);
      console.log(response);
    }
  } catch (error) {
    console.error(error);
  }

  redirect("/");
}
