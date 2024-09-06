import mongoose from "mongoose"
import { GameCurrentModel } from "../db/schema/game-current"
import {  saveGameInterface, updateGameInt } from "../interface/Game"


export const  handleGameData=async (data:any)=> {
    try {
  
            console.log("Game Created")
            return await GameCurrentModel.create(data)

          
     
    }
    catch (error) {

        console.log("Error", error)
    }
}

export const findAndUpdateGame = async (data: updateGameInt) => {
    try {
        const { game_id, ...rest } = data;
        const updatedData = await GameCurrentModel.findByIdAndUpdate(new mongoose.Types.ObjectId(game_id), rest, { new: true }).lean().exec();
        if (!updatedData) {
            return { status: 401, data: [] }
        } else {
            return { status: 200, data: updatedData, message: "Success" }
        }
    } catch (error: any) {
        return { status: 500, message: error.message }
    }
}


export const  findGame=async (type : any)=> {
    try {
        console.log("Find Game ",type)
            const filter = { gameType: type };

            return await GameCurrentModel.findOne(filter).lean();
    }
    catch (error) {
        console.log("Error", error)
    }
};

export const saveGame = async (data: saveGameInterface) => {
    try {
        const saveGame = await GameCurrentModel.create(data);
        if (!saveGame) {
            return { status: 401, data: {}, message: "Something went wrong" }
        } else {
            return { status: 200, data: saveGame, message: "Game created successfully" }
        }
    } catch (err: any) {
        return { status: 500, message: err.message }
    }
}