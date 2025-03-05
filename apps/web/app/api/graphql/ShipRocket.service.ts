import axios, { AxiosResponse } from "axios";
export class ShiprocketService {
  private baseUrl = "https://apiv2.shiprocket.in/v1";
  private token: string | undefined;
  constructor() {
    // this.generateToken();
  }
  async createOrder(orderData: any) {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `${this.baseUrl}/external/orders/create/adhoc`,
        {...orderData},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
        
      if (error.response) {
        // API responded with a status code outside the range of 2xx
        throw new Error(error.response.data.message || "Shiprocket API Error");
      } else if (error.request) {
        // Request was made but no response was received
        throw new Error("No response from Shiprocket API");
      } else {
        // Something happened while setting up the request
        throw new Error(`Shiprocket Order Creation Failed: ${error.message}`);
      }
    }
  }
  async generateToken() {
    try {
      const response: AxiosResponse<any> = await axios.post(
        "https://apiv2.shiprocket.in/v1/external/auth/login",
        {
          email: process.env.SHIPROCKET_EMAIL,
          password: process.env.SHIPROCKET_PASS
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      
      if (response.data && response.data.token) {
        this.token = response.data.token;
      } else {
        throw new Error("Failed to generate token: No token in response");
      }
    } catch (error: any) {
      console.error("Error generating token:", error);
      throw new Error("Token generation failed");
    }
  }
  async generateAWB(shipmentId: string) {
    // Implement AWB generation using axios
  }
  async trackShipment(awbCode: string) {
    // Implement shipment tracking using axios
  }
}
