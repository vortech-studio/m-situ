// pages/api/postData.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Get the data from the request body
    const data = req.body;

    // Log the received data
    console.log("Received data:", data);

    // You can perform any additional processing here

    // Return the received data in the response
    res.status(200).json({ message: "Data received successfully", data });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
