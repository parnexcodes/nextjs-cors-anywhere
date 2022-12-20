import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosRequestConfig } from "axios";
import filterProperties from "../../components/util";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { endpoint } = req.query;

  if (endpoint == null || endpoint == "") {
    const out = {
      error: "Missing endpoint parameter!",
    };

    res.status(400).json(out);
    return;
  }

  if (!isNaN(parseInt(<string>endpoint)) || typeof endpoint !== "string") {
    const out = {
      error: "Endpoint parameter must be a string!",
    };

    res.status(400).json(out);
    return;
  }

  try {
    const reqConfig: AxiosRequestConfig = {
      //@ts-ignore
      url: endpoint,
      method: "get",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      params: filterProperties({ ...req.query }, ["endpoint"]),
    };

    console.log(reqConfig.params);
    const endpointReq = await axios(reqConfig);
    const endpointRes = await endpointReq.data.replaceAll("https://", "https://nextjs-cors-anywhere-lime.vercel.app/api?endpoint=https://");

    res.status(200).json(endpointRes);
  } catch (err) {
    const out = {
      error: "Something went wrong...",
      message: err.message,
    };

    res.status(500).json(out);
  }
};

export default handler;
