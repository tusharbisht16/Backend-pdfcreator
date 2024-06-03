
import {connect} from "mongoose"

export const connectDb = async (uri)=>{
await connect(uri)
}