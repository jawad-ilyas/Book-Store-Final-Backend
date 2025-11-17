import { SubscriptionPlan } from "../models/subscriptionPlan.js";


export const createSubscriptionPlan = async (req, res) => {
    try {
        const { name, priceMonthly, priceYearly, featured, isActive } = req.body;

        if (!name || !priceMonthly || !priceYearly) {
            return res.status(400).json({ message: "Name, Monthly price, and Yearly price are required." });
        }

        const plan = await SubscriptionPlan.create({
            name,
            priceMonthly,
            priceYearly,
            featured: featured || [],
            isActive
        });

        res.status(201).json({
            message: "Subscription plan created successfully",
            plan
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const getAllSubscriptionPlans = async (req, res) => {
    try {
        const plans = await SubscriptionPlan.find().sort({ createdAt: -1 });
        res.status(200).json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const getSubscriptionPlanById = async (req, res) => {
    try {
        const plan = await SubscriptionPlan.findById(req.params.id);

        if (!plan) {
            return res.status(404).json({ message: "Subscription plan not found" });
        }

        res.status(200).json(plan);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSubscriptionPlan = async (req, res) => {
    try {
        const plan = await SubscriptionPlan.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!plan) {
            return res.status(404).json({ message: "Subscription plan not found" });
        }

        res.status(200).json({
            message: "Subscription plan updated successfully",
            plan
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteSubscriptionPlan = async (req, res) => {
    try {
        const plan = await SubscriptionPlan.findByIdAndDelete(req.params.id);

        if (!plan) {
            return res.status(404).json({ message: "Subscription plan not found" });
        }

        res.status(200).json({ message: "Subscription plan deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/**
 * @desc Activate / Deactivate Subscription Plan
 * @route PATCH /api/subscription/:id/status
 * @access Admin
 */
export const togglePlanStatus = async (req, res) => {
    try {
        const plan = await SubscriptionPlan.findById(req.params.id);

        if (!plan) {
            return res.status(404).json({ message: "Subscription plan not found" });
        }

        plan.isActive = !plan.isActive;
        await plan.save();

        res.status(200).json({
            message: `Plan is now ${plan.isActive ? "Active" : "Inactive"}`,
            plan
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
