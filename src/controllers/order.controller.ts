import { Request, Response } from "express";
import { OrderModel } from "../models/order.model";

export const createOrder = async (req: Request, res: Response) => {
    try{
        const {items, totalAmount, paymentMethod, shippingAddress} = req.body;
        const userId = req.user?.id;

        if(!items || items.length === 0){
            return res.status(400).json({message: "No item in the order"});
        }

        const newOrder = new OrderModel({
            user: userId,
            items,
            totalAmount,
            paymentMethod,
            shippingAddress
        });

        await newOrder.save();

        res.status(201).json({message: "Order created successfully", order: newOrder});
    } catch (err){
        res.status(500).json({message: "Internal server error", error: err});
    }
}


export const getOrderById = async (req: Request, res: Response) => {
    try{
        const order = await OrderModel.findById(req.params.id).populate("user", "name email").populate("items.product");

        if(!order){
            return res.status(404).json({message: "Order not found"});
        }

        //condition chỉ cho coi order của user login hoặc admin
        if (req.user?.id !== order.user.toString() && req.user?.role !== "admin"){
            return res.status(403).json({message: "You are not authorized to view this order"});
        }

        res.status(200).json({order});
    } catch (err){
        res.status(500).json({message: "Internal server error", error: err});
    }
}
