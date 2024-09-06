import { Types } from "mongoose"
import { UserDeviceDocument } from "src/user-devices/schemas/user-device.schema"

export interface IUserDevice extends UserDeviceDocument {
    user_id: string | Types.ObjectId
    deviceToken: string
    deviceType: string
    ip: string
    ip_lat: string
    ip_long: string
    browserInfo: { name: string, version: string }
    deviceInfo: { vendor: string, model: string, type: string }
    operatingSystem: { name: string, version: string }
    last_active: any
    state: string
    country: string
    city: string
    timezone: string
    access_token: string
    expired: boolean
    role: string
    isDeleted: boolean
}