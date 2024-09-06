import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ChangellyDocument } from "./schema/changelly-exchange.schema";
import * as crypto from "crypto";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import fetch from "node-fetch";
import { ChangellyDto } from "./dto/changelly.dto";
import { ApiResponseType } from "src/common/types/api-response.type";
import { ChangellyBuyTransactionRepository } from "./repositories/changelly-buy-transaction.repository";
import _ from "underscore";
import * as countryToCurrency from "country-to-currency";
import { SocketGateway } from "src/websocket/websocket.gateway";

@Injectable()
export class ChangellyService {
  constructor(
    private readonly configService: ConfigService,
    private readonly ChangellyBuyTransactionRepository: ChangellyBuyTransactionRepository,
    private readonly socketGateway: SocketGateway
  ) {}

  handleSignature(queryData) {
    try {
      const CHANGELLY_URL = this.configService.get("CHANGELLY_URL");
      const privateKey = this.configService.get("CHANGELLY_PRIVATE_KEY");

      const privateKeCustom = crypto.createPrivateKey({
        key: privateKey.replace(/\s/g, ""),
        format: "der",
        type: "pkcs8",
        encoding: "hex",
      });

      const publicKeyCustom = crypto.createPublicKey(privateKeCustom).export({
        type: "pkcs1",
        format: "der",
      });

      const signature = crypto.sign(
        "sha256",
        Buffer.from(JSON.stringify(queryData)),
        {
          key: privateKeCustom as any,
          type: "pkcs8",
          format: "der",
        }
      );

      const options = {
        method: "POST",
        url: CHANGELLY_URL,
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": crypto
            .createHash("sha256")
            .update(publicKeyCustom)
            .digest("base64"),
          "X-Api-Signature": signature.toString("base64"),
        },
        data: JSON.stringify(queryData),
      };

      console.log(options);
      return options;
    } catch (error) {
      console.log("handleSignature.Error:", error);
    }
  }

  async getCurrencies(dto: ChangellyDto): Promise<ChangellyDocument> {
    try {
      let queryData = {
        jsonrpc: "2.0",
        id: "test",
        method: "getCurrenciesFull",
        params: dto.params,
      };
      let options = this.handleSignature(queryData);
      const { data: result } = await axios(options);
      return result;
    } catch (error) {
      console.log("ERROR_GET_CURRENCIES", error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getCurrenciesFull(dto: ChangellyDto): Promise<ChangellyDocument> {
    try {
      let queryData = {
        jsonrpc: "2.0",
        id: "test",
        method: "getCurrenciesFull",
        params: dto.params,
      };
      let options = this.handleSignature(queryData);
      const { data: result } = await axios(options);
      return result;
    } catch (error) {
      console.log("ERROR_GET_CURRENCIES", error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getPairs(dto: ChangellyDto): Promise<ChangellyDocument> {
    try {
      let queryData = {
        jsonrpc: "2.0",
        id: "test",
        method: "getPairs",
        params: dto.params,
      };
      let options = this.handleSignature(queryData);
      const { data: result } = await axios(options);
      return result;
    } catch (error) {
      console.log("ERROR_GET_CURRENCIES", error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getPairsParams(dto: ChangellyDto): Promise<ChangellyDocument> {
    try {
      let queryData = {
        jsonrpc: "2.0",
        id: "test",
        method: "getPairsParams",
        params: dto.params,
      };
      let options = this.handleSignature(queryData);
      const { data: result } = await axios(options);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getMinAmount(dto: ChangellyDto): Promise<ChangellyDocument> {
    try {
      let queryData = {
        jsonrpc: "2.0",
        id: "test",
        method: "getMinAmount",
        params: dto.params,
      };
      let options = this.handleSignature(queryData);
      const { data: result } = await axios(options);
      return result;
    } catch (error) {
      console.log("ERROR_GET_CURRENCIES", error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getExchangeAmount(dto: ChangellyDto): Promise<ChangellyDocument> {
    try {
      let queryData = {
        jsonrpc: "2.0",
        id: "test",
        method: "getExchangeAmount",
        params: dto.params,
      };
      let options = this.handleSignature(queryData);
      const { data: result } = await axios(options);
      return result;
    } catch (error) {
      console.log("ERROR_GET_CURRENCIES", error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async createTransaction(dto: ChangellyDto): Promise<ChangellyDocument> {
    try {
      let queryData = {
        jsonrpc: "2.0",
        id: "test",
        method: "createTransaction",
        params: dto.params,
      };
      let options = this.handleSignature(queryData);
      const { data: result } = await axios(options);
      return result;
    } catch (error) {
      console.log("ERROR_GET_CURRENCIES", error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getFixedRateAmount(dto: ChangellyDto): Promise<ChangellyDocument> {
    try {
      let queryData = {
        jsonrpc: "2.0",
        id: "test",
        method: "getFixRateForAmount",
        params: dto.params,
      };
      let options = this.handleSignature(queryData);
      const { data: result } = await axios(options);
      return result;
    } catch (error) {
      console.log("ERROR_GET_CURRENCIES", error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getChangellyAvailableProviders(): Promise<ApiResponseType> {
    try {
      const API_PUBLIC_KEY = "c190ef2f6d36baa3820cd5abdfea400cd9361d4e7bba94fdfad2e7e43528e3a9";
      const API_PRIVATE_KEY = "LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2UUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktjd2dnU2pBZ0VBQW9JQkFRRG1YTnFoK2lZQXIyZTMKaVR2Y1M3VTNMRkFsNDA0TkpxYXhhQ1dYU1dKTVZzNVpzWkJkREw4MGpXTHZYNW5jY3ZibURCendRd1RlSjZ3bgpoWXR6QnZ4bml5NTViT2FaQUgvdGJPV0tzQ1Vpa0EwOW9tcTFDWXZOOFI3VlVlS1FKbng3SU8rV05aSkVGS2szCjUwTWNua1FVNWxMVXpIa2ludW1kWWVmb09XMzZaMStvM1J1TlF2WmREYkZ2YjdJUG42K1dhaHNtaTU1S2g5SlgKYjZ3VHRwVTZEbFRwbW9xY2tPR2hJVEh2dmRRMWxBVU90eHJESmg0ck9JemxEbVBFOGdORXRzaHBETzd1TXpuVAp6ZEVBY2NTVUdYNVhuMXBLY2JHdlR1UlZTWWFvUnl3WUs3ZDRBSVdsR2RrSGdpMG9VanV4LzM4UmFIbTBnaWQ3ClRLc2xHOThOQWdNQkFBRUNnZ0VBRkZvVHZzZTQzOHFmWVNtd3JpL0tITXUvY1BsNkJkTnFXcllXekJ6aG9GankKOWgybjRYQ2syK0c1NGVnU1VkV2VWb2l2YmRLZDlYcVB6UllSVWVKR0htZS9mVjdQcUtqUXBJdEFaRlpYa1l3awpmMU9BRmVwMy9ZUFY4NGErZTNuSytaM1pUTzRDdEIwWExpY3lXSzdxMk9YWVg1Q0pDelA2ODdxWW9IMmlaOExiClVuZE1PR2hVQnQyR0R1dUk2UVpWNVgxWXdXQWdKaW04WE4wUkh5ZUJQWlNWMUIra3VIZVZqeGhvVHMwUE5ER3oKMW1yUHVhOGNuWUxNTlZGbFNwR0YzZTg1MGxnN0pPcXloYitWR25MNHFHQ3NrLy9EbEluYytNWjBzZ3oyZ3F1dgp6WlUvQ0hhc1ZnMG5PUDZtU2VCa3FTbUN1emJlbHd1cTNTRUljQTdWQVFLQmdRRHFISnpKVUhDV0ducEs2OGJkCjhLVTlkUWZhVytnZlVYOFE5Q1J2M1FpQm1WZ3M0bjZ0eTZsL2VDSkdMTzRFS3AwbmwvR1FNenpmMVZlOHg5dHkKZWZFc2wxa0k0aENTVE1ObkdNeGJ3SE5Ndk5naUtGV1J4WWRCcElETkVIR01tSnByZWFoQUFNeDdFMmdUK2JmZwpCd0w0Y2ZDS3FlaCtkN21ESkpQSis5VzRJUUtCZ1FENzVvSll5MWdQZU9RQm1STys5ajhHaFZkZGxsYXNQRDZzCloyTUY2S2lUbjc4ZEhxZDBIS3htalMvQ2YvenBNSUdibEYzTys5aFhLQUtFUE1rUklQYTlEcGJMa3BGTU9IcTUKZ2pybUZVZWpTYllMRVBFeVdzS1VBUnB0alhWYXVzWmdMUm9mRE5aRm0zR3crVjV6VHRIdm5kK1AxRWpQanI3VQpsZDFVeHZsWmJRS0JnSDE4Q0szL1o5bU5KNit3NFU5bEJhMERaY290S1NaZ1VIT042Vm5zWi9yUGJ1dmdHM2FjCmk2Vy9odCtHaGEzR0NhYUhVdnV2K3hrZkNZQXV2L21FVXpsTGhuVzBkcDEwZCtoeTZsYmp1T21RNzJpZnBmNFUKbW9NYzRjMEkyMVE1Rjh3ejBYTTgrbDJkOFZPRHJvTnVQckZjb1VveCtHU1JWK1pyWEt3UFNHY0JBb0dCQU9Oagp1ZGFkK09nK29OUXdjdnEzSHoycnNLbnl4RnJHSjIxS0JzR1d2RlpHcGlhTFBXNDdWQVZlL2ZYOXd6aGRhU0lnClZHNDhPWmF6cjFIZjdVRmhHRnFoaU01TGlJM2RqaXRYdkFObXdqeE1sZUIzY3NPWjJudndZd0x4NXpYMzFJdU4KS3o5TVAwQ21pWUxRR01yT0pBVEI1c1hYUThMWmdMbzJibzNRNzlZaEFvR0FHSGZqcEZBOEphaktieDhqN04ybApDWVVPSXQ0N2s3dDh5dzN3QVJOTlRMYkkxaG51NGR5Z1JoTThVeHB6aEQ1Rk94dktTVGNORHZQS0l4Y0ZCUDk3Ci9jc0x2M28vRkFwWm1ObkdoR0RLajBsbnFOSjhVZ01heXFNcG5QSXpCSEU5ck9MSGd4eHQxNTFQSkFKdzhvVFMKSVRsdys5a2J4SXErY3pDc0d2Qm5kM3c9Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K";

      const privateKeyObject = crypto.createPrivateKey({
        key: API_PRIVATE_KEY,
        type: "pkcs1",
        format: "pem",
        encoding: "base64",
      });
      const path = "https://fiat-api.changelly.com/v1/providers";
      const payload = path + JSON.stringify({});
      const signature = crypto.sign("sha256", Buffer.from(payload), privateKeyObject).toString("base64");
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": API_PUBLIC_KEY,
          "X-Api-Signature": signature,
        },
      };

      const resp = await fetch(path, options).then(async (response: any) => {
        const resp = await response.json();
        const data = {
          status: response.status,
          data: resp,
        };
        return data;
      });
      return resp;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getChangellyAvailabilityCountries(): Promise<ApiResponseType> {
    try {
      const API_PUBLIC_KEY = "c190ef2f6d36baa3820cd5abdfea400cd9361d4e7bba94fdfad2e7e43528e3a9";
      const API_PRIVATE_KEY = "LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2UUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktjd2dnU2pBZ0VBQW9JQkFRRG1YTnFoK2lZQXIyZTMKaVR2Y1M3VTNMRkFsNDA0TkpxYXhhQ1dYU1dKTVZzNVpzWkJkREw4MGpXTHZYNW5jY3ZibURCendRd1RlSjZ3bgpoWXR6QnZ4bml5NTViT2FaQUgvdGJPV0tzQ1Vpa0EwOW9tcTFDWXZOOFI3VlVlS1FKbng3SU8rV05aSkVGS2szCjUwTWNua1FVNWxMVXpIa2ludW1kWWVmb09XMzZaMStvM1J1TlF2WmREYkZ2YjdJUG42K1dhaHNtaTU1S2g5SlgKYjZ3VHRwVTZEbFRwbW9xY2tPR2hJVEh2dmRRMWxBVU90eHJESmg0ck9JemxEbVBFOGdORXRzaHBETzd1TXpuVAp6ZEVBY2NTVUdYNVhuMXBLY2JHdlR1UlZTWWFvUnl3WUs3ZDRBSVdsR2RrSGdpMG9VanV4LzM4UmFIbTBnaWQ3ClRLc2xHOThOQWdNQkFBRUNnZ0VBRkZvVHZzZTQzOHFmWVNtd3JpL0tITXUvY1BsNkJkTnFXcllXekJ6aG9GankKOWgybjRYQ2syK0c1NGVnU1VkV2VWb2l2YmRLZDlYcVB6UllSVWVKR0htZS9mVjdQcUtqUXBJdEFaRlpYa1l3awpmMU9BRmVwMy9ZUFY4NGErZTNuSytaM1pUTzRDdEIwWExpY3lXSzdxMk9YWVg1Q0pDelA2ODdxWW9IMmlaOExiClVuZE1PR2hVQnQyR0R1dUk2UVpWNVgxWXdXQWdKaW04WE4wUkh5ZUJQWlNWMUIra3VIZVZqeGhvVHMwUE5ER3oKMW1yUHVhOGNuWUxNTlZGbFNwR0YzZTg1MGxnN0pPcXloYitWR25MNHFHQ3NrLy9EbEluYytNWjBzZ3oyZ3F1dgp6WlUvQ0hhc1ZnMG5PUDZtU2VCa3FTbUN1emJlbHd1cTNTRUljQTdWQVFLQmdRRHFISnpKVUhDV0ducEs2OGJkCjhLVTlkUWZhVytnZlVYOFE5Q1J2M1FpQm1WZ3M0bjZ0eTZsL2VDSkdMTzRFS3AwbmwvR1FNenpmMVZlOHg5dHkKZWZFc2wxa0k0aENTVE1ObkdNeGJ3SE5Ndk5naUtGV1J4WWRCcElETkVIR01tSnByZWFoQUFNeDdFMmdUK2JmZwpCd0w0Y2ZDS3FlaCtkN21ESkpQSis5VzRJUUtCZ1FENzVvSll5MWdQZU9RQm1STys5ajhHaFZkZGxsYXNQRDZzCloyTUY2S2lUbjc4ZEhxZDBIS3htalMvQ2YvenBNSUdibEYzTys5aFhLQUtFUE1rUklQYTlEcGJMa3BGTU9IcTUKZ2pybUZVZWpTYllMRVBFeVdzS1VBUnB0alhWYXVzWmdMUm9mRE5aRm0zR3crVjV6VHRIdm5kK1AxRWpQanI3VQpsZDFVeHZsWmJRS0JnSDE4Q0szL1o5bU5KNit3NFU5bEJhMERaY290S1NaZ1VIT042Vm5zWi9yUGJ1dmdHM2FjCmk2Vy9odCtHaGEzR0NhYUhVdnV2K3hrZkNZQXV2L21FVXpsTGhuVzBkcDEwZCtoeTZsYmp1T21RNzJpZnBmNFUKbW9NYzRjMEkyMVE1Rjh3ejBYTTgrbDJkOFZPRHJvTnVQckZjb1VveCtHU1JWK1pyWEt3UFNHY0JBb0dCQU9Oagp1ZGFkK09nK29OUXdjdnEzSHoycnNLbnl4RnJHSjIxS0JzR1d2RlpHcGlhTFBXNDdWQVZlL2ZYOXd6aGRhU0lnClZHNDhPWmF6cjFIZjdVRmhHRnFoaU01TGlJM2RqaXRYdkFObXdqeE1sZUIzY3NPWjJudndZd0x4NXpYMzFJdU4KS3o5TVAwQ21pWUxRR01yT0pBVEI1c1hYUThMWmdMbzJibzNRNzlZaEFvR0FHSGZqcEZBOEphaktieDhqN04ybApDWVVPSXQ0N2s3dDh5dzN3QVJOTlRMYkkxaG51NGR5Z1JoTThVeHB6aEQ1Rk94dktTVGNORHZQS0l4Y0ZCUDk3Ci9jc0x2M28vRkFwWm1ObkdoR0RLajBsbnFOSjhVZ01heXFNcG5QSXpCSEU5ck9MSGd4eHQxNTFQSkFKdzhvVFMKSVRsdys5a2J4SXErY3pDc0d2Qm5kM3c9Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K";

      const privateKeyObject = crypto.createPrivateKey({
        key: API_PRIVATE_KEY,
        type: "pkcs1",
        format: "pem",
        encoding: "base64",
      });
      const path = "https://fiat-api.changelly.com/v1/available-countries";
      const payload = path + JSON.stringify({});
      const signature = crypto.sign("sha256", Buffer.from(payload), privateKeyObject).toString("base64");
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": API_PUBLIC_KEY,
          "X-Api-Signature": signature,
        },
      };
      const resp = await fetch(path, options).then(async (response: any) => {
        const resp = await response.json();
        const data = {
          status: response.status,
          data: resp,
        };
        return data;
      });
      const updatedData = resp.data.map((country: any) => {
        return {
          ...country,
          currency: countryToCurrency[country.code] || "Unknown",
        };
      });
      const result = {
        status: resp.status,
        data: updatedData,
      };
      
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getChangellyOffers(body:any): Promise<ApiResponseType> {
    try {
      const API_PUBLIC_KEY = "c190ef2f6d36baa3820cd5abdfea400cd9361d4e7bba94fdfad2e7e43528e3a9";
      const API_PRIVATE_KEY = "LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2UUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktjd2dnU2pBZ0VBQW9JQkFRRG1YTnFoK2lZQXIyZTMKaVR2Y1M3VTNMRkFsNDA0TkpxYXhhQ1dYU1dKTVZzNVpzWkJkREw4MGpXTHZYNW5jY3ZibURCendRd1RlSjZ3bgpoWXR6QnZ4bml5NTViT2FaQUgvdGJPV0tzQ1Vpa0EwOW9tcTFDWXZOOFI3VlVlS1FKbng3SU8rV05aSkVGS2szCjUwTWNua1FVNWxMVXpIa2ludW1kWWVmb09XMzZaMStvM1J1TlF2WmREYkZ2YjdJUG42K1dhaHNtaTU1S2g5SlgKYjZ3VHRwVTZEbFRwbW9xY2tPR2hJVEh2dmRRMWxBVU90eHJESmg0ck9JemxEbVBFOGdORXRzaHBETzd1TXpuVAp6ZEVBY2NTVUdYNVhuMXBLY2JHdlR1UlZTWWFvUnl3WUs3ZDRBSVdsR2RrSGdpMG9VanV4LzM4UmFIbTBnaWQ3ClRLc2xHOThOQWdNQkFBRUNnZ0VBRkZvVHZzZTQzOHFmWVNtd3JpL0tITXUvY1BsNkJkTnFXcllXekJ6aG9GankKOWgybjRYQ2syK0c1NGVnU1VkV2VWb2l2YmRLZDlYcVB6UllSVWVKR0htZS9mVjdQcUtqUXBJdEFaRlpYa1l3awpmMU9BRmVwMy9ZUFY4NGErZTNuSytaM1pUTzRDdEIwWExpY3lXSzdxMk9YWVg1Q0pDelA2ODdxWW9IMmlaOExiClVuZE1PR2hVQnQyR0R1dUk2UVpWNVgxWXdXQWdKaW04WE4wUkh5ZUJQWlNWMUIra3VIZVZqeGhvVHMwUE5ER3oKMW1yUHVhOGNuWUxNTlZGbFNwR0YzZTg1MGxnN0pPcXloYitWR25MNHFHQ3NrLy9EbEluYytNWjBzZ3oyZ3F1dgp6WlUvQ0hhc1ZnMG5PUDZtU2VCa3FTbUN1emJlbHd1cTNTRUljQTdWQVFLQmdRRHFISnpKVUhDV0ducEs2OGJkCjhLVTlkUWZhVytnZlVYOFE5Q1J2M1FpQm1WZ3M0bjZ0eTZsL2VDSkdMTzRFS3AwbmwvR1FNenpmMVZlOHg5dHkKZWZFc2wxa0k0aENTVE1ObkdNeGJ3SE5Ndk5naUtGV1J4WWRCcElETkVIR01tSnByZWFoQUFNeDdFMmdUK2JmZwpCd0w0Y2ZDS3FlaCtkN21ESkpQSis5VzRJUUtCZ1FENzVvSll5MWdQZU9RQm1STys5ajhHaFZkZGxsYXNQRDZzCloyTUY2S2lUbjc4ZEhxZDBIS3htalMvQ2YvenBNSUdibEYzTys5aFhLQUtFUE1rUklQYTlEcGJMa3BGTU9IcTUKZ2pybUZVZWpTYllMRVBFeVdzS1VBUnB0alhWYXVzWmdMUm9mRE5aRm0zR3crVjV6VHRIdm5kK1AxRWpQanI3VQpsZDFVeHZsWmJRS0JnSDE4Q0szL1o5bU5KNit3NFU5bEJhMERaY290S1NaZ1VIT042Vm5zWi9yUGJ1dmdHM2FjCmk2Vy9odCtHaGEzR0NhYUhVdnV2K3hrZkNZQXV2L21FVXpsTGhuVzBkcDEwZCtoeTZsYmp1T21RNzJpZnBmNFUKbW9NYzRjMEkyMVE1Rjh3ejBYTTgrbDJkOFZPRHJvTnVQckZjb1VveCtHU1JWK1pyWEt3UFNHY0JBb0dCQU9Oagp1ZGFkK09nK29OUXdjdnEzSHoycnNLbnl4RnJHSjIxS0JzR1d2RlpHcGlhTFBXNDdWQVZlL2ZYOXd6aGRhU0lnClZHNDhPWmF6cjFIZjdVRmhHRnFoaU01TGlJM2RqaXRYdkFObXdqeE1sZUIzY3NPWjJudndZd0x4NXpYMzFJdU4KS3o5TVAwQ21pWUxRR01yT0pBVEI1c1hYUThMWmdMbzJibzNRNzlZaEFvR0FHSGZqcEZBOEphaktieDhqN04ybApDWVVPSXQ0N2s3dDh5dzN3QVJOTlRMYkkxaG51NGR5Z1JoTThVeHB6aEQ1Rk94dktTVGNORHZQS0l4Y0ZCUDk3Ci9jc0x2M28vRkFwWm1ObkdoR0RLajBsbnFOSjhVZ01heXFNcG5QSXpCSEU5ck9MSGd4eHQxNTFQSkFKdzhvVFMKSVRsdys5a2J4SXErY3pDc0d2Qm5kM3c9Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K";

      const privateKeyObject = crypto.createPrivateKey({
        key: API_PRIVATE_KEY,
        type: "pkcs1",
        format: "pem",
        encoding: "base64",
      });
      let path = '';
      if (body.country === "US") {
        path = `https://fiat-api.changelly.com/v1/offers?providerCode=${body.providerCode}&externalUserId=${body.externalUserId}&currencyFrom=${body.currencyFrom}&currencyTo=${body.currencyTo}&amountFrom=${body.amountFrom}&country=${body.country}&state=${body.state}`
      } else {
        path = `https://fiat-api.changelly.com/v1/offers?providerCode=${body.providerCode}&externalUserId=${body.externalUserId}&currencyFrom=${body.currencyFrom}&currencyTo=${body.currencyTo}&amountFrom=${body.amountFrom}&country=${body.country}`
      }
      const payload = path + JSON.stringify({});
      const signature = crypto.sign("sha256", Buffer.from(payload), privateKeyObject).toString("base64");
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": API_PUBLIC_KEY,
          "X-Api-Signature": signature,
        },
      };
      const resp = await fetch(path, options).then(async (response: any) => {
        const resp = await response.json();
        const data = {
          status: response.status,
          data: resp.length > 0 ? resp[0] : null,
        };
        return data;
      });
      return resp;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createChangellyPayPayment(message: any): Promise<ApiResponseType> {
    try {
      const API_PUBLIC_KEY = "c190ef2f6d36baa3820cd5abdfea400cd9361d4e7bba94fdfad2e7e43528e3a9";
      const API_PRIVATE_KEY = "LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2UUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktjd2dnU2pBZ0VBQW9JQkFRRG1YTnFoK2lZQXIyZTMKaVR2Y1M3VTNMRkFsNDA0TkpxYXhhQ1dYU1dKTVZzNVpzWkJkREw4MGpXTHZYNW5jY3ZibURCendRd1RlSjZ3bgpoWXR6QnZ4bml5NTViT2FaQUgvdGJPV0tzQ1Vpa0EwOW9tcTFDWXZOOFI3VlVlS1FKbng3SU8rV05aSkVGS2szCjUwTWNua1FVNWxMVXpIa2ludW1kWWVmb09XMzZaMStvM1J1TlF2WmREYkZ2YjdJUG42K1dhaHNtaTU1S2g5SlgKYjZ3VHRwVTZEbFRwbW9xY2tPR2hJVEh2dmRRMWxBVU90eHJESmg0ck9JemxEbVBFOGdORXRzaHBETzd1TXpuVAp6ZEVBY2NTVUdYNVhuMXBLY2JHdlR1UlZTWWFvUnl3WUs3ZDRBSVdsR2RrSGdpMG9VanV4LzM4UmFIbTBnaWQ3ClRLc2xHOThOQWdNQkFBRUNnZ0VBRkZvVHZzZTQzOHFmWVNtd3JpL0tITXUvY1BsNkJkTnFXcllXekJ6aG9GankKOWgybjRYQ2syK0c1NGVnU1VkV2VWb2l2YmRLZDlYcVB6UllSVWVKR0htZS9mVjdQcUtqUXBJdEFaRlpYa1l3awpmMU9BRmVwMy9ZUFY4NGErZTNuSytaM1pUTzRDdEIwWExpY3lXSzdxMk9YWVg1Q0pDelA2ODdxWW9IMmlaOExiClVuZE1PR2hVQnQyR0R1dUk2UVpWNVgxWXdXQWdKaW04WE4wUkh5ZUJQWlNWMUIra3VIZVZqeGhvVHMwUE5ER3oKMW1yUHVhOGNuWUxNTlZGbFNwR0YzZTg1MGxnN0pPcXloYitWR25MNHFHQ3NrLy9EbEluYytNWjBzZ3oyZ3F1dgp6WlUvQ0hhc1ZnMG5PUDZtU2VCa3FTbUN1emJlbHd1cTNTRUljQTdWQVFLQmdRRHFISnpKVUhDV0ducEs2OGJkCjhLVTlkUWZhVytnZlVYOFE5Q1J2M1FpQm1WZ3M0bjZ0eTZsL2VDSkdMTzRFS3AwbmwvR1FNenpmMVZlOHg5dHkKZWZFc2wxa0k0aENTVE1ObkdNeGJ3SE5Ndk5naUtGV1J4WWRCcElETkVIR01tSnByZWFoQUFNeDdFMmdUK2JmZwpCd0w0Y2ZDS3FlaCtkN21ESkpQSis5VzRJUUtCZ1FENzVvSll5MWdQZU9RQm1STys5ajhHaFZkZGxsYXNQRDZzCloyTUY2S2lUbjc4ZEhxZDBIS3htalMvQ2YvenBNSUdibEYzTys5aFhLQUtFUE1rUklQYTlEcGJMa3BGTU9IcTUKZ2pybUZVZWpTYllMRVBFeVdzS1VBUnB0alhWYXVzWmdMUm9mRE5aRm0zR3crVjV6VHRIdm5kK1AxRWpQanI3VQpsZDFVeHZsWmJRS0JnSDE4Q0szL1o5bU5KNit3NFU5bEJhMERaY290S1NaZ1VIT042Vm5zWi9yUGJ1dmdHM2FjCmk2Vy9odCtHaGEzR0NhYUhVdnV2K3hrZkNZQXV2L21FVXpsTGhuVzBkcDEwZCtoeTZsYmp1T21RNzJpZnBmNFUKbW9NYzRjMEkyMVE1Rjh3ejBYTTgrbDJkOFZPRHJvTnVQckZjb1VveCtHU1JWK1pyWEt3UFNHY0JBb0dCQU9Oagp1ZGFkK09nK29OUXdjdnEzSHoycnNLbnl4RnJHSjIxS0JzR1d2RlpHcGlhTFBXNDdWQVZlL2ZYOXd6aGRhU0lnClZHNDhPWmF6cjFIZjdVRmhHRnFoaU01TGlJM2RqaXRYdkFObXdqeE1sZUIzY3NPWjJudndZd0x4NXpYMzFJdU4KS3o5TVAwQ21pWUxRR01yT0pBVEI1c1hYUThMWmdMbzJibzNRNzlZaEFvR0FHSGZqcEZBOEphaktieDhqN04ybApDWVVPSXQ0N2s3dDh5dzN3QVJOTlRMYkkxaG51NGR5Z1JoTThVeHB6aEQ1Rk94dktTVGNORHZQS0l4Y0ZCUDk3Ci9jc0x2M28vRkFwWm1ObkdoR0RLajBsbnFOSjhVZ01heXFNcG5QSXpCSEU5ck9MSGd4eHQxNTFQSkFKdzhvVFMKSVRsdys5a2J4SXErY3pDc0d2Qm5kM3c9Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K";

      const privateKeyObject = crypto.createPrivateKey({
        key: API_PRIVATE_KEY,
        type: "pkcs1",
        format: "pem",
        encoding: "base64",
      });

      const req_body = {
        currency: message.currencyTo,
        walletAddress: message.walletAddress,
        walletExtraId: message.walletExtraId,
      };

      const path = "https://fiat-api.changelly.com/v1/validate-address";
      const payload = path + JSON.stringify(req_body);
      const signature = crypto.sign("sha256", Buffer.from(payload), privateKeyObject).toString("base64");

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": API_PUBLIC_KEY,
          "X-Api-Signature": signature,
        },
        body: JSON.stringify(req_body),
      };
      const resp = await fetch(path, options).then((response: any) => {
        return response.json();
      });
      
      if (resp.result) {
        const path2 = "https://fiat-api.changelly.com/v1/orders";
        const payload2 = path2 + JSON.stringify(message);
        const signature2 = crypto.sign("sha256", Buffer.from(payload2), privateKeyObject).toString("base64");
        const options2 = {
          method: "POST",
          url: path2,
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": API_PUBLIC_KEY,
            "X-Api-Signature": signature2,
          },
          body: JSON.stringify(message),
        };

        const resp2 = await fetch(path2, options2).then(
          async (response: any) => {
            const resp = await response.json();
            const data = {
              status: response.status,
              data: resp,
            };
            return data;
          }
        );
        if (resp2.status === 201) {
          await this.ChangellyBuyTransactionRepository.save(resp2.data);
        }
        return resp2;
      } else {
        return resp;
      }
    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async changellyPayPaymentCallBack(req: any,res: any): Promise<ApiResponseType> {
    try {
      const CALLBACK_API_KEY ="c190ef2f6d36baa3820cd5abdfea400cd9361d4e7bba94fdfad2e7e43528e3a9";
      const CALLBACK_PUBLIC_KEY ="LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2UUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktjd2dnU2pBZ0VBQW9JQkFRRG1YTnFoK2lZQXIyZTMKaVR2Y1M3VTNMRkFsNDA0TkpxYXhhQ1dYU1dKTVZzNVpzWkJkREw4MGpXTHZYNW5jY3ZibURCendRd1RlSjZ3bgpoWXR6QnZ4bml5NTViT2FaQUgvdGJPV0tzQ1Vpa0EwOW9tcTFDWXZOOFI3VlVlS1FKbng3SU8rV05aSkVGS2szCjUwTWNua1FVNWxMVXpIa2ludW1kWWVmb09XMzZaMStvM1J1TlF2WmREYkZ2YjdJUG42K1dhaHNtaTU1S2g5SlgKYjZ3VHRwVTZEbFRwbW9xY2tPR2hJVEh2dmRRMWxBVU90eHJESmg0ck9JemxEbVBFOGdORXRzaHBETzd1TXpuVAp6ZEVBY2NTVUdYNVhuMXBLY2JHdlR1UlZTWWFvUnl3WUs3ZDRBSVdsR2RrSGdpMG9VanV4LzM4UmFIbTBnaWQ3ClRLc2xHOThOQWdNQkFBRUNnZ0VBRkZvVHZzZTQzOHFmWVNtd3JpL0tITXUvY1BsNkJkTnFXcllXekJ6aG9GankKOWgybjRYQ2syK0c1NGVnU1VkV2VWb2l2YmRLZDlYcVB6UllSVWVKR0htZS9mVjdQcUtqUXBJdEFaRlpYa1l3awpmMU9BRmVwMy9ZUFY4NGErZTNuSytaM1pUTzRDdEIwWExpY3lXSzdxMk9YWVg1Q0pDelA2ODdxWW9IMmlaOExiClVuZE1PR2hVQnQyR0R1dUk2UVpWNVgxWXdXQWdKaW04WE4wUkh5ZUJQWlNWMUIra3VIZVZqeGhvVHMwUE5ER3oKMW1yUHVhOGNuWUxNTlZGbFNwR0YzZTg1MGxnN0pPcXloYitWR25MNHFHQ3NrLy9EbEluYytNWjBzZ3oyZ3F1dgp6WlUvQ0hhc1ZnMG5PUDZtU2VCa3FTbUN1emJlbHd1cTNTRUljQTdWQVFLQmdRRHFISnpKVUhDV0ducEs2OGJkCjhLVTlkUWZhVytnZlVYOFE5Q1J2M1FpQm1WZ3M0bjZ0eTZsL2VDSkdMTzRFS3AwbmwvR1FNenpmMVZlOHg5dHkKZWZFc2wxa0k0aENTVE1ObkdNeGJ3SE5Ndk5naUtGV1J4WWRCcElETkVIR01tSnByZWFoQUFNeDdFMmdUK2JmZwpCd0w0Y2ZDS3FlaCtkN21ESkpQSis5VzRJUUtCZ1FENzVvSll5MWdQZU9RQm1STys5ajhHaFZkZGxsYXNQRDZzCloyTUY2S2lUbjc4ZEhxZDBIS3htalMvQ2YvenBNSUdibEYzTys5aFhLQUtFUE1rUklQYTlEcGJMa3BGTU9IcTUKZ2pybUZVZWpTYllMRVBFeVdzS1VBUnB0alhWYXVzWmdMUm9mRE5aRm0zR3crVjV6VHRIdm5kK1AxRWpQanI3VQpsZDFVeHZsWmJRS0JnSDE4Q0szL1o5bU5KNit3NFU5bEJhMERaY290S1NaZ1VIT042Vm5zWi9yUGJ1dmdHM2FjCmk2Vy9odCtHaGEzR0NhYUhVdnV2K3hrZkNZQXV2L21FVXpsTGhuVzBkcDEwZCtoeTZsYmp1T21RNzJpZnBmNFUKbW9NYzRjMEkyMVE1Rjh3ejBYTTgrbDJkOFZPRHJvTnVQckZjb1VveCtHU1JWK1pyWEt3UFNHY0JBb0dCQU9Oagp1ZGFkK09nK29OUXdjdnEzSHoycnNLbnl4RnJHSjIxS0JzR1d2RlpHcGlhTFBXNDdWQVZlL2ZYOXd6aGRhU0lnClZHNDhPWmF6cjFIZjdVRmhHRnFoaU01TGlJM2RqaXRYdkFObXdqeE1sZUIzY3NPWjJudndZd0x4NXpYMzFJdU4KS3o5TVAwQ21pWUxRR01yT0pBVEI1c1hYUThMWmdMbzJibzNRNzlZaEFvR0FHSGZqcEZBOEphaktieDhqN04ybApDWVVPSXQ0N2s3dDh5dzN3QVJOTlRMYkkxaG51NGR5Z1JoTThVeHB6aEQ1Rk94dktTVGNORHZQS0l4Y0ZCUDk3Ci9jc0x2M28vRkFwWm1ObkdoR0RLajBsbnFOSjhVZ01heXFNcG5QSXpCSEU5ck9MSGd4eHQxNTFQSkFKdzhvVFMKSVRsdys5a2J4SXErY3pDc0d2Qm5kM3c9Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K";
      const payload = req.body;
      const apiKey = req.headers["x-callback-api-key"];
      const signature = req.headers["x-callback-signature"];

      const responseData = {
        success: false,
        message: "",
        data: null,
      };

      if (apiKey !== CALLBACK_API_KEY) {
        responseData.message = "Unauthorized,invalid api key ";
        return responseData;
      }

      const signaturePayload = JSON.stringify({ orderId: payload.orderId });
      const isSignatureVerified = await this._validateSignature(signature,signaturePayload);

      if (isSignatureVerified) {
        const params = {
          orderId: payload.orderId,
          externalUserId: payload.externalUserId,
        };
        const getTransaction = await this.ChangellyBuyTransactionRepository.getByField(params);
        if (!_.isEmpty(getTransaction)) {
          const updateResp = await this.ChangellyBuyTransactionRepository.updateById(payload,getTransaction._id);
          responseData.success = true;
          responseData.message = "Transaction updated successfully";
          responseData.data = updateResp;

          /* Emit a socket event for frontend */
          this.socketGateway.io.emit(`txn-status-${payload.orderId}`, payload);
          return responseData;
        }
        responseData.message = "Invalid payload";
        return responseData;
      }
      responseData.message = "Unauthorized,invalid signature ";
      return responseData;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async _validateSignature(signature: any, payload: any) {
    const CALLBACK_API_KEY ="c190ef2f6d36baa3820cd5abdfea400cd9361d4e7bba94fdfad2e7e43528e3a9";
    const CALLBACK_PUBLIC_KEY ="LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2UUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktjd2dnU2pBZ0VBQW9JQkFRRG1YTnFoK2lZQXIyZTMKaVR2Y1M3VTNMRkFsNDA0TkpxYXhhQ1dYU1dKTVZzNVpzWkJkREw4MGpXTHZYNW5jY3ZibURCendRd1RlSjZ3bgpoWXR6QnZ4bml5NTViT2FaQUgvdGJPV0tzQ1Vpa0EwOW9tcTFDWXZOOFI3VlVlS1FKbng3SU8rV05aSkVGS2szCjUwTWNua1FVNWxMVXpIa2ludW1kWWVmb09XMzZaMStvM1J1TlF2WmREYkZ2YjdJUG42K1dhaHNtaTU1S2g5SlgKYjZ3VHRwVTZEbFRwbW9xY2tPR2hJVEh2dmRRMWxBVU90eHJESmg0ck9JemxEbVBFOGdORXRzaHBETzd1TXpuVAp6ZEVBY2NTVUdYNVhuMXBLY2JHdlR1UlZTWWFvUnl3WUs3ZDRBSVdsR2RrSGdpMG9VanV4LzM4UmFIbTBnaWQ3ClRLc2xHOThOQWdNQkFBRUNnZ0VBRkZvVHZzZTQzOHFmWVNtd3JpL0tITXUvY1BsNkJkTnFXcllXekJ6aG9GankKOWgybjRYQ2syK0c1NGVnU1VkV2VWb2l2YmRLZDlYcVB6UllSVWVKR0htZS9mVjdQcUtqUXBJdEFaRlpYa1l3awpmMU9BRmVwMy9ZUFY4NGErZTNuSytaM1pUTzRDdEIwWExpY3lXSzdxMk9YWVg1Q0pDelA2ODdxWW9IMmlaOExiClVuZE1PR2hVQnQyR0R1dUk2UVpWNVgxWXdXQWdKaW04WE4wUkh5ZUJQWlNWMUIra3VIZVZqeGhvVHMwUE5ER3oKMW1yUHVhOGNuWUxNTlZGbFNwR0YzZTg1MGxnN0pPcXloYitWR25MNHFHQ3NrLy9EbEluYytNWjBzZ3oyZ3F1dgp6WlUvQ0hhc1ZnMG5PUDZtU2VCa3FTbUN1emJlbHd1cTNTRUljQTdWQVFLQmdRRHFISnpKVUhDV0ducEs2OGJkCjhLVTlkUWZhVytnZlVYOFE5Q1J2M1FpQm1WZ3M0bjZ0eTZsL2VDSkdMTzRFS3AwbmwvR1FNenpmMVZlOHg5dHkKZWZFc2wxa0k0aENTVE1ObkdNeGJ3SE5Ndk5naUtGV1J4WWRCcElETkVIR01tSnByZWFoQUFNeDdFMmdUK2JmZwpCd0w0Y2ZDS3FlaCtkN21ESkpQSis5VzRJUUtCZ1FENzVvSll5MWdQZU9RQm1STys5ajhHaFZkZGxsYXNQRDZzCloyTUY2S2lUbjc4ZEhxZDBIS3htalMvQ2YvenBNSUdibEYzTys5aFhLQUtFUE1rUklQYTlEcGJMa3BGTU9IcTUKZ2pybUZVZWpTYllMRVBFeVdzS1VBUnB0alhWYXVzWmdMUm9mRE5aRm0zR3crVjV6VHRIdm5kK1AxRWpQanI3VQpsZDFVeHZsWmJRS0JnSDE4Q0szL1o5bU5KNit3NFU5bEJhMERaY290S1NaZ1VIT042Vm5zWi9yUGJ1dmdHM2FjCmk2Vy9odCtHaGEzR0NhYUhVdnV2K3hrZkNZQXV2L21FVXpsTGhuVzBkcDEwZCtoeTZsYmp1T21RNzJpZnBmNFUKbW9NYzRjMEkyMVE1Rjh3ejBYTTgrbDJkOFZPRHJvTnVQckZjb1VveCtHU1JWK1pyWEt3UFNHY0JBb0dCQU9Oagp1ZGFkK09nK29OUXdjdnEzSHoycnNLbnl4RnJHSjIxS0JzR1d2RlpHcGlhTFBXNDdWQVZlL2ZYOXd6aGRhU0lnClZHNDhPWmF6cjFIZjdVRmhHRnFoaU01TGlJM2RqaXRYdkFObXdqeE1sZUIzY3NPWjJudndZd0x4NXpYMzFJdU4KS3o5TVAwQ21pWUxRR01yT0pBVEI1c1hYUThMWmdMbzJibzNRNzlZaEFvR0FHSGZqcEZBOEphaktieDhqN04ybApDWVVPSXQ0N2s3dDh5dzN3QVJOTlRMYkkxaG51NGR5Z1JoTThVeHB6aEQ1Rk94dktTVGNORHZQS0l4Y0ZCUDk3Ci9jc0x2M28vRkFwWm1ObkdoR0RLajBsbnFOSjhVZ01heXFNcG5QSXpCSEU5ck9MSGd4eHQxNTFQSkFKdzhvVFMKSVRsdys5a2J4SXErY3pDc0d2Qm5kM3c9Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K";
    const publicKeyObject = crypto.createPublicKey({
      key: CALLBACK_PUBLIC_KEY,
      type: "pkcs1",
      format: "pem",
      encoding: "base64",
    });
    const payloadBuffer = Buffer.from(payload);
    const signatureBuffer = Buffer.from(signature, "base64");
    return crypto.verify(
      "sha256",
      payloadBuffer,
      publicKeyObject,
      signatureBuffer
    );
  }
}
