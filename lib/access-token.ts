import axios from "axios";

export const getAccessToken = async (): Promise<any> => {
  const tokenEndPoint = "https://identity.prod.jibble.io/connect/token";
  const headersData = {
    grant_type: "client_credentials",
    client_id: "57412860-41ed-49c7-be79-de879dd1f923",
    client_secret: "hunQZ671YRAehnHEfZvCfwWQp3ZPBowVNdMPxCphad0emu5J",
  };
  try {
    const token = await axios.post(
      tokenEndPoint,
      new URLSearchParams(headersData)
    );

    return await token.data.access_token;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
